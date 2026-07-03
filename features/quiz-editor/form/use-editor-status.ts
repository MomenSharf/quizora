"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import type { QuizEditorForm } from "../store";

import { useQuizEditorStore } from "../store";

export function useEditorStatus() {
  const {
    formState: {
      isDirty,
      isSubmitting,
      isValid,
      errors,
    },
  } = useFormContext<QuizEditorForm>();

  const setSaveState = useQuizEditorStore(
    (state) => state.setSaveState,
  );

  useEffect(() => {
    if (isSubmitting) {
      setSaveState("saving");
      return;
    }

    if (!isDirty) {
      setSaveState("saved");
      return;
    }

    setSaveState("idle");
  }, [
    isDirty,
    isSubmitting,
    setSaveState,
  ]);

  return {
    isDirty,

    isSubmitting,

    isValid,

    errors,

    hasErrors: Object.keys(errors).length > 0,
  };
}