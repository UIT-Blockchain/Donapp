import PoolCard from "@components/PoolCard";
import PoolClose from "@components/PoolClose";
import PoolForm from "@components/PoolForm";
import { useRecoilValue } from "recoil";

import { NearContextAtom } from "../../states/atoms/app";
import { IPoolItem } from "../../types/app";
import QuestForm from "../QuestForm";

const Pool: IComponent<IPoolItem> = ({ streamer_id, quests }) => {
  const pool_id = streamer_id && streamer_id.concat(".pool");
  const nearContext = useRecoilValue(NearContextAtom);
  const isStreamer = !!(streamer_id && nearContext.currentUser);

  return (
    <div className="grid grid-cols-3 gap-4">
      {!!streamer_id && (
        <PoolCard
          heading={streamer_id}
          listItems={quests}
          isStreamer={isStreamer}
        />
      )}
      <div className="col-span-2 px-8 ml-24 pr-40 flex flex-col justify-center gap-y-16">
        {isStreamer ? (
          !!streamer_id ? (
            <PoolClose pool_id={pool_id} />
          ) : (
            <PoolForm />
          )
        ) : (
          <QuestForm />
        )}
      </div>
    </div>
  );
};

export default Pool;
