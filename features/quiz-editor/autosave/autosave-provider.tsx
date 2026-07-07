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


import { useQuizForm } from "../providers/quiz-form-provider";

type AutosaveContextValue = {
  save: () => Promise<void>;
};

const AutosaveContext =
  createContext<AutosaveContextValue | null>(null);

interface Props extends PropsWithChildren {
  enabled?: boolean;
  delay?: number;
}

export function AutosaveProvider({
  children,
  enabled = true,
  delay = 1500,
}: Props) {
  const form = useQuizForm();

  const timer = useRef<NodeJS.Timeout | null>(null);

  const quiz = useWatch({
    control: form.control,
  });

  const save = async () => {
    const result = await form.trigger();

    if (!result) return;

    await updateQuiz(
      form.getValues(),
    );

    form.reset(
      form.getValues(),
      {
        keepDirty: false,
      },
    );
  };

  useEffect(() => {
    if (!enabled) return;

    if (!form.formState.isDirty) return;

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      save();
    }, delay);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [
    quiz,
    enabled,
    delay,
    form.formState.isDirty,
  ]);

  const value = useMemo(
    () => ({
      save,
    }),
    [],
  );

  return (
    <AutosaveContext value={value}>
      {children}
    </AutosaveContext>
  );
}

export function useAutosave() {
  const context = use(AutosaveContext);

  if (!context) {
    throw new Error(
      "useAutosave must be used inside AutosaveProvider",
    );
  }

  return context;
}