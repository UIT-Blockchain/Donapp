import { DefaultLayout } from "@layouts/DefaultLayout";
import { DonappScreen } from "@screens/Donapp";

const Donapp: IPageComponent = ({}) => {
  return <DonappScreen />;
};

Donapp.getLayout = (screen) => <DefaultLayout>{screen}</DefaultLayout>;

export default Donapp;
