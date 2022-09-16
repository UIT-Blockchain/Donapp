import Dashboard from "@components/Dashboard";
import { cx } from "@utils/tools";
import Image from "next/image";
import Link from "next/link";

export const DonappScreen: IComponent = ({}) => {
  return (
    <div
      className={cx(
        "dark:text-white bg-black py-28 px-32 bg-center bg-contain  opacity-90"
      )}
    >
      <div className="bg-default border-2 border-indigo-500 rounded-[3.5rem] p-8">
        <div className="header flex relative">
          <Link href="/">
            <a className="logo w-20 h-20">
              <Image
                src={`/mu-red.png`}
                alt="mu-red"
                width={80}
                height={80}
                className="m-0"
              />
            </a>
          </Link>
          <div className="absolute -right-[3.75rem] top-[2.75rem] origin-top-left rotate-12">
            <Image
              src={`/cloud.png`}
              alt="cloud"
              width={224}
              height={215}
              className="m-0"
            />
          </div>
        </div>
        <div className="rounded-[3.5rem]">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};
