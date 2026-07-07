"use client";

import { useCallback, useMemo } from "react";

import { useWatch } from "react-hook-form";

import type { Question } from "@/features/quiz-editor/validation/question";

import { useQuizForm } from "../providers/quiz-form-provider";

interface UseQuestionOptions {
  index: number;
}

export function useQuestion({
  index,
}: UseQuestionOptions) {
  const form = useQuizForm();

  const question = useWatch({
    control: form.control,
    name: `questions.${index}`,
  });

  const path = useMemo(
    () => `questions.${index}` as const,
    [index],
  );

  const setQuestion = useCallback(
    (value: Question) => {
      form.setValue(path, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [form, path],
  );

  const setValue = useCallback(
    <T extends keyof Question>(
      key: T,
      value: Question[T],
    ) => {
      form.setValue(
        `${path}.${key}` as never,
        value as never,
        {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        },
      );
    },
    [form, path],
  );

  return {
    question,

    path,

    setQuestion,

    setValue,

    remove() {
      const questions = form.getValues("questions");

      form.setValue(
        "questions",
        questions.filter((_, i) => i !== index),
        {
          shouldDirty: true,
        },
      );
    },

    duplicate() {
      const questions = form.getValues("questions");

      form.setValue(
        "questions",
        [
          ...questions.slice(0, index + 1),
          structuredClone(question),
          ...questions.slice(index + 1),
        ],
        {
          shouldDirty: true,
        },
      );
    },
  };
}