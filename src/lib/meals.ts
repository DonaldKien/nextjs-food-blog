import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";

export const s3BucketName = process.env.S3_BUCKET_NAME;
export const s3BucketRegion = process.env.S3_REGION;

const s3 = new S3({
  region: s3BucketRegion,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const db = sql("meals.db");

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
};

interface GetMealProps {
  id: string;
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export const getMeal = async (mealSlug: string): Promise<GetMealProps> => {
  return db
    .prepare("SELECT * FROM meals WHERE slug = ?")
    .get(mealSlug) as GetMealProps;
};

interface SavedMealProps {
  title: string;
  summary: string;
  instructions: string;
  imageFile: File;
  creator: string;
  creator_email: string;
}

export const saveMeal = async <T extends SavedMealProps>(savedMeal: T) => {
  let uploadToDbMeal = {
    ...savedMeal,
    slug: "",
    instructions: "",
    image: "",
  };
  uploadToDbMeal.slug = slugify(savedMeal.title, {
    lower: true,
  });
  uploadToDbMeal.instructions = xss(savedMeal.instructions);

  const fileName = savedMeal.imageFile.name;
  // const stream = fs.createWriteStream(
  //   `public/images/mealDataImage/${fileName}`
  // );
  const bufferedImage = await savedMeal.imageFile.arrayBuffer();
  // stream.write(Buffer.from(bufferedImage), (error) => {
  //   if (error) {
  //     throw new Error("Saving image failed!");
  //   }
  // });
  // uploadToDbMeal.image = `/images/mealDataImage/${fileName}`;

  s3.putObject({
    Bucket: s3BucketName,
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: savedMeal.imageFile.type,
  });
  uploadToDbMeal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
         @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug
      )
    `
  ).run(uploadToDbMeal);
};
