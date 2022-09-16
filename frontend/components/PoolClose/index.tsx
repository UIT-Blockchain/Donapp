import { PoolSelectedAtom } from "@atoms/app";
import { capitalize } from "@utils/tools";
import Image from "next/image";
import { useRecoilValue } from "recoil";

const PoolClose = () => {
  const selectedPool = useRecoilValue(PoolSelectedAtom);

  return (
    selectedPool && (
      <div className="bg-[#dbc5e2] pool-close px-8 py-6 flex gap-x-6 border-b-2 border-gray-700 rounded-lg text-red-800">
        <div className="icon">
          <Image
            src="/tx-icon-red.png"
            width={24}
            height={24}
            className="m-0"
            alt="icon"
            layout="fixed"
          />
        </div>
        <div className="content grow">
          <div className="text-2xl font-medium">
            {capitalize(selectedPool.poolName)}
          </div>
          <div className="text-sm font-light opacity-90 mr-8">
            {selectedPool.description}
          </div>
        </div>
        <div
          className="icon p-2 flex items-center hover:scale-125 hover:cursor-pointer duration-300 hover:shadow-sm"
          onClick={() => console.log("hello...")}
        >
          <Image
            src="/close.png"
            width={32}
            height={32}
            className="m-0"
            alt="icon"
            layout="fixed"
          />
        </div>
      </div>
    )
  );
};

export default PoolClose;
