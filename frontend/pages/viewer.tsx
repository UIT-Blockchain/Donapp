import { DefaultLayout } from "@layouts/DefaultLayout";
import { ViewerScreen } from "@screens/Viewer";

const Viewer: IPageComponent = ({}) => {
  return <ViewerScreen streamer_id="tranhuyducseven.testnet" />;
};

Viewer.getLayout = (screen) => <DefaultLayout>{screen}</DefaultLayout>;

export default Viewer;
