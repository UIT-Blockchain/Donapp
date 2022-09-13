import { useRouter } from "next/router";

export const DefaultLayout: IComponent = ({ children }) => {
  const router = useRouter();
  return <div className="default-layout">Main Layout{children}</div>;
};
