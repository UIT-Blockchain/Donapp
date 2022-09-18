import { NearContextAtom } from "@atoms/app";
import { BOATLOAD_OF_GAS } from "@utils/constant";
import { yton } from "@utils/tools";
import { useRecoilValue } from "recoil";

const PoolForm = () => {
  const nearContext = useRecoilValue(NearContextAtom);

  const handleCreatePool = async () => {
    if (nearContext) {
      await nearContext.contract.create_pool({}, BOATLOAD_OF_GAS, yton(25));
    }
  };

  return (
    <div className="flex justify-end p-6 ">
      <button
        className="bg-gradient-to-b from-[#9C2CF3] to-[#3A49F9] hover:bg-purple-400  text-white font-bold w-[140px] py-6 px-8 rounded-lg text-xl"
        type="button"
        onClick={handleCreatePool}
      >
        {" "}
        Create
      </button>
    </div>
  );
};

export default PoolForm;
