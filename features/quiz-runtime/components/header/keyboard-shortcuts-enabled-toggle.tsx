"use client";

import { KeyboardIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

type KeyboardShortcutsEnabledToggleProps = {
  keyboardShortcutsEnabled: boolean;
  onToggle: () => void;
};

export function KeyboardShortcutsEnabledToggle({
  keyboardShortcutsEnabled,
  onToggle,
}: KeyboardShortcutsEnabledToggleProps) {
  const shortcuts = [
    { label: "Submit answer / Continue", keys: ["Enter"] },
    { label: "Previous question", keys: ["←"] },
    { label: "Next question", keys: ["→"] },
    { label: "Finish quiz", keys: ["Ctrl", "Enter"] },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Keyboard shortcuts"
          aria-pressed={keyboardShortcutsEnabled}
          className={cn(
            "size-8 rounded-lg text-muted-foreground",
            keyboardShortcutsEnabled &&
              "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
          )}
        >
          <KeyboardIcon className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="w-72 rounded-xl p-0"
      >
        <div className="space-y-3 p-3.5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-semibold">Keyboard shortcuts</p>
              <p className="text-xs text-muted-foreground">
                Navigate your quiz faster
              </p>
            </div>

            <span
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-medium",
                keyboardShortcutsEnabled
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  keyboardShortcutsEnabled
                    ? "bg-emerald-500"
                    : "bg-muted-foreground/50",
                )}
              />
              {keyboardShortcutsEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>

          {/* Shortcuts */}
          <div className="space-y-1">
            {shortcuts.map(({ label, keys }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/60"
              >
                <span className="text-xs text-muted-foreground">
                  {label}
                </span>

                <div className="flex shrink-0 items-center gap-1">
                  {keys.map((key) => (
                    <kbd
                      key={key}
                      className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-border bg-muted px-1.5 text-[10px] font-semibold text-foreground shadow-sm"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="text-xs text-muted-foreground">
              Keyboard navigation
            </span>

            <Button
              type="button"
              variant={keyboardShortcutsEnabled ? "outline" : "default"}
              size="sm"
              className="h-7 rounded-lg px-2.5 text-xs"
              onClick={onToggle}
            >
              {keyboardShortcutsEnabled ? "Turn off" : "Turn on"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}