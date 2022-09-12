import { DefaultLayout } from "@layouts/DefaultLayout";
import { AppScreen } from "@screens/Home";

const Home: IPageComponent = ({}) => {
  return <AppScreen />;
};

Home.getLayout = (screen) => <DefaultLayout>{screen}</DefaultLayout>;

export default Home;
