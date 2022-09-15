import IconDashboard from "@components/IconDashboard";
import NewPool from "@components/NewPool";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabsOrientation,
} from "@reach/tabs";
import Image from "next/image";
import Link from "next/link";

const poolList = [
  {
    poolName: "trung thu",
    description: "15/8/2022",
  },
  {
    poolName: "trung thu",
    description: "15/8/2022",
  },
  {
    poolName: "trung thu",
    description: "15/8/2022",
  },
];
const panes = [
  {
    menuItem: <IconDashboard name="home" />,
    render: (
      <NewPool
        streamerName="3RB"
        thumbnailUrl="/mu-red.png"
        poolList={poolList}
      />
    ),
  },
  {
    menuItem: <IconDashboard name="home" />,
    render: <div className="text-white">Create 2 pool</div>,
  },
  {
    menuItem: <IconDashboard name="home" />,
    render: <div className="text-white">Create 3 pool</div>,
  },
  {
    menuItem: <IconDashboard name="home" />,
    render: <div className="text-white">Create 4 pool</div>,
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard p-4 relative">
      <div className="flex">
        <Link href="/">
          <a className="logo w-20 h-20">
            <Image
              src={`/mu-red.png`}
              alt="mu-red"
              width={20}
              height={20}
              className="m-0"
            />
          </a>
        </Link>
      </div>
      <div className="bg-default border-2 border-indigo-500 rounded-[3.5rem]">
        <Tabs orientation={TabsOrientation.Vertical}>
          <TabList className="flex items-center justify-around">
            {panes.map((pane, index) => (
              <Tab key={index} className="!border-none w-[91px] !py-12">
                {pane.menuItem}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="tab-panels px-12 pt-2 pb-12 grow rounded-b-[3.5rem] h-[918px]">
            {panes.map((pane, index) => (
              <TabPanel key={index} className="h-full">
                {pane.render}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
