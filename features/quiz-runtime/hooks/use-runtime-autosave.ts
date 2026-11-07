"use client";

import { useEffect, useRef } from "react";

import { saveAttempt } from "../actions/save-attempt";
import { useRuntimeStore } from "../store";
import type { QuizAttemptRuntime } from "../types/runtime-types";

type UseRuntimeAutosaveOptions = {
  debounceMs?: number;
  enabled?: boolean;
};

export function useRuntimeAutosave({
  debounceMs = 2000,
  enabled = true,
}: UseRuntimeAutosaveOptions = {}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savingRef = useRef(false);

  const dirty = useRuntimeStore((state) => state.persistence.dirty);
  const attemptId = useRuntimeStore((state) => state.attemptId);
  const revision = useRuntimeStore((state) => state.persistence.revision);

  useEffect(() => {
    if (!enabled || !dirty || !attemptId) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      if (savingRef.current) return;

      savingRef.current = true;

      const store = useRuntimeStore.getState();

      try {
        while (useRuntimeStore.getState().persistence.dirty) {
          const current = useRuntimeStore.getState();

          const savedRevision = current.persistence.revision;

          const attempt: QuizAttemptRuntime = {
            id: current.attemptId!,
            quizId: current.quizId!,
            quizSnapshot: current.quizSnapshot,
            mode: current.mode,
            environment: current.environment,
            settings: current.settings,
            status: current.status,
            phase: current.phase,
            currentView: current.currentView,
            startedAt: current.startedAt,
            lastActivityAt: current.lastActivityAt,
            completedAt: current.completedAt,
            expiresAt: current.expiresAt,
            questions: current.questions,
            currentQuestionIndex: current.currentQuestionIndex,
            saveStatus: 'SAVED'
          };

          store.setSaveStatus("SAVING");
          store.setPersistenceError(null);
          store.setLastAttemptAt();

          const result = await saveAttempt({ attempt });

          if (result.error) {
            throw result.error;
          }

          useRuntimeStore.getState().markSaved(savedRevision);
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to save your attempt.";

        const current = useRuntimeStore.getState();

        current.setSaveStatus("ERROR");
        current.setPersistenceError(message);
      } finally {
        savingRef.current = false;
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [enabled, dirty, attemptId, revision, debounceMs]);
}