import { Fragment } from "react";
import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";
import { s3BucketName, s3BucketRegion } from "@/lib/meals";

interface PageMealDetailsProps {
  params: {
    mealSlug: string;
  };
}

export const generateMetadata = async ({ params }: PageMealDetailsProps) => {
  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
};

const PageMealDetails = async ({ params }: PageMealDetailsProps) => {
  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://${s3BucketName}.s3.${s3BucketRegion}.amazonaws.com/${meal.image}`}
            fill
            alt={meal.title}
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </Fragment>
  );
};

export default PageMealDetails;
