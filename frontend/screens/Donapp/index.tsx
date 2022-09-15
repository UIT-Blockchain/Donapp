import Dashboard from "@components/Dashboard";
import { cx } from "@utils/tools";

export const DonappScreen: IComponent = ({}) => {
  return (
    <div
      className={cx(
        "dark:text-white bg-black py-32 px-28 bg-center bg-contain bg-[url('/bg-app.jpg')] opacity-90"
      )}
    >
      <div className="h-full  rounded-[3.5rem]">
        <Dashboard />
      </div>
    </div>
  );
};
