"use client";

import { useMemo } from "react";

import { useFormState } from "react-hook-form";

import { useQuizForm } from "../providers/quiz-form-provider";
import { useEditorStore } from "../store/editor.store";

export function useSaveStatus() {
  const { control } = useQuizForm();

  const { isDirty, isSubmitting, isLoading } =
    useFormState({
      control,
    });

  const saving = useEditorStore(
    (state) => state.saving,
  );

  const saveError = useEditorStore(
    (state) => state.saveError,
  );

  const lastSavedAt = useEditorStore(
    (state) => state.lastSavedAt,
  );

  const status = useMemo(() => {
    if (isLoading) {
      return "loading";
    }

    if (isSubmitting || saving) {
      return "saving";
    }

    if (saveError) {
      return "error";
    }

    if (isDirty) {
      return "unsaved";
    }

    return "saved";
  }, [
    isLoading,
    isSubmitting,
    saving,
    saveError,
    isDirty,
  ]);

  return {
    status,

    isDirty,

    saving,

    saveError,

    lastSavedAt,

    isSaved:
      status === "saved",

    isSaving:
      status === "saving",

    hasError:
      status === "error",

    hasUnsavedChanges:
      status === "unsaved",
  };
}