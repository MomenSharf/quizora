"use client";

import { useTransition } from "react";
import { useFormContext } from "react-hook-form";

import type { Quiz } from "@/features/quiz-editor/validation/quiz";

import { saveQuiz } from "../server/save-quiz";
import { useQuizEditorStore } from "../store";

export function useSaveQuiz() {
  const form = useFormContext<Quiz>();

  const [isPending, startTransition] = useTransition();

  const setSaveState = useQuizEditorStore(
    (state) => state.setSaveState,
  );

  const setLastSavedAt = useQuizEditorStore(
    (state) => state.setLastSavedAt,
  );

  const save = () =>
    new Promise<boolean>((resolve) => {
      startTransition(async () => {
        const valid = await form.trigger();

        if (!valid) {
          resolve(false);
          return;
        }

        try {
          setSaveState("saving");

          const values = form.getValues();

          await saveQuiz(values);

          form.reset(values);

          setLastSavedAt(new Date());

          setSaveState("saved");

          resolve(true);
        } catch {
          setSaveState("error");

          resolve(false);
        }
      });
    });

  return {
    save,
    isSaving: isPending,
  };
}