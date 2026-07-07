"use client";

import { useWatch } from "react-hook-form";

import { useQuizForm } from "../providers/quiz-form-provider";

export function useQuizMeta() {
  const { control } = useQuizForm();

  const info = useWatch({
    control,
    name: "info",
  });

  const settings = useWatch({
    control,
    name: "settings",
  });

  const appearance = useWatch({
    control,
    name: "appearance",
  });

  const questions = useWatch({
    control,
    name: "questions",
  });

  return {
    info,
    settings,
    appearance,
    questions,

    questionCount: questions.length,

    totalPoints: questions.reduce(
      (total, question) => total + question.points,
      0,
    ),

    isEmpty: questions.length === 0,
  };
}