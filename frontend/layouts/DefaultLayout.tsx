import Head from "next/head";

export const DefaultLayout: IComponent = ({ children }) => {
  return (
    <div className="default-layout h-full">
      <Head>
        <title>Donapp</title>
        <meta name="description" content="Donapp - Donating platform " />
        <link rel="icon" href="/near-2.png" />
      </Head>
      {children}
    </div>
  );
};
