import Image from "next/image";
import go from "programming-languages-logos/src/go/go.svg";
import js from "programming-languages-logos/src/javascript/javascript.svg";

import styles from "./index.module.scss";

/**
 * This file contain language component for header in main page
 */

export const LanguageBackground: IComponent = () => {
  return (
    <div className="w-full h-full overflow-hidden relative p-3">
      <div className="relative w-full h-full">
        <div className="absolute z-10 h-32 w-32 bg-white bottom-12 right-12 -rotate-45 rounded-lg p-4">
          <Image alt="language" src={js} />
        </div>
        <div className="absolute z-10 h-24 w-24 bg-white bottom-32 right-48 -rotate-45 rounded-lg p-4 flex justify-center items-center">
          <Image alt="language" src={go} />
        </div>
        <div className="absolute z-10 h-20 w-20 bg-white bottom-52 right-12 rounded-lg p-3">
          <div className="relative w-full h-full">
            <Image alt="language" src={"/rust.svg"} layout="fill" />
          </div>
        </div>
        <div className="absolute z-10 h-12 w-12 bg-white bottom-64 right-40 -rotate-12 rounded-lg p-2">
          <div className="relative w-full h-full">
            <Image alt="language" src={"/solidity.svg"} layout="fill" />
          </div>
        </div>
      </div>
      <ul className={styles.items}>
        {Array(10)
          .fill("")
          .map((_, idx) => {
            return <li key={idx} />;
          })}
      </ul>
    </div>
  );
};
