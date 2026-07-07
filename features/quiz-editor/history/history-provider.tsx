"use client";

import {
  createContext,
  use,
  useEffect,
  useMemo,
  useRef,
  type PropsWithChildren,
} from "react";

import { useWatch } from "react-hook-form";

import type { QuizEditor } from "@/features/quiz-editor/validation/quiz";

import { useQuizForm } from "../providers/quiz-form-provider";

type HistoryContextValue = {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

const HistoryContext =
  createContext<HistoryContextValue | null>(null);

interface Props extends PropsWithChildren {
  limit?: number;
}

export function HistoryProvider({
  children,
  limit = 50,
}: Props) {
  const form = useQuizForm();

  const history = useRef<QuizEditor[]>([]);

  const index = useRef(-1);

  const previous = useRef<QuizEditor | null>(null);

  const quiz = useWatch({
    control: form.control,
  }) as QuizEditor;

  useEffect(() => {
    if (!previous.current) {
      previous.current = quiz;
      return;
    }

    if (
      JSON.stringify(previous.current) ===
      JSON.stringify(quiz)
    ) {
      return;
    }

    history.current =
      history.current.slice(
        0,
        index.current + 1,
      );

    history.current.push(
      previous.current,
    );

    if (history.current.length > limit) {
      history.current.shift();
    } else {
      index.current++;
    }

    previous.current = quiz;
  }, [quiz, limit]);

  const undo = () => {
    if (index.current < 0) return;

    const value =
      history.current[index.current];

    form.reset(value, {
      keepDirty: true,
    });

    index.current--;
  };

  const redo = () => {
    const next =
      history.current[index.current + 1];

    if (!next) return;

    form.reset(next, {
      keepDirty: true,
    });

    index.current++;
  };

  const value = useMemo(
    () => ({
      undo,
      redo,

      canUndo:
        index.current >= 0,

      canRedo:
        index.current <
        history.current.length - 1,
    }),
    [],
  );

  return (
    <HistoryContext value={value}>
      {children}
    </HistoryContext>
  );
}

export function useHistory() {
  const context = use(HistoryContext);

  if (!context) {
    throw new Error(
      "useHistory must be used inside HistoryProvider",
    );
  }

  return context;
}