"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  async function save() {
    if (!navigator.onLine) {
      setSaveState("error");
      setSaveError("You're offline.");
      return;
    }

    const payload = getValues();
    const editorState = useEditorStore.getState();

    const stateToSave: EditorStore = {
      ...editorState,
      autosave: {
        ...editorState.autosave,
        state: "idle",
        dirty: false,
        error: null,
      },
    };

    const now = new Date();

    setSaveState("saving");
    setLastAttemptAt(now);

    try {
      await saveQuiz(payload, stateToSave);

      setSaveState("saved");
      setLastSavedAt(new Date());
      setDirty(false);
      setSaveError(null);
    } catch (error) {
      console.error("Autosave Engine Failure:", error);

      setSaveState("error");
      setSaveError(
        error instanceof Error ? error.message : "Failed to save quiz."
      );
    }
  }

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);

      if (useEditorStore.getState().autosave.dirty) {
        save();
      }
    };
    

    const handleOffline = () => {
      setIsOnline(false);
      setSaveState("error");
      setSaveError("You're offline.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isAutosaveEnabled) return;

    const subscription = watch(() => {
      if (!isDirty) return;

      setDirty(true);

      if (!isOnline) {
        setSaveState("error");
        setSaveError("You're offline.");
        return;
      }

      setSaveState("pending");

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(save, debounceMs);
    });

    return () => {
      subscription.unsubscribe();

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    watch,
    getValues,
    isDirty,
    isAutosaveEnabled,
    debounceMs,
    isOnline,
    setSaveState,
    setLastSavedAt,
    setLastAttemptAt,
    setDirty,
    setSaveError,
  ]);
}