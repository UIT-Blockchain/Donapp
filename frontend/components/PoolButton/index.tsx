import { NearContextAtom, SelectedPool } from "@atoms/app";
import { BOATLOAD_OF_GAS } from "@utils/constant";
import { ntoy } from "@utils/tools";
import Image from "next/image";
import { ChangeEvent, useCallback, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface PoolButtonProps {
  isJoin?: boolean;
}
const PoolButton: IComponent<PoolButtonProps> = ({ isJoin }) => {
  const nearContext = useRecoilValue(NearContextAtom);
  const [poolId, setPoolId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const setSelectedPool = useSetRecoilState(SelectedPool);

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPoolId(value);
    setErrorMsg("");
  }, []);

  const handleCreatePool = async () => {
    if (nearContext) {
      await nearContext.contract.create_pool({}, BOATLOAD_OF_GAS, ntoy(25));
    }
  };
  const handleGetPool = async (input: string) => {
    if (nearContext) {
      await nearContext.contract
        .get_pool({
          streamer_id: input,
        })
        .then((data: IPoolItem) => {
          if (data) {
            setSelectedPool(data);
          } else {
            setErrorMsg("The pool does not exist...");
          }
        });
    }
  };
  return (
    <div className="p-6">
      {!!isJoin ? (
        <div>
          <div className="flex">
            <div className="mx-4 grow">
              <form className="rounded-lg overflow-hidden">
                <div className="flex bg-white items-center px-4 py-2">
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
                    placeholder="The name of the pool that you want to join..."
                    onChange={handleOnChange}
                    value={poolId}
                  />
                </div>
              </form>
            </div>
            <button
              className="bg-gradient-to-b from-lime-400 to-lime-800 text-white font-bold w-[140px] py-6 px-8 rounded-lg text-xl "
              type="button"
              onClick={() => {
                handleGetPool(poolId);
              }}
            >
              Join
            </button>
          </div>
          <div className="error-msg text-center mt-4 text-red-600 text-xl font-semibold">
            {errorMsg ? errorMsg : <span>&nbsp;</span>}
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="text-2xl font-normal w-full py-4 px-4 text-white grow text-right">
            If you are a streamer, you can create a new pool.
          </div>
          <button
            className="bg-gradient-to-b from-[#9C2CF3] to-[#3A49F9] hover:bg-purple-400  text-white font-bold w-[140px] py-6 px-8 rounded-lg text-xl"
            type="button"
            onClick={handleCreatePool}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default PoolButton;
