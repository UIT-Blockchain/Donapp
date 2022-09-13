import { DefaultLayout } from "@layouts/DefaultLayout";
import { DetailsScreen } from "@screens/Details";

const Details: IPageComponent = ({}) => {
  return <DetailsScreen />;
};

Details.getLayout = (screen) => <DefaultLayout>{screen}</DefaultLayout>;

export default Details;
