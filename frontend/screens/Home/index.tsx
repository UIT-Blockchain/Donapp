import { NearContextAtom } from "@atoms/app";
import AnimationBox from "@components/AnimationBox";
import { cx } from "@utils/tools";
import initContract from "near-api";
import * as nearAPI from "near-api-js";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const BOATLOAD_OF_GAS = 10 ** 13;

export const AppScreen: IComponent = ({}) => {
  const [nearContext, setNearContext] = useRecoilState(NearContextAtom);

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

  // const onSubmit = async (event: any) => {
  //   event.preventDefault();

  //   const { fieldset, url1, url2, url3 } = event.target.elements;
  //   fieldset.disabled = true;

  //   console.log(process.env.NEXT_PUBLIC_CONTRACT_NAME);

  //   // call smartcontract set_balance method.
  //   await contract.ft_report_study_commit(
  //     {
  //       urls: [url1.value, url2.value, url3.value],
  //       receiver_id: currentUser.accountId,
  //     },
  //     BOATLOAD_OF_GAS
  //   );

  //   // obtain balance after smartcontract set_balance success.
  //   const balance: string = await contract.ft_balance_of({
  //     account_id: currentUser.accountId,
  //   });
  //   setBalance(balance);

  //   url1.value = "";
  //   url2.value = "";
  //   url3.value = "";
  //   fieldset.disabled = false;
  //   url1.focus();
  // };

  // console.log("pool:  ", pool);

  return (
    <div
      className={cx(
        "dark:text-white bg-default h-screen flex justify-center items-center"
      )}
    >
      {nearContext.currentUser ? (
        <div className="z-10">
          <div className="p-8 text-white" onClick={onClickSignOut}>
            Log out
          </div>
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
        </div>
      ) : (
        <div className="text-white z-10" onClick={onClickSignIn}>
          Sign in
        </div>
      )}
      <AnimationBox />
    </div>
  );
};
