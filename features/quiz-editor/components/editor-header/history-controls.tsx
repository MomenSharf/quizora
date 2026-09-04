"use client";

import { Redo2, Undo2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useHistorySync } from "../../hooks/use-history-sync";
import { useEditorStore } from "../../store";

export function HistoryControls() {
  const canUndo = useEditorStore((state) => state.history.canUndo);
  const canRedo = useEditorStore((state) => state.history.canRedo);

  const { undo, redo } = useHistorySync();

  return (
    <div className="flex h-7 items-center rounded-md border bg-background md:h-9">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={!canUndo}
            onClick={undo}
            className="size-6 rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-35 md:size-8"
            aria-label="Undo"
          >
            <Undo2 className="size-3.5 md:size-4" />
          </Button>
        </TooltipTrigger>

        <TooltipContent side="bottom" className="flex items-center gap-2">
          <span>Undo</span>
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
            Ctrl Z
          </kbd>
        </TooltipContent>
      </Tooltip>

      <div className="h-3.5 w-px bg-border md:h-4" />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={!canRedo}
            onClick={redo}
            className="size-6 rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-35 md:size-8"
            aria-label="Redo"
          >
            <Redo2 className="size-3.5 md:size-4" />
          </Button>
        </TooltipTrigger>

        <TooltipContent side="bottom" className="flex items-center gap-2">
          <span>Redo</span>
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
            Ctrl Shift Z
          </kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
