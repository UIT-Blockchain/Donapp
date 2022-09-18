import { NearContextAtom, SelectedPool } from "@atoms/app";
import { BOATLOAD_OF_GAS } from "@utils/constant";
import { yton } from "@utils/tools";
import Image from "next/image";
import { ChangeEvent, useCallback, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface PoolButtonProps {
  isJoin?: boolean;
}
const PoolButton: IComponent<PoolButtonProps> = ({ isJoin }) => {
  const nearContext = useRecoilValue(NearContextAtom);
  const [poolId, setPoolId] = useState("");

  const setSelectedPool = useSetRecoilState(SelectedPool);

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPoolId(value);
  }, []);

  const handleCreatePool = async () => {
    if (nearContext) {
      await nearContext.contract.create_pool({}, BOATLOAD_OF_GAS, yton(25));
    }
  };
  const handleGetPool = async (input: string) => {
    if (nearContext) {
      await nearContext.contract
        .get_pool({
          streamer_id: input,
        })
        .then((data: IPoolItem) => {
          setSelectedPool(data);
          console.log("data:", data);
        });
    }
  };
  return (
    <div className="flex justify-end p-6 ">
      {!!isJoin ? (
        <div>
          <button
            className="bg-green-800 from-[#9C2CF3] to-[#3A49F9] hover:bg-purple-400  text-white font-bold w-[140px] py-6 px-8 rounded-lg text-xl"
            type="button"
            onClick={() => {
              handleGetPool(poolId);
            }}
          >
            Join
          </button>
          <div>
            <form className="rounded-lg overflow-hidden">
              <div className="flex bg-white items-center p-4">
                <div className="icon">
                  <Image
                    src="/tx-icon.png"
                    width={24}
                    height={24}
                    className="m-0"
                    alt="icon"
                    layout="fixed"
                  />
                </div>
                <input
                  name="poolId"
                  className="text-2xl font-normal w-full py-4 px-4 text-gray-800  border-b-2 border-white focus:outline-none focus:border-b-2 focus:border-indigo-700 "
                  type="text"
                  placeholder="The pool needs the name..."
                  onChange={handleOnChange}
                  value={poolId}
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          className="bg-gradient-to-b from-[#9C2CF3] to-[#3A49F9] hover:bg-purple-400  text-white font-bold w-[140px] py-6 px-8 rounded-lg text-xl"
          type="button"
          onClick={handleCreatePool}
        >
          Create
        </button>
      )}
    </div>
  );
};

export default PoolButton;
