import { NearContextAtom } from "@atoms/app";
import AnimationBox from "@components/AnimationBox";
import Pool from "@components/Pool";
import { cx } from "@utils/tools";
import initContract from "near-api";
import * as nearAPI from "near-api-js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const AppScreen: IComponent = ({}) => {
  const [nearContext, setNearContext] = useRecoilState(NearContextAtom);
  const [pool, setPool] = useState<IPoolItem | null>(null);

  useEffect(() => {
    const initContractHandler = async () => {
      if (!nearContext) {
        initContract().then(
          ({ contract, currentUser, nearConfig, walletConnection }) => {
            setNearContext({
              contract: contract as nearAPI.Contract &
                SteadyStudyTokenContractMethods,
              currentUser,
              nearConfig,
              wallet: walletConnection,
            });
          }
        );
      }
    };
    if (!nearContext) {
      initContractHandler();
    }
  });
  useEffect(() => {
    const handleGetPool = async () => {
      if (nearContext) {
        await nearContext.contract
          .get_pool({
            streamer_id: nearContext.currentUser.accountId,
          })
          .then((data: IPoolItem) => setPool(data));
      }
    };

    handleGetPool();
  }, []);

  if (!nearContext) {
    return <div>loading</div>;
  } else if (!nearContext.contract) {
    return <div>loading</div>;
  }

  // const contract = nearContext.contract as SteadyStudyTokenContractMethods;
  // const currentUser: NearUserView = nearContext.currentUser as NearUserView;
  const wallet: nearAPI.WalletConnection =
    nearContext.wallet as nearAPI.WalletConnection;

  const onClickSignIn = () => {
    wallet.requestSignIn(
      {
        contractId: nearContext.nearConfig.contractName,
        methodNames: ["ft_balance_of", "ft_report_study_commit"],
      },
      "SteadyStudyToken"
    );
  };

  const onClickSignOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <div
      className={cx(
        "dark:text-white bg-default h-screen flex justify-center items-center relative"
      )}
    >
      {nearContext.currentUser ? (
        <div
          className={cx(
            "dark:text-white py-28 px-32 bg-center bg-contain  opacity-90 z-10"
          )}
        >
          <div className="z-10">
            <div className="p-8 text-white" onClick={onClickSignOut}>
              Log out
            </div>
          </div>

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
              <Pool {...pool} />
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={onClickSignIn}
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
                CONNECT TO THE APP
              </span>
            </div>
          </div>
        </div>
      )}
      <AnimationBox />
    </div>
  );
};
