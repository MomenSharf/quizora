"use client";

import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useEditorActions, useEditorStore } from "../../store";
import { useEditorValidation } from "../../hooks/use-editor-validation";

export function IssuesTrigger() {
  const { setActivePanel } = useEditorActions();

 const {  errorCount, attempted } = useEditorValidation();

  if (!attempted) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => setActivePanel("issues")}
      className="gap-2"
    >
      <AlertCircle
        className={
          errorCount > 0
            ? "size-4 text-destructive"
            : "size-4 text-emerald-500"
        }
      />

      <span className="hidden sm:inline">
        {errorCount > 0
          ? `${errorCount} ${
              errorCount === 1 ? "issue" : "issues"
            }`
          : "No issues"}
      </span>

      {errorCount > 0 && (
        <span className="sm:hidden">{errorCount}</span>
      )}
    </Button>
  );
}