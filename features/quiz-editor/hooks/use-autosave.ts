"use client";

import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useEditorActions, useAutosaveEnabled } from "../store";
import type { QuizEditor } from "../validation/quiz";

export function useAutosaveHook(debounceMs: number = 1500) {
  const { watch, getValues, formState: { isDirty } } = useFormContext<QuizEditor>();
  const { setSaveState, setLastSavedAt, setLastAttemptAt, setDirty } = useEditorActions();
  const isAutosaveEnabled = useAutosaveEnabled();
  
  // Track continuous save session pointers to prevent execution overlaps
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAutosaveEnabled) return;

    // Core continuous subscription loop across deep schema nested trees
    const subscription = watch((value, { name, type }) => {
      // If form hasn't been modified by user interaction, bypass network schedules
      if (!isDirty) return;

      setDirty(true);
      setSaveState("pending");

      // Clear any pending debounced timers
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Schedule next debounced block
      timeoutRef.current = setTimeout(async () => {
        const payload = getValues();
        const now = new Date();

        setSaveState("saving");
        setLastAttemptAt(now);

        try {
          const response = await fetch(`/api/quizzes/${payload.id}/save`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!response.ok) throw new Error("Autosave target discarded network buffer payload");

          setSaveState("saved");
          setLastSavedAt(new Date());
          setDirty(false);
        } catch (error) {
          console.error("Autosave Engine Failure:", error);
          setSaveState("error");
        }
      }, debounceMs);
    });

    // Clean up active subscriptions and clear structural save intervals
    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [watch, getValues, isDirty, isAutosaveEnabled, debounceMs, setSaveState, setLastSavedAt, setLastAttemptAt, setDirty]);
}