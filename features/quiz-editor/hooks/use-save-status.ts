import { useMemo } from "react";
import { useEditorStore } from "../store";


export const useSaveStatus = () => {
  const state = useEditorStore((s) => s.autosave.state);
  const dirty = useEditorStore((s) => s.autosave.dirty);
  const enabled = useEditorStore((s) => s.autosave.enabled);
  const error = useEditorStore((s) => s.autosave.error);
  const lastSavedAt = useEditorStore((s) => s.autosave.lastSavedAt);
  const lastAttemptAt = useEditorStore((s) => s.autosave.lastAttemptAt);

  return useMemo(() => {
    const isIdle = state === "idle";
    const isSaving = state === "saving";
    const isSaved = state === "saved";
    const isError = state === "error";
    const isDisabled = !enabled;

    let label = "Ready";

    if (isDisabled) {
      label = "Autosave disabled";
    } else if (isSaving) {
      label = "Saving...";
    } else if (isSaved) {
      label = "Saved";
    } else if (isError) {
      label = error ?? "Failed to save";
    } else if (dirty) {
      label = "Unsaved changes";
    }

    return {
      state,

      label,

      dirty,
      enabled,

      error,

      lastSavedAt,
      lastAttemptAt,

      isIdle,
      isSaving,
      isSaved,
      isError,
      isDisabled,
    };
  }, [
    state,
    dirty,
    enabled,
    error,
    lastSavedAt,
    lastAttemptAt,
  ]);
};