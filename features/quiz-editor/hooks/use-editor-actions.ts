"use client";

import { useCallback } from "react";
import { useEditorValidation } from "./use-editor-validation";

export function useEditorActionsGuard() {
  const { validate } = useEditorValidation();

  const canPreview = useCallback(async () => {
    return await validate();
  }, [validate]);

  const canPublish = useCallback(async () => {
    return await validate();
  }, [validate]);

  return {
    canPreview,
    canPublish,
  };
}