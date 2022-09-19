import * as nearAPI from "near-api-js";

type TDarkModeStatus = "dark" | "light" | "auto";
type TTopBarStatus = "hidden" | "show";

interface IPoolItem {
  id: string;
  streamer_id: string;
  quests: Array<IQuest>;
}
interface IQuest {
  id: number;
  challenger: string;
  pool_id: string;
  description: string;
  amount: number;
  vote_threshold: number;
  voter_ids: Array<string>;
}

interface NearUserView {
  accountId: string;
  balance: string;
}

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
  contract: nearAPI.Contract | undefined;
  currentUser: NearUserView | undefined;
  nearConfig: any | undefined;
  wallet: nearAPI.WalletConnection | undefined;
}

interface FormProps {
  onSubmit: (event: any) => void;
  currentUser: NearUserView;
}
