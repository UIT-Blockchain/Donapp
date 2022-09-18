import Image from "next/image";
import { ChangeEvent, useCallback, useState } from "react";

const PoolInput = () => {
  const [poolId, setPoolId] = useState("");

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPoolId(value);
  }, []);

  return (
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
  );
};

export default PoolInput;
