import Image from "next/image";
import React, { MouseEventHandler, useState } from "react";

interface AccountProps {
  accountId: string;
  balance: number;
  onClickSignOut: MouseEventHandler;
}
const Account: IComponent<AccountProps> = ({
  accountId,
  balance,
  onClickSignOut,
}) => {
  const [hiddenAccount, setHiddenAccount] = useState(true);
  return (
    <div className="relative">
      <Image
        src={`/profile.png`}
        alt={accountId}
        width={40}
        height={40}
        className="m-0 hover:cursor-pointer"
        onClick={() => {
          setHiddenAccount(!hiddenAccount);
        }}
      />
      <div
        className={`${
          hiddenAccount ? "hidden" : ""
        } absolute top-12 right-0 bg-card py-4 rounded w-[400px]`}
      >
        <ul className="font-bold text-xl p-4">
          <li className="px-4 py-6 border-b-2 border-b-indigo-700">
            Account: <span className="text-amber-300">{accountId}</span>
          </li>
          <li className="px-4 py-6 border-b-2 border-b-indigo-700">
            Balance: <span className="text-amber-300">{balance}</span>
          </li>

          <li
            className="px-4 py-6 hover:bg-black rounded-lg duration-300 hover:cursor-pointer hover:scale-105 flex items-center"
            onClick={onClickSignOut}
          >
            <span className="mr-4">Log out</span>
            <Image src={`/exit.png`} alt={"exit"} width={30} height={30} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Account;
