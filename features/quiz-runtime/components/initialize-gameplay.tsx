"use client";

import { useEffect, useRef, type ReactNode } from "react";

import type { QuizAttemptRuntime } from "../types/runtime-types";
import { useRuntimeStore } from "../store";

type InitializeGameplayProps = {
  attempt: QuizAttemptRuntime;
  children: ReactNode;
};

export function InitializeGameplay({
  attempt,
  children,
}: InitializeGameplayProps) {
  const initializeAttempt = useRuntimeStore(
    (state) => state.initializeAttempt,
  );

  const initializedAttemptId = useRef<string | null>(null);

  useEffect(() => {
    if (initializedAttemptId.current === attempt.id) {
      return;
    }

    initializeAttempt(attempt);
    initializedAttemptId.current = attempt.id;
  }, [attempt, initializeAttempt]);

  return <>{children}</>;
}