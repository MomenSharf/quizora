"use client";

import { cn } from "@/lib/utils";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { useRuntimePersistence } from "../../store";
import type { RuntimeSaveStatus } from "../../types/runtime-types";

const statusConfig: Record<
  RuntimeSaveStatus,
  {
    label: string;
    description: string;
    dotClassName: string;
    animate?: boolean;
  }
> = {
  IDLE: {
    label: "Not saved",
    description: "Your attempt hasn't been saved yet.",
    dotClassName: "bg-muted-foreground",
  },
  PENDING: {
    label: "Unsaved changes",
    description: "Changes are waiting to be saved.",
    dotClassName: "bg-amber-500",
    animate: true,
  },
  SAVING: {
    label: "Saving",
    description: "Your progress is being saved.",
    dotClassName: "bg-blue-500",
    animate: true,
  },
  SAVED: {
    label: "Saved",
    description: "All changes have been saved successfully.",
    dotClassName: "bg-emerald-500",
  },
  ERROR: {
    label: "Save failed",
    description: "Your latest changes haven't been saved.",
    dotClassName: "bg-destructive",
    animate: true,
  },
};

const statusOrder: RuntimeSaveStatus[] = [
  "SAVED",
  "SAVING",
  "PENDING",
  "ERROR",
  "IDLE",
];

export function RuntimeSaveIndicator() {
  const { saveStatus, dirty, error, lastSavedAt, enabled } =
    useRuntimePersistence();

  const effectiveStatus: RuntimeSaveStatus =
    saveStatus === "SAVING" || saveStatus === "ERROR"
      ? saveStatus
      : dirty
        ? "PENDING"
        : saveStatus;

  const currentStatus = statusConfig[effectiveStatus];

  if (!enabled) return null;

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

      <HoverCardContent align="end" side="bottom" className="w-52 md:w-64 p-3">
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
              <p className="text-sm font-semibold">{currentStatus.label}</p>
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

          {/* Last saved */}
          {lastSavedAt && (
            <>
              <div className="border-t" />

              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">
                  Last saved
                </span>
                <span className="text-xs font-medium">
                  {new Date(lastSavedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
