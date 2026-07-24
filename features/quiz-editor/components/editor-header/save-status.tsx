"use client";

import { cn } from "@/lib/utils";
import { useSaveStatus } from "../../hooks/use-save-status";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SaveStatus() {
  const {
    label,
    isIdle,
    isSaving,
    isSaved,
    isError,
    isDisabled,
    dirty,
    error,
  } = useSaveStatus();

  const tooltip = isSaving
    ? "Your changes are being saved automatically."
    : isSaved
      ? "All changes have been saved."
      : dirty
        ? "You have unsaved changes."
        : isError
          ? error || "Failed to save your changes."
          : isIdle
            ? "No changes to save."
            : "Autosave is disabled.";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex h-5 cursor-default items-center gap-1 md:gap-2">
          <div
            className={cn(
              "size-1.5 rounded-full transition-colors md:size-2",
              isIdle && "bg-muted-foreground/50",
              isSaved && "bg-emerald-500",
              isSaving && "animate-pulse bg-blue-500",
              dirty && !isSaving && "bg-amber-500",
              isError && "bg-destructive",
              isDisabled && "bg-muted-foreground/30",
            )}
          />

          <span
            className={cn(
              "text-[8px] min-[500px]:text-[11px] max-[500px]:w-15  font-medium transition-colors md:inline truncate w-fit",
              isIdle && "text-muted-foreground",
              isSaved && "text-muted-foreground",
              isSaving && "text-blue-600 dark:text-blue-400",
              dirty && !isSaving && "text-amber-600 dark:text-amber-400",
              isError && "text-destructive",
              isDisabled && "text-muted-foreground",
            )}
          >
            {label}
          </span>
        </div>
      </TooltipTrigger>

      <TooltipContent side="bottom" align="center">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
