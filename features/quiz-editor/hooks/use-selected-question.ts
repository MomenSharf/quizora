"use client";

import { useMemo } from "react";
import { useWatch } from "react-hook-form";

import { useSelectedQuestionId } from "../store";
import { useQuizForm } from "./use-quiz-form";

export function useSelectedQuestion() {
  const { control } = useQuizForm();

  const selectedQuestionId = useSelectedQuestionId()

  const questions = useWatch({
    control,
    name: "questions",
  });

  const questionIndex = useMemo(() => {
    if (!selectedQuestionId || !questions) {
      return -1;
    }

    return questions.findIndex(
      (question) => question.id === selectedQuestionId,
    );
  }, [questions, selectedQuestionId]);

  const question =
    questionIndex >= 0 ? questions?.[questionIndex] : undefined;

  return {
    selectedQuestionId,
    question,
    questionIndex,
    hasSelection: questionIndex >= 0,
  };
}