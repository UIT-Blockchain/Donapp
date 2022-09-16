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

const PoolSelectedAtom = atom<IPoolItem | null>({
  key: "SELECTED_POOL",
  default: null,
});

export { DarkmodeAtom, PoolSelectedAtom, ToggleTopBarAtom };
