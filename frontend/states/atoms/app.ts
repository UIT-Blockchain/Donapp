import { atom } from "recoil";

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

export { DarkmodeAtom, NearContextAtom, SelectedQuestAtom, ToggleTopBarAtom };
