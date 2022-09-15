import AnimationBox from "@components/AnimationBox";
import { cx } from "@utils/tools";
import Image from "next/image";
import Link from "next/link";

export const AppScreen: IComponent = ({}) => {
  return (
    <div
      className={cx(
        "dark:text-white bg-black h-screen flex justify-center items-center"
      )}
    >
      <Link href="/donapp" passHref>
        <a
          className="bg-[#ffdd50] button-connect w-[40rem] hover:scale-105 active:scale-90 duration-300 border-8 border-white p-8 rounded-lg animate-pulse cursor-pointer z-10"
          style={{ animationDuration: "4s" }}
        >
          <div>
            <Image src={`/mu.png`} alt="connect" width={560} height={560} />
            <div className="flex flex-row items-center justify-center px-4 py-1  rounded-lg mt-5">
              <span
                style={{ letterSpacing: "6px" }}
                className="font-thin text-black text-xl pr-2"
              >
                CONNECT YOUR ORGANIZATION
              </span>
            </div>
          </div>
        </a>
      </Link>
      <AnimationBox />
    </div>
  );
};
