"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { useRuntimeActions } from "../store";
import type { QuizAttemptRuntime } from "../types/runtime-types";

type InitializeGameplayProps = {
  attempt: QuizAttemptRuntime;
  children: ReactNode;
};

export function InitializeGameplay({
  attempt,
  children,
}: InitializeGameplayProps) {
  const { initializeAttempt } = useRuntimeActions();
  console.log(attempt.startedAt);
  

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
