import Image from "next/image";

interface CardProps {
  heading: string;
  thumbnail: string;
  listItems?: Array<{
    poolName: string;
    description: string;
  }>;
}
const Card: IComponent<CardProps> = ({ heading, thumbnail, listItems }) => (
  <div className="bg-gradient-to-b from-[#9C2CF3] to-[#3A49F9] text-white rounded-[3.5rem]">
    <h1 className="text-white">{heading}</h1>
    <div>
      <Image
        src={thumbnail}
        width={20}
        height={20}
        className="m-0"
        alt="pool thumbnail"
      />
    </div>

    {!!listItems && (
      <ul>
        {listItems.map((item) => (
          <li key={item.poolName}>
            <div>{item.poolName}</div>
            <div>{item.description}</div>
          </li>
        ))}
      </ul>
    )}
  </div>
);
export default Card;
