import PoolCard from "@components/PoolCard";
import PoolClose from "@components/PoolClose";
import PoolForm from "@components/PoolForm";

const Pool: IComponent<IPoolItem> = ({ streamer_id, quests }) => {
  const pool_id = streamer_id && streamer_id.concat(".pool");

  return (
    <div className="grid grid-cols-3 gap-4">
      {!!streamer_id && <PoolCard heading={streamer_id} listItems={quests} />}
      <div className="col-span-2 px-8 ml-24 pr-40 flex flex-col justify-center gap-y-16">
        {!!streamer_id ? <PoolClose pool_id={pool_id} /> : <PoolForm />}
      </div>
    </div>
  );
};

export default Pool;
