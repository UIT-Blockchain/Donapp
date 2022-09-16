import PoolCard from "@components/PoolCard";
import PoolForm from "@components/PoolForm";

interface NewPoolProps {
  streamerName: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  poolList?: Array<{
    poolName: string;
    description: string;
  }>;
}

const NewPool: IComponent<NewPoolProps> = ({
  streamerName,
  thumbnail,
  poolList,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <PoolCard
        heading={streamerName}
        thumbnail={thumbnail}
        listItems={poolList}
      />
      <div className="col-span-2 p-8 mt-12 ml-24 pr-40">
        <PoolForm />
      </div>
    </div>
  );
};

export default NewPool;
