import { NearContextAtom, SelectedPool } from "@atoms/app";
import Account from "@components/Account";
import AnimationBox from "@components/AnimationBox";
import Pool from "@components/Pool";
import PoolButton from "@components/PoolButton";
import { cx } from "@utils/tools";
import initContract from "near-api";
import * as nearAPI from "near-api-js";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const AppScreen: IComponent = ({}) => {
  const [nearContext, setNearContext] = useRecoilState(NearContextAtom);
  const [selectedPool, setSelectedPool] = useRecoilState(SelectedPool);

  useEffect(() => {
    const initContractHandler = async () => {
      if (!nearContext) {
        initContract().then(
          ({ contract, currentUser, nearConfig, walletConnection }) => {
            setNearContext({
              contract: contract as nearAPI.Contract,
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
  }, [selectedPool, nearContext, setSelectedPool, setNearContext]);

  useEffect(() => {
    const handleGetPool = async () => {
      if (nearContext && nearContext.currentUser) {
        await nearContext.contract
          .get_pool({
            streamer_id:
              selectedPool?.streamer_id || nearContext.currentUser.accountId,
          })
          .then(setSelectedPool);
      }
    };

    handleGetPool();
  }, [nearContext, setSelectedPool]);

  if (!nearContext) {
    return <div>loading</div>;
  } else if (!nearContext.contract) {
    return <div>loading</div>;
  }

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
        "dark:text-white bg-default flex justify-center items-center relative h-full"
      )}
    >
      {nearContext.currentUser ? (
        <div
          className={cx(
            "dark:text-white px-32 pt-40 bg-center bg-contain  opacity-90 z-10"
          )}
        >
          <div className="header">
            <div className="absolute top-6 right-6">
              <Account
                accountId={nearContext.currentUser.accountId}
                balance={
                  nearContext.currentUser.balance.length > 22
                    ? nearContext.currentUser.balance.slice(0, 5) / 100
                    : 0
                }
                onClickSignOut={onClickSignOut}
              />
            </div>
            <Link href="https://github.com/UIT-Blockchain">
              <a
                className="logo w-20 h-20 absolute top-6 left-6"
                target="_blank"
              >
                <Image
                  src={`/mu-red.png`}
                  alt="mu-red"
                  width={80}
                  height={80}
                  className="m-0"
                />
              </a>
            </Link>
          </div>

          <div className="bg-default border-2 border-indigo-500 rounded-[3.5rem] p-12 w-[1200px]">
            <div className="header flex justify-end relative">
              <div className="absolute -right-[29.75rem] top-[12.75rem] origin-top-left rotate-12">
                <Image
                  src={`/cloud.png`}
                  alt="cloud"
                  width={448}
                  height={430}
                  className="m-0"
                />
              </div>
            </div>
            <div className="rounded-[3.5rem]">
              {selectedPool ? (
                <Pool {...selectedPool} />
              ) : (
                <div>
                  <PoolButton isJoin />
                  <PoolButton />
                </div>
              )}
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
