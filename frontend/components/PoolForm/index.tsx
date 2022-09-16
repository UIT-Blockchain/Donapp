import Image from "next/image";
import { ChangeEvent, useCallback, useState } from "react";

const PoolForm = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    desc: "",
  });

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setInputValues({ ...inputValues, [name]: value });
    },
    [inputValues]
  );

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
          name="name"
          className="text-2xl font-normal w-full py-4 px-4 text-gray-800  border-b-2 border-white focus:outline-none focus:border-b-2 focus:border-indigo-700 "
          type="text"
          placeholder="The pool needs the name..."
          onChange={handleOnChange}
          value={inputValues.name}
        />
      </div>
      <div className="flex bg-white items-center p-4 rounded-bl-lg rounded-br-lg overflow-hidden">
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
          name="desc"
          className="text-2xl font-normal w-full py-4 px-4 text-gray-800  border-b-2 border-white focus:outline-none focus:border-b-2 focus:border-indigo-700 "
          type="text"
          placeholder="Description"
          onChange={handleOnChange}
          value={inputValues.desc}
        />
      </div>

      <div className="flex justify-end p-6">
        <button
          className="bg-gradient-to-b from-[#9C2CF3] to-[#3A49F9] hover:bg-purple-400  text-white font-bold py-6 px-8 rounded-lg text-xl"
          type="button"
        >
          {" "}
          Create
        </button>
      </div>
    </form>
  );
};

export default PoolForm;
