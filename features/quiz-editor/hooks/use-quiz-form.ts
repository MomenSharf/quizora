"use client";

import { useFormContext } from "react-hook-form";

import type { QuizEditorInput } from "../validation/quiz";

export function useQuizForm() {
  return useFormContext<QuizEditorInput>();
}