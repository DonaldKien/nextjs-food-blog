import { Fragment, ReactNode, Suspense } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import MealsGrid from "@/components/MealsGrid/MealsGrid";
import { getMeals } from "@/lib/meals";

export const metadata = {
  title: "All Meals",
  description: "Browse the delicious meals shared by out vibrant community.",
};

const Meals = async (): Promise<JSX.Element> => {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};

const PageMeals = async () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>
          Delicious meals, created
          <span className={classes.highlight}> by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun.
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share You Favorite Recie</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </Fragment>
  );
};

export default PageMeals;
