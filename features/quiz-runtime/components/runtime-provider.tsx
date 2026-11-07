"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { useRuntimeActions } from "../store";
import { useRuntimeAutosave } from "../hooks/use-runtime-autosave";
import type { QuizAttemptRuntime } from "../types/runtime-types";

type RuntimeProviderProps = {
  attempt: QuizAttemptRuntime;
  children: ReactNode;
};

export function RuntimeProvider({
  attempt,
  children,
}: RuntimeProviderProps) {
  const { initializeAttempt } = useRuntimeActions();

  const initializedAttemptId = useRef<string | null>(null);

  useEffect(() => {
    if (initializedAttemptId.current === attempt.id) return;

    initializeAttempt(attempt);
    initializedAttemptId.current = attempt.id;
  }, [attempt, initializeAttempt]);

  return (
    <>
      <RuntimeAutosave />
      {children}
    </>
  );
}

function RuntimeAutosave() {
  useRuntimeAutosave({
    debounceMs: 2000,
    enabled: true,
  });

  return null;
}