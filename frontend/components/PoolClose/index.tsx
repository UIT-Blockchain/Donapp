import { NearContextAtom } from "@atoms/app";
import { BOATLOAD_OF_GAS } from "@utils/constant";
import Image from "next/image";
import { useRecoilValue } from "recoil";

const PoolClose = (pool_id: string | undefined) => {
  const nearContext = useRecoilValue(NearContextAtom);

  const handleDeletePool = async (id: any) => {
    if (nearContext) {
      await nearContext.contract.delete_pool(
        {
          pool_id: id.pool_id,
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
    // <div className="bg-[#dbc5e2] pool-close px-8 py-6 flex gap-x-6 border-b-2 border-gray-700 rounded-lg text-red-800">
    //   <div className="icon">
    //     <Image
    //       src="/tx-icon-red.png"
    //       width={24}
    //       height={24}
    //       className="m-0"
    //       alt="icon"
    //       layout="fixed"
    //     />
    //   </div>
    //   <div className="content grow">
    //     {/* <div className="text-2xl font-medium">
    //       {capitalize(selectedPool.poolName)}
    //     </div> */}
    //   </div>
    //   <div
    //     className="icon p-2 flex items-center hover:scale-125 hover:cursor-pointer duration-300 hover:shadow-sm"
    //     onClick={() => {
    //       handleDeletePool(pool_id);
    //     }}
    //   >
    //     <Image
    //       src="/close.png"
    //       width={32}
    //       height={32}
    //       className="m-0"
    //       alt="icon"
    //       layout="fixed"
    //     />
    //   </div>
    // </div>
  );
};

export default PoolClose;
