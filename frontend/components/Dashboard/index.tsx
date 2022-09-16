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

const streamers = [
  {
    name: "Thay Giao Ba",
    thumbnail: { url: "/card/lol.png", width: 1200, height: 675 },
    poolList: [
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
    ],
  },
];
const panes = [
  {
    menuItem: <IconDashboard name="home" />,
    render: (
      <NewPool
        streamerName={streamers[0].name}
        thumbnail={streamers[0].thumbnail}
        poolList={streamers[0].poolList}
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
    <div className="dashboard">
      <Tabs className="flex gap-4" orientation={TabsOrientation.Vertical}>
        <TabList className="flex flex-col justify-center w-[80px]">
          {panes.map((pane, index) => (
            <Tab key={index} className="!border-none !py-16">
              {pane.menuItem}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="tab-panels px-12 pt-2 pb-12 grow rounded-b-[3.5rem]">
          {panes.map((pane, index) => (
            <TabPanel key={index}>{pane.render}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Dashboard;
