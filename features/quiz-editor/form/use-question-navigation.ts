"use client";

import { useCallback } from "react";

import {
  useQuestionOrder,
  useSelectedQuestionId,
  useEditorActions,
} from "../store";

export function useQuestionNavigation() {
  const order = useQuestionOrder();

  const selectedId = useSelectedQuestionId();

  const { selectQuestion } = useEditorActions();

  const currentIndex = selectedId
    ? order.indexOf(selectedId)
    : -1;

  const canGoPrevious = currentIndex > 0;

  const canGoNext =
    currentIndex !== -1 &&
    currentIndex < order.length - 1;

  const previous = useCallback(() => {
    if (!canGoPrevious) {
      return;
    }

    selectQuestion(order[currentIndex - 1]);
  }, [
    canGoPrevious,
    currentIndex,
    order,
    selectQuestion,
  ]);

  const next = useCallback(() => {
    if (!canGoNext) {
      return;
    }

    selectQuestion(order[currentIndex + 1]);
  }, [
    canGoNext,
    currentIndex,
    order,
    selectQuestion,
  ]);

  const first = useCallback(() => {
    if (order.length === 0) {
      return;
    }

    selectQuestion(order[0]);
  }, [order, selectQuestion]);

  const last = useCallback(() => {
    if (order.length === 0) {
      return;
    }

    selectQuestion(order[order.length - 1]);
  }, [order, selectQuestion]);

  const select = useCallback(
    (id: string) => {
      if (!order.includes(id)) {
        return;
      }

      selectQuestion(id);
    },
    [order, selectQuestion],
  );

  return {
    currentIndex,

    total: order.length,

    canGoPrevious,

    canGoNext,

    previous,

    next,

    first,

    last,

    select,
  };
}