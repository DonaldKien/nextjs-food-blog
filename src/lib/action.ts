"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

const isInvalidText = (text: FormDataEntryValue | null) => {
  return !text || (typeof text === "string" && text.trim() === "");
};

interface ShareMealFormState {
  message?: string;
}

export const shareMeal = async (
  formState: ShareMealFormState,
  formData: FormData
) => {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    imageFile: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !((meal?.creator_email as string) || "").includes("@") ||
    !meal.imageFile ||
    (meal.imageFile instanceof File && meal.imageFile.size === 0)
  ) {
    return {
      message: "Invalid input.",
    };
  }

  await saveMeal<any>(meal);
  revalidatePath("/meals");
  redirect("/meals");
};
