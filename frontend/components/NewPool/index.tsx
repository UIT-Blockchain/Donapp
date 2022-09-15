import Card from "@components/Card";

interface NewPoolProps {
  streamerName: string;
  thumbnailUrl?: string;
  poolList?: Array<{
    poolName: string;
    description: string;
  }>;
}

const NewPool: IComponent<NewPoolProps> = ({
  streamerName,
  thumbnailUrl,
  poolList,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card
        heading={streamerName}
        thumbnail={thumbnailUrl ? thumbnailUrl : "null"}
        listItems={poolList}
      />
      <div>Card</div>
    </div>
  );
};

export default NewPool;
