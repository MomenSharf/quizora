"use client";

import {
  IconAlertCircle,
  IconPlayerPlay,
  IconSettings2,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

import { useEditorActions, useEditorStore } from "../../store";
import { useEditorValidation } from "../../hooks/use-editor-validation";

export function EditorActions() {
  const { setActivePanel } = useEditorActions();

  const { validate } = useEditorValidation();

  const attempted = useEditorStore(
    (state) => state.validation.attempted,
  );

  const errorCount = useEditorStore(
    (state) => state.validation.errorCount,
  );

  const onSettings = () => {
    setActivePanel("settings");
  };

  const onIssues = () => {
    setActivePanel("issues");
  };

  const onPreview = async () => {
    const valid = await validate();

    if (!valid) {
      setActivePanel("issues");
      return;
    }

    // Your existing preview navigation here.
  };

  return (
    <div className="flex items-center gap-2">
      {/* Issues — Desktop */}
      {attempted && (
        <Button
          variant="outline"
          onClick={onIssues}
          className="hidden h-10 items-center gap-2 rounded-xl border-border/70 bg-background/60 px-3 font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-background hover:shadow-md active:translate-y-0 active:scale-[0.98] md:flex"
        >
          <IconAlertCircle
            className={
              errorCount > 0
                ? "size-4 text-destructive"
                : "size-4 text-emerald-500"
            }
          />

          <span>
            {errorCount > 0
              ? `${errorCount} ${
                  errorCount === 1 ? "issue" : "issues"
                }`
              : "No issues"}
          </span>
        </Button>
      )}

      {/* Issues — Mobile */}
      {attempted && (
        <Button
          variant="outline"
          size="icon"
          onClick={onIssues}
          aria-label="Validation issues"
          className="size-8 rounded-xl border-border/70 bg-background/60 shadow-sm min-[400px]:size-10 md:hidden"
        >
          <IconAlertCircle
            className={
              errorCount > 0
                ? "size-4 text-destructive min-[400px]:size-5"
                : "size-4 text-emerald-500 min-[400px]:size-5"
            }
          />
        </Button>
      )}

      {/* Settings — Desktop */}
      <Button
        variant="outline"
        onClick={onSettings}
        className="group relative hidden h-10 overflow-hidden rounded-xl border-border/70 bg-background/60 px-3.5 font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-background hover:shadow-md active:translate-y-0 active:scale-[0.98] md:flex"
      >
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-primary/5 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

        <span className="relative flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-lg bg-muted transition-colors duration-300 group-hover:bg-primary/10">
            <IconSettings2 className="size-4 transition-transform duration-500 group-hover:rotate-90" />
          </span>

          <span>Settings</span>
        </span>
      </Button>

      {/* Settings — Mobile */}
      <Button
        variant="outline"
        size="icon"
        onClick={onSettings}
        aria-label="Settings"
        className="group size-8 rounded-xl border-border/70 bg-background/60 shadow-sm transition-all duration-200 hover:border-primary/30 hover:bg-background hover:shadow-md min-[400px]:size-10 md:hidden"
      >
        <IconSettings2 className="size-4 transition-transform duration-500 group-hover:rotate-90 min-[400px]:size-5" />
      </Button>

      {/* Preview — Desktop */}
      <Button
        onClick={onPreview}
        className="group relative hidden h-10 overflow-hidden rounded-xl border border-primary/20 bg-linear-to-r from-primary to-primary/90 px-4 font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] md:flex"
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

        <span className="relative flex items-center gap-3">
          <span className="flex size-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:rotate-120">
            <IconPlayerPlay className="size-4" />
          </span>

          <span>Preview</span>
        </span>
      </Button>

      {/* Preview — Mobile */}
      <Button
        size="icon"
        onClick={onPreview}
        aria-label="Preview"
        className="group relative size-8 overflow-hidden rounded-xl border border-primary/20 bg-linear-to-r from-primary to-primary/90 text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] min-[400px]:size-10 md:hidden"
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

        <IconPlayerPlay className="relative size-4 transition-transform duration-200 group-hover:scale-110 min-[400px]:size-5" />
      </Button>
    </div>
  );
}