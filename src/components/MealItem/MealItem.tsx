import Link from "next/link";
import Image from "next/image";
import { s3BucketName, s3BucketRegion } from "@/lib/meals";
import classes from "./MealItem.module.css";

const MealItem = ({ title, slug, image, summary, creator }: any) => {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={`https://${s3BucketName}.s3.${s3BucketRegion}.amazonaws.com/${image}`} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
};

export default MealItem;
