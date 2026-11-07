"use client";

import { cn } from "@/lib/utils";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { useSaveStatus } from "../../hooks/use-save-status";

const statusConfig = {
  IDLE: {
    label: "Not saved",
    description: "No changes to save.",
    dotClassName: "bg-muted-foreground",
    animate:false,
  },
  PENDING: {
    label: "Unsaved changes",
    description: "Changes are waiting to be saved.",
    dotClassName: "bg-amber-500",
    animate: true,
  },
  SAVING: {
    label: "Saving",
    description: "Your changes are being saved automatically.",
    dotClassName: "bg-blue-500",
    animate: true,
  },
  SAVED: {
    label: "Saved",
    description: "All changes have been saved successfully.",
    dotClassName: "bg-emerald-500",
    animate:false,

  },
  ERROR: {
    label: "Save failed",
    description: "Your latest changes haven't been saved.",
    dotClassName: "bg-destructive",
    animate: true,
  },
  DISABLED: {
    label: "Autosave disabled",
    description: "Changes won't be saved automatically.",
    dotClassName: "bg-muted-foreground/50",
    animate:false,

  },
} as const;

type SaveStatus = keyof typeof statusConfig;

const statusOrder: SaveStatus[] = [
  "SAVED",
  "SAVING",
  "PENDING",
  "ERROR",
  "IDLE",
  "DISABLED",
];

export function SaveStatus() {
  const {
    isSaving,
    isSaved,
    isError,
    isDisabled,
    dirty,
    error,
  } = useSaveStatus();

  const effectiveStatus: SaveStatus = isDisabled
    ? "DISABLED"
    : isError
      ? "ERROR"
      : isSaving
        ? "SAVING"
        : dirty
          ? "PENDING"
          : isSaved
            ? "SAVED"
            : "IDLE";

  const currentStatus = statusConfig[effectiveStatus];

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          aria-label={`Save status: ${currentStatus.label}`}
          className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="relative flex size-2.5">
            {currentStatus.animate && (
              <span
                className={cn(
                  "absolute inline-flex size-full animate-ping rounded-full opacity-40",
                  currentStatus.dotClassName,
                )}
              />
            )}

            <span
              className={cn(
                "relative size-2.5 rounded-full",
                currentStatus.dotClassName,
              )}
            />
          </span>
        </button>
      </HoverCardTrigger>

      <HoverCardContent
        align="end"
        side="bottom"
        className="w-64 p-3"
      >
        <div className="space-y-3">
          {/* Current status */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "size-2 rounded-full",
                  currentStatus.dotClassName,
                  currentStatus.animate && "animate-pulse",
                )}
              />

              <p className="text-sm font-semibold">
                {currentStatus.label}
              </p>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              {error ?? currentStatus.description}
            </p>
          </div>

          <div className="border-t" />

          {/* Status legend */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Status guide
            </p>

            {statusOrder.map((status) => {
              const config = statusConfig[status];
              const isActive = status === effectiveStatus;

              return (
                <div
                  key={status}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
                    isActive && "bg-muted",
                  )}
                >
                  <span
                    className={cn(
                      "size-2 shrink-0 rounded-full",
                      config.dotClassName,
                    )}
                  />

                  <span
                    className={cn(
                      "flex-1 text-xs",
                      isActive
                        ? "font-medium text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {config.label}
                  </span>

                  {isActive && (
                    <span className="text-[10px] font-medium text-muted-foreground">
                      Current
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}