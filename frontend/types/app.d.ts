import * as nearAPI from "near-api-js";

type TDarkModeStatus = "dark" | "light" | "auto";
type TTopBarStatus = "hidden" | "show";

interface IPoolItem {
  id: string;
  poolName?: string;
  description?: string;
  challenger_of_quest: any;
}

interface NearUserView {
  accountId: string;
  balance: string;
}

//  interface AppStatusMessageSetContext {
//     message: string;
//     account_id: string;
// }
//  interface AppStatusMessageGetContext {
//     account_id: string;
// }
//  interface NearContractStatusMessageMethods {
//     // see awesome-rust-dapp/src/lib.rs#StatusMessage.set_status
//     set_status: (context: AppStatusMessageSetContext, boatloadOfGas: string) => Promise<void>;
//     // see awesome-rust-dapp/src/lib.rs#StatusMessage.get_status
//     get_status: (context: AppStatusMessageGetContext) => Promise<string>
// }
interface NearCallFtBalanceOfContext {
  account_id: string;
}
interface AppReportSteudyCommitContext {
  receiver_id: string;
  memo?: string;
  urls: string[];
}
interface SteadyStudyTokenContractMethods {
  ft_report_study_commit: (
    context: AppReportSteudyCommitContext,
    boatloadOfGas: string
  ) => Promise<void>;
  ft_balance_of: (context: NearCallFtBalanceOfContext) => Promise<string>;
}
interface NearContractContext {
  contract: (nearAPI.Contract & SteadyStudyTokenContractMethods) | undefined;
  currentUser: NearUserView | undefined;
  nearConfig: any | undefined;
  wallet: nearAPI.WalletConnection | undefined;
}

interface FormProps {
  onSubmit: (event: any) => void;
  currentUser: NearUserView;
}
