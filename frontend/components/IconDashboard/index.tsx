import Image from "next/image";

interface IconDashboardProps {
  name: string;
}
const IconDashboard: IComponent<IconDashboardProps> = ({ name }) => {
  return (
    <div className="icon-dashboard w-full flex items-center justify-center hover:scale-150 duration-300 z-50">
      <span className="icon-dashboard flex justify-center items-center w-[32px]">
        <Image
          className="w-full h-full opacity-90"
          src={`/icons/${name}.svg`}
          width="20"
          height="20"
          alt="icon"
        />
      </span>
    </div>
  );
};

export default IconDashboard;
