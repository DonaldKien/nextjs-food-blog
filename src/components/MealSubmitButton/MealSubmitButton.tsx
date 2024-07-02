"use client";
import { useFormStatus } from "react-dom";

const MealSubmitButton = () => {
  const { pending } = useFormStatus();
  return <button>{pending ? "Submitting..." : "Share Meal"}</button>;
};

export default MealSubmitButton;
