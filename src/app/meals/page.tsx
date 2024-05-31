import { Fragment } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import MealsGrid from "@/components/MealsGrid/MealsGrid";

const PageMeals = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>
          Delicious meals, created
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun.
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share You Favorite Recie</Link>
        </p>
      </header>
      <main className={classes.main}>
        <MealsGrid meals={[]}/>
      </main>
    </Fragment>
  );
};

export default PageMeals;
