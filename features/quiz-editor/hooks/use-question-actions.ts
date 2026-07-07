"use client";

import { useCallback } from "react";

import { useFieldArray } from "react-hook-form";

import { duplicateQuestion } from "@/features/quiz-editor/validation/question/factories/duplicate-question";
import { createQuestion } from "@/features/quiz-editor/validation/question/factories/create-question";
import type { QuestionType } from "@/features/quiz-editor/validation/question";

import { useQuizForm } from "../providers/quiz-form-provider";

export function useQuestionActions() {
  const form = useQuizForm();

  const { fields, append, insert, remove, move, update } =
    useFieldArray({
      control: form.control,
      name: "questions",
      keyName: "key",
    });

  const add = useCallback(
    (type: QuestionType) => {
      append(createQuestion(type));
    },
    [append],
  );

  const insertAfter = useCallback(
    (
      index: number,
      type: QuestionType,
    ) => {
      insert(index + 1, createQuestion(type));
    },
    [insert],
  );

  const duplicate = useCallback(
    (index: number) => {
      const question = form.getValues(
        `questions.${index}`,
      );

      insert(
        index + 1,
        duplicateQuestion(question),
      );
    },
    [form, insert],
  );

  const removeQuestion = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  const moveUp = useCallback(
    (index: number) => {
      if (index === 0) return;

      move(index, index - 1);
    },
    [move],
  );

  const moveDown = useCallback(
    (index: number) => {
      if (index >= fields.length - 1) return;

      move(index, index + 1);
    },
    [move, fields.length],
  );

  const replace = useCallback(
    (index: number, value: typeof fields[number]) => {
      update(index, value);
    },
    [update],
  );

  return {
    add,
    insertAfter,
    duplicate,
    remove: removeQuestion,
    moveUp,
    moveDown,
    replace,
  };
}