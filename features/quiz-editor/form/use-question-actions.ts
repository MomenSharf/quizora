"use client";

import { useCallback } from "react";
import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";

import { createQuestion } from "../factories/create-question";
import { cloneQuestion } from "../factories/clone-question";

import {
  useQuestionOrder,
  useSelectedQuestionId,
  useEditorActions,
} from "../store";

import type { QuizEditorForm } from "../store";

export function useQuestionActions() {
  const form = useFormContext<QuizEditorForm>();

  const order = useQuestionOrder();

  const selectedId = useSelectedQuestionId();

  const {
    addQuestion,
    deleteQuestion,
    duplicateQuestion,
    moveQuestion,
    selectQuestion,
  } = useEditorActions();

  const { append, remove, move, insert } = useFieldArray({
    control: form.control,
    name: "questions",
    keyName: "key",
  });

  const create = useCallback(
    (type: QuestionType) => {
      const question = createQuestion(type);

      append(question);

      addQuestion(question.id);

      selectQuestion(question.id);
    },
    [append, addQuestion, selectQuestion],
  );

  const duplicate = useCallback(() => {
    if (!selectedId) {
      return;
    }

    const index = order.indexOf(selectedId);

    if (index === -1) {
      return;
    }

    const question = form.getValues(
      `questions.${index}`,
    );

    const cloned = cloneQuestion(question);

    insert(index + 1, cloned);

    duplicateQuestion(selectedId, cloned.id);

    selectQuestion(cloned.id);
  }, [
    duplicateQuestion,
    form,
    insert,
    order,
    selectQuestion,
    selectedId,
  ]);

  const removeSelected = useCallback(() => {
    if (!selectedId) {
      return;
    }

    const index = order.indexOf(selectedId);

    if (index === -1) {
      return;
    }

    remove(index);

    deleteQuestion(selectedId);
  }, [
    deleteQuestion,
    order,
    remove,
    selectedId,
  ]);

  const moveUp = useCallback(() => {
    if (!selectedId) {
      return;
    }

    const index = order.indexOf(selectedId);

    if (index <= 0) {
      return;
    }

    move(index, index - 1);

    moveQuestion(index, index - 1);
  }, [
    move,
    moveQuestion,
    order,
    selectedId,
  ]);

  const moveDown = useCallback(() => {
    if (!selectedId) {
      return;
    }

    const index = order.indexOf(selectedId);

    if (
      index === -1 ||
      index >= order.length - 1
    ) {
      return;
    }

    move(index, index + 1);

    moveQuestion(index, index + 1);
  }, [
    move,
    moveQuestion,
    order,
    selectedId,
  ]);

  return {
    create,
    duplicate,
    remove: removeSelected,
    moveUp,
    moveDown,
  };
}