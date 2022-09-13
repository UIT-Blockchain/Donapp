import { DarkmodeAtom } from "@atoms/app";
import { usePrefersDarkMode } from "@hooks/usePrefersDarkMode";
import { cx } from "@utils/tools";
import { useRecoilValue } from "recoil";

export const MainLayout: IComponent = ({ children }) => {
  // Manual switch darkmode with state
  const currentBrowserDarkmode = usePrefersDarkMode();
  const darkmode = useRecoilValue(DarkmodeAtom);

  return (
    <div
      className={cx("main-layout w-full h-full overflow-x-hidden", {
        dark:
          darkmode === "auto" ? currentBrowserDarkmode : darkmode === "dark",
      })}
    >
      {/* Smooth out darkmode transition with transition-all */}
      <div
        className="w-full bg-white dark:bg-default transition-all"
        style={{ minHeight: "100%" }}
      >
        {children}
      </div>
    </div>
  );
};
