import { CarouselComponent } from "@components/Carousel";
import { ContentComponent } from "@components/Content";
import { WidgetComponent } from "@components/Widget";
import { Projects } from "@configs/detail";
import { cx } from "@utils/tools";
import Head from "next/head";
import Link from "next/link";

export const DetailsScreen: IComponent = ({}) => {
  const projectPrefix = window.location.pathname.split("/").pop();
  const projectDetail = Projects[projectPrefix!];

  /**
   * Fallback to warning if project not found
   */
  if (!projectDetail) {
    return (
      <div
        className="w-full flex justify-center items-center bg-white dark:bg-default"
        style={{ height: "80vh" }}
      >
        <h1 className="text-2xl text-black dark:text-white opacity-80">
          THIS PROJECT IS NOT <span className="font-bold">AVAILABLE</span>
        </h1>
      </div>
    );
  }

  const { data } = projectDetail;

  const content = data.content;
  const widget = data.widget_detail_1;
  const widget2 = data.widget_detail_2;
  const projectArr = Object.values(Projects);

  return (
    <div className={cx("dark:text-white")}>
      <Head>
        <title>DEVIN {content.heading}</title>
        <meta name="description" content={content.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="details min-h-screen ">
        <div className="container mx-auto px-1 pt-0 pb-0">
          <div className="p-2 pt-10 flex flex-row items-center dark:text-light">
            <Link href="/#projects" passHref>
              <span className="font-bold opacity-70 text-inherit cursor-pointer hover:opacity-100">
                Our works
              </span>
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mx-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="opacity-70 text-default dark:text-white">
              {content.heading}
            </span>
          </div>
          <div className="grid grid-rows-3 xl:grid-rows-none xl:grid-cols-3 gap-10">
            <div className="row-span-2 xl:col-span-2 flex flex-col p-2">
              <ContentComponent {...content} />
            </div>
            <div className="flex flex-col justify-between  xl:flex xl:flex-col p-2">
              <WidgetComponent {...widget} />
              <WidgetComponent {...widget2} />
            </div>
          </div>
          <div className="more-projects">
            <h1 className="text-3xl font-bold p-3">More projects:</h1>
            <CarouselComponent slides={projectArr} />
          </div>
        </div>
      </main>
    </div>
  );
};
