"use client";

import { ReactNode } from "react";
import { Settings2 } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ConfigPanelProps {
  open: boolean;
  children: ReactNode;
  color?: string;
}

export function ConfigPanel({ open, children, color = "single" }: ConfigPanelProps) {
  return (
    <aside
      className={cn(
        "flex min-h-0 flex-col overflow-hidden border bg-card rounded-lg",
        "transition-[width,opacity] duration-300 ease-in-out",
        open ? "w-full opacity-100 xl:w-80" : "w-0 opacity-0"
      )}
      style={
        {
          "--primary": `var(--question-${color})`,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div className="shrink-0 border-b px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-lg",
              "bg-[color-mix(in_oklab,var(--primary)_12%,transparent)]",
              "text-primary"
            )}
          >
            <Settings2 className="size-4" />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold tracking-tight">
              Question settings
            </h2>

            <p className="truncate text-[11px] text-muted-foreground">
              Configure this question
            </p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-4 p-3 sm:p-4">{children}</div>
      </ScrollArea>
    </aside>
  );
}

