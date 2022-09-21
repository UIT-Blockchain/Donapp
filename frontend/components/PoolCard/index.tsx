import { NearContextAtom } from "@atoms/app";
import { BOATLOAD_OF_GAS } from "@utils/constant";
import { capitalize } from "@utils/tools";
import Image from "next/image";
import { useRecoilValue } from "recoil";

interface PoolCardProps {
  heading: string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
  listItems?: Array<IQuest>;
  isStreamer?: boolean;
}
const PoolCard: IComponent<PoolCardProps> = ({
  heading,
  thumbnail,
  listItems,
  isStreamer,
}) => {
  const nearContext = useRecoilValue(NearContextAtom);

  const handleRejectQuest = async (id: string) => {
    if (nearContext) {
      await nearContext.contract.reject_quest(
        {
          quest_id: id,
        },
        BOATLOAD_OF_GAS
      );
    }
  };
  const handleVoteQuest = async (id: string) => {
    if (nearContext) {
      await nearContext.contract.vote_quest(
        {
          quest_id: id,
        },
        BOATLOAD_OF_GAS
      );
    }
  };

  return (
    <div className="bg-card text-white rounded-3xl py-6">
      <h1 className="text-amber-300 text-4xl text-center font-bold ml-6 mb-6">
        {heading}.pool
      </h1>
      <div>
        <Image
          src={"/dota.png"}
          width={720}
          height={480}
          layout="responsive"
          className="m-0"
          alt="dota2"
        />
      </div>

      {!!listItems && (
        <ul className="py-6 overflow-hidden">
          {listItems.map((item: IQuest) => (
            <li
              className="px-8 py-6 flex gap-x-6 border-b-2 border-gray-700"
              key={item.id}
            >
              <div className="content grow">
                <div className="flex items-center">
                  <span className="text-2xl font-medium grow">
                    {capitalize(item.description)}
                  </span>
                  <span className="italic font-light opacity-90 text-right mr-2">
                    - {item.challenger}
                  </span>
                </div>
                <div className="flex flex-col mt-4">
                  <span className="grow flex items-center py-2">
                    Amount: <span className="mx-2"> {item.amount} </span>
                    <Image
                      src={"/near.png"}
                      width={30}
                      height={30}
                      layout="fixed"
                      alt="vote"
                      className="bg-white rounded-full"
                    />
                  </span>
                  <span className="my-2">
                    Votes need: {item.vote_threshold}
                  </span>
                  <span className="mt-2">
                    Percentage:{" "}
                    {(item.voter_ids?.length / item.vote_threshold) * 100}%
                  </span>
                </div>
              </div>
              {isStreamer ? (
                <div
                  onClick={() => {
                    handleRejectQuest(item.id.toString());
                  }}
                  className="m-0 hover:scale-105 duration-300 hover:cursor-pointer p-2 rounded-full h-fit"
                >
                  <Image
                    src={"/rejected.png"}
                    width={40}
                    height={40}
                    layout="fixed"
                    alt="vote"
                  />
                </div>
              ) : (
                <div
                  onClick={() => {
                    handleVoteQuest(item.id.toString());
                  }}
                  className="m-0 hover:scale-105 duration-300 hover:cursor-pointer p-2 rounded-full border-2 border-[#8c491c] h-fit"
                >
                  <Image
                    src={"/vote.png"}
                    width={40}
                    height={40}
                    layout="fixed"
                    alt="vote"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default PoolCard;
