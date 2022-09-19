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
  listItems?: IQuests;
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
      <h1 className="text-white text-4xl font-bold ml-6 mb-6">{heading}</h1>
      <div>
        <Image
          src={"/lol.png"}
          width={1200}
          height={400}
          layout="responsive"
          className="m-0"
          alt="pool thumbnail"
        />
      </div>

      {!!listItems && (
        <ul className="py-6 overflow-hidden">
          {listItems.map((item: IQuest) => (
            <li
              className="px-8 py-6 flex gap-x-6 border-b-2 border-gray-700 hover:border-indigo-700 hover:bg-black hover:scale-105 hover:cursor-pointer duration-300"
              key={item.id}
            >
              <div className="icon">
                <Image
                  src="/tx-icon.png"
                  width={24}
                  height={24}
                  className="m-0"
                  alt="icon"
                  layout="fixed"
                />
              </div>
              <div className="content grow">
                <div className="text-2xl font-medium">
                  {capitalize(item.description)}
                </div>
                <div className="text-sm font-light opacity-90 text-right mr-2">
                  {item.challenger}
                </div>
                <div>{item.amount}</div>
              </div>
              {isStreamer ? (
                <div
                  onClick={() => {
                    handleRejectQuest(item.id);
                  }}
                >
                  REJECT
                </div>
              ) : (
                <div
                  onClick={() => {
                    handleVoteQuest(item.id);
                  }}
                >
                  VOTE
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
