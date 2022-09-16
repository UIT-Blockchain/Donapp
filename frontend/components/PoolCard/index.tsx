import { PoolSelectedAtom } from "@atoms/app";
import { capitalize } from "@utils/tools";
import Image from "next/image";
import { useSetRecoilState } from "recoil";

interface PoolCardProps {
  heading: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  listItems?: Array<IPoolItem>;
}
const PoolCard: IComponent<PoolCardProps> = ({
  heading,
  thumbnail,
  listItems,
}) => {
  const setSelectedPool = useSetRecoilState(PoolSelectedAtom);

  return (
    <div className="bg-card text-white rounded-3xl py-6">
      <h1 className="text-white text-4xl font-bold ml-6 mb-6">{heading}</h1>
      <div>
        <Image
          src={thumbnail.url}
          width={thumbnail.width}
          height={thumbnail.height}
          layout="responsive"
          className="m-0"
          alt="pool thumbnail"
        />
      </div>

      {!!listItems && (
        <ul className="py-6 overflow-hidden">
          {listItems.map((item, idx) => (
            <li
              className="px-8 py-6 flex gap-x-6 border-b-2 border-gray-700 hover:border-indigo-700 hover:bg-black hover:scale-105 hover:cursor-pointer duration-300"
              key={idx}
              onClick={() => setSelectedPool(item)}
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
                  {capitalize(item.poolName)}
                </div>
                <div className="text-sm font-light opacity-90 text-right mr-2">
                  {item.description}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default PoolCard;
