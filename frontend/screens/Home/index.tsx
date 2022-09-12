import { Banner } from "@components/Banner";
import { Projects } from "@configs/detail";
import { cx } from "@utils/tools";
import Head from "next/head";

import { ProjectCard } from "./ProjectCard";
import styles from "./styles.module.scss";

export const AppScreen: IComponent = ({}) => {
  const projectArr = Object.values(Projects);

  return (
    <div className={cx("dark:text-white")}>
      Hello
    </div>
  );
};
