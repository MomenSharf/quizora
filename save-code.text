"use client";

import { useEffect, useRef } from "react";
import { saveQuiz } from "../actions/save-quiz";
import {
  EditorStore,
  useAutosaveEnabled,
  useEditorActions,
  useEditorStore,
} from "../store";
import { useQuizForm } from "./use-quiz-form";

export function useAutosaveHook(debounceMs: number = 3000) {
  const {
    watch,
    getValues,
    formState: { isDirty },
  } = useQuizForm();

  const {
    setSaveState,
    setLastSavedAt,
    setLastAttemptAt,
    setDirty,
    setSaveError,
  } = useEditorActions();
  const isAutosaveEnabled = useAutosaveEnabled();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAutosaveEnabled) return;

    const subscription = watch(() => {
      if (!isDirty) return;

      setDirty(true);
      setSaveState("pending");

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        const payload = getValues();
        const editorState = useEditorStore.getState();
        const now = new Date();
        const stateToSave: EditorStore = {
          ...editorState,
          autosave: {
            ...editorState.autosave,
            state: "idle",
            dirty: false,
            error: null,
          },
        };

        setSaveState("saving");
        setLastAttemptAt(now);

        try {
          await saveQuiz(payload, stateToSave);

          setSaveState("saved");
          setLastSavedAt(new Date());
          setDirty(false);
        } catch (error) {
          console.error("Autosave Engine Failure:", error);

          const message =
            error instanceof Error ? error.message : "Failed to save quiz.";

          setSaveState("error");
          setSaveError(message);
        }
      }, debounceMs);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    watch,
    getValues,
    isDirty,
    isAutosaveEnabled,
    debounceMs,
    setSaveState,
    setLastSavedAt,
    setLastAttemptAt,
    setDirty,
    setSaveError,
  ]);
}
