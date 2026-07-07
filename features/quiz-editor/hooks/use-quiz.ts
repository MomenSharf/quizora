"use client";

import {
  useCallback,
  useMemo,
} from "react";

import {
  useFieldArray,
  useWatch,
} from "react-hook-form";

import type {
  Question,
  QuestionType,
} from "@/features/quiz-editor/validation/question";


import { useQuizForm } from "../providers/quiz-form-provider";
import { createQuestion } from "../factories/create-question";

export function useQuiz() {
  const form = useQuizForm();

  const questionsFieldArray = useFieldArray({
    control: form.control,
    name: "questions",
    keyName: "key",
  });

  const questions = useWatch({
    control: form.control,
    name: "questions",
  });

  const addQuestion = useCallback(
    (type: QuestionType) => {
      questionsFieldArray.append(createQuestion(type));
    },
    [questionsFieldArray],
  );

  const insertQuestion = useCallback(
    (
      index: number,
      type: QuestionType,
    ) => {
      questionsFieldArray.insert(
        index,
        createQuestion(type),
      );
    },
    [questionsFieldArray],
  );

  const removeQuestion = useCallback(
    (index: number) => {
      questionsFieldArray.remove(index);
    },
    [questionsFieldArray],
  );

  const updateQuestion = useCallback(
    (
      index: number,
      question: Question,
    ) => {
      questionsFieldArray.update(
        index,
        question,
      );
    },
    [questionsFieldArray],
  );

  const moveQuestion = useCallback(
    (
      from: number,
      to: number,
    ) => {
      questionsFieldArray.move(
        from,
        to,
      );
    },
    [questionsFieldArray],
  );

  const replaceQuestions = useCallback(
    (questions: Question[]) => {
      questionsFieldArray.replace(
        questions,
      );
    },
    [questionsFieldArray],
  );

  return useMemo(
    () => ({
      questions,

      fields:
        questionsFieldArray.fields,

      addQuestion,

      insertQuestion,

      removeQuestion,

      updateQuestion,

      moveQuestion,

      replaceQuestions,
    }),
    [
      questions,
      questionsFieldArray.fields,
      addQuestion,
      insertQuestion,
      removeQuestion,
      updateQuestion,
      moveQuestion,
      replaceQuestions,
    ],
  );
}