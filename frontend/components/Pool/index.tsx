import { NearContextAtom, QuestIdCounter, SelectedPool } from "@atoms/app";
import PoolCard from "@components/PoolCard";
import PoolClose from "@components/PoolClose";
import { BOATLOAD_OF_GAS } from "@utils/constant";
import { ntoy } from "@utils/tools";
import Image from "next/image";
import { ChangeEvent, useCallback, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const Pool: IComponent<IPoolItem> = ({ streamer_id, quests }) => {
  const setSelectedPool = useSetRecoilState(SelectedPool);

  const nearContext = useRecoilValue(NearContextAtom);
  const isStreamer = streamer_id === nearContext?.currentUser?.accountId;
  const pool_id: string | undefined = streamer_id && streamer_id + ".pool";
  const [questIdCounter, setQuestIdCounter] = useRecoilState(QuestIdCounter);

  const [inputValues, setInputValues] = useState({
    desc: "",
    amount: null,
  });

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setInputValues({ ...inputValues, [name]: value });
    },
    [inputValues]
  );
  const handleCreateQuest = async () => {
    if (nearContext) {
      if (!!nearContext.contract?.create_quest) {
        setQuestIdCounter(questIdCounter + 1);
        await nearContext?.contract?.create_quest(
          {
            streamer_id,
            id: pool_id + "_" + quests.length.toString(),
            description: inputValues.desc,
          },
          BOATLOAD_OF_GAS,
          ntoy(inputValues.amount!)
        );
      }
    }
  };

  const handleOutPool = () => {
    setSelectedPool(null);
    setQuestIdCounter(-1);
  };

  return (
    <div className="grid grid-cols-2 gap-8 mt-8">
      {!!quests && (
        <PoolCard
          heading={streamer_id}
          listItems={quests}
          isStreamer={isStreamer}
        />
      )}
      <div className="px-8 flex flex-col justify-center gap-y-16">
        {!!isStreamer ? (
          <PoolClose pool_id={pool_id} />
        ) : (
          <div>
            {" "}
            <div className="rounded-lg overflow-hidden">
              <div className="flex bg-white items-center p-4 mb-4 rounded-lg overflow-hidden">
                <div className="icon flex items-center">
                  <Image
                    src="/desc.png"
                    width={30}
                    height={30}
                    className="m-0"
                    alt="icon"
                    layout="fixed"
                  />
                </div>
                <input
                  name="desc"
                  className="text-2xl font-normal w-full py-4 px-4 text-gray-800  border-b-2 border-white focus:outline-none focus:border-b-2 focus:border-indigo-700 "
                  type="text"
                  placeholder="Some description here"
                  onChange={handleOnChange}
                  value={inputValues.desc}
                />
              </div>
              <div className="flex bg-white items-center p-4 mb-4 rounded-lg overflow-hidden">
                <div className="icon flex items-center">
                  <Image
                    src={"/near-2.png"}
                    width={30}
                    height={30}
                    layout="fixed"
                    alt="vote"
                    className="bg-white rounded-full"
                  />
                </div>
                <input
                  name="amount"
                  className="text-2xl font-normal w-full py-4 px-4 text-gray-800  border-b-2 border-white focus:outline-none focus:border-b-2 focus:border-indigo-700 "
                  type="number"
                  placeholder="Amount"
                  onChange={handleOnChange}
                  value={inputValues.amount!}
                />
              </div>

              <div className="flex flex-row-reverse justify-between py-6">
                <button
                  className="bg-gradient-to-b from-[#9C2CF3] to-[#3A49F9] hover:bg-purple-400  text-white font-bold py-6 px-8 rounded-lg text-xl"
                  onClick={handleCreateQuest}
                >
                  {" "}
                  Create quest
                </button>
                <button
                  className="bg-gradient-to-b from-[#f32c3d] to-[#f93a67] hover:bg-purple-400  text-white font-bold py-6 px-8 rounded-lg text-xl"
                  onClick={handleOutPool}
                >
                  {" "}
                  Out pool
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pool;
