import { NearContextAtom } from "@atoms/app";
import { BOATLOAD_OF_GAS } from "@utils/constant";
import Image from "next/image";
import { useRecoilValue } from "recoil";

interface PoolCloseProps {
  pool_id?: string;
}
const PoolClose: IComponent<PoolCloseProps> = ({ pool_id }) => {
  const nearContext = useRecoilValue(NearContextAtom);

  const handleDeletePool = async (id: any) => {
    if (nearContext) {
      await nearContext.contract.delete_pool(
        {
          pool_id: id,
        },
        BOATLOAD_OF_GAS
      );
    }
  };
  return (
    <button
      className="bg-red-800 from-[#9C2CF3] to-[#3A49F9] hover:bg-red-700  text-white font-bold w-[140px] py-6 px-8 rounded-lg text-xl"
      type="button"
      onClick={() => {
        handleDeletePool(pool_id);
      }}
    >
      Close Pool
    </button>
  );
};

export default PoolClose;
