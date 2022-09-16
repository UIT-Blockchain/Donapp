import PoolCard from "@components/PoolCard";
import PoolClose from "@components/PoolClose";
import PoolForm from "@components/PoolForm";

interface PoolProps {
  streamerName: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  poolList?: Array<{
    id: number;
    poolName: string;
    description: string;
  }>;
}

const Pool: IComponent<PoolProps> = ({ streamerName, thumbnail, poolList }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <PoolCard
        heading={streamerName}
        thumbnail={thumbnail}
        listItems={poolList}
      />
      <div className="col-span-2 px-8 ml-24 pr-40 flex flex-col justify-center gap-y-16">
        <PoolForm />
        <PoolClose />
      </div>
    </div>
  );
};

export default Pool;
