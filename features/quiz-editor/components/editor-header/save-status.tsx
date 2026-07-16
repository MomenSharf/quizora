"use client";

import { cn } from "@/lib/utils";
import { useSaveStatus } from "../../hooks/use-save-status";

export function SaveStatus() {
  const { label, isSaving, isSaved, isError, isDisabled, dirty } =
    useSaveStatus();

  return (
    <div className="mt-0.5 flex h-5 items-center gap-2">
      <div
        className={cn(
          "size-2 rounded-full transition-colors",
          isSaved && "bg-emerald-500",
          isSaving && "bg-blue-500 animate-pulse",
          dirty && !isSaving && "bg-amber-500",
          isError && "bg-destructive",
          isDisabled && "bg-muted-foreground/40"
        )}
      />

      <span
        className={cn(
          "text-[11px] font-medium transition-colors",
          isSaved && "text-muted-foreground",
          isSaving && "text-blue-600 dark:text-blue-400",
          dirty &&
            !isSaving &&
            "text-amber-600 dark:text-amber-400",
          isError && "text-destructive",
          isDisabled && "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </div>
  );
}