"use client";

import { useFormContext } from "react-hook-form";

import type { QuizEditor } from "../validation/quiz";

export function useQuizForm() {
  return useFormContext<QuizEditor>();
}