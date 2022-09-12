import { FooterComponent } from "@components/Footer";
import { TopBarComponent } from "@components/TopBar";
import { useRouter } from "next/router";

import { TransitionLayout } from "./TransitionLayout";

export const DefaultLayout: IComponent = ({ children }) => {
  const router = useRouter();
  return (
    <div className="default-layout">
      <TopBarComponent />
      <TransitionLayout location={router.pathname}>
        <>
          {children}
          <FooterComponent />
        </>
      </TransitionLayout>
    </div>
  );
};
