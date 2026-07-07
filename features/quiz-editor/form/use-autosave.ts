"use client";

import { useEffect, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";

import type { Quiz } from "@/features/quiz-editor/validation/quiz";

import { saveQuiz } from "../server/save-quiz";
import { useQuizEditorStore } from "../store";

type Options = {
  delay?: number;
};

export function useAutosave(form: UseFormReturn<Quiz>, options: Options = {}) {
  const delay = options.delay ?? 1000;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const values = form.watch();

  const isDirty = form.formState.isDirty;

  const setSaveState = useQuizEditorStore((state) => state.setSaveState);

  const setLastSavedAt = useQuizEditorStore((state) => state.setLastSavedAt);

  const autosaveEnabled = useQuizEditorStore(
    (state) => state.editor.autosaveEnabled,
  );

  useEffect(() => {
    if (!autosaveEnabled) {
      return;
    }

    if (!isDirty) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const valid = await form.trigger();

      if (!valid) {
        return;
      }

      try {
        setSaveState("saving");

        await saveQuiz(values);

        form.reset(values);

        setLastSavedAt(new Date());

        setSaveState("saved");
      } catch {
        setSaveState("error");
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    values,
    isDirty,
    delay,
    autosaveEnabled,
    form,
    setLastSavedAt,
    setSaveState,
  ]);
}
