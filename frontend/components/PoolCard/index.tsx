import { capitalize } from "@utils/tools";
import Image from "next/image";

interface PoolCardProps {
  heading: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  listItems?: Array<{
    poolName: string;
    description: string;
  }>;
}
const PoolCard: IComponent<PoolCardProps> = ({
  heading,
  thumbnail,
  listItems,
}) => (
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
      <ul className="p-6 py-4">
        {listItems.map((item, idx) => (
          <li className="py-2 flex gap-x-6" key={idx}>
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
export default PoolCard;
