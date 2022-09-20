import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

/**
 * Global dark mode state of app
 */
const DarkmodeAtom = atom<TDarkModeStatus>({
  key: "DARK_MODE_STATE",
  default: "auto",
});
const ToggleTopBarAtom = atom<TTopBarStatus>({
  key: "TOP_BAR_STATUS",
  default: "hidden",
});

const SelectedQuestAtom = atom<string | null>({
  key: "SELECTED_QUEST",
  default: null,
});
const NearContextAtom = atom<NearContractContext | null>({
  key: "NEAR_CONTEXT",
  default: null,
  dangerouslyAllowMutability: true,
});

const SelectedPool = atom<IPoolItem | null>({
  key: "SELECTED_POOL",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

const QuestIdCounter = atom<number>({
  key: "QUEST_ID_COUNTER",
  default: -1,
  effects_UNSTABLE: [persistAtom],
});

export {
  DarkmodeAtom,
  NearContextAtom,
  QuestIdCounter,
  SelectedPool,
  SelectedQuestAtom,
  ToggleTopBarAtom,
};
