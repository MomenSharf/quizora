"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";
import {
  IconPencilBolt,
  IconTrash,
} from "@tabler/icons-react";

interface BlankViewProps {
  placeholder: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function BlankView({
  placeholder,
  onEdit,
  onDelete,
}: BlankViewProps) {
  const color = QUESTION_TYPE_COLORS["FILL_BLANK"];

  return (
    <TooltipProvider delayDuration={250}>
      <div className="mx-1 inline-flex h-9 items-center overflow-hidden rounded-md border shadow-xs">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              onClick={onEdit}
              className="group h-full min-w-0 rounded-none border-0 px-2.5 text-sm font-medium hover:bg-transparent focus-visible:ring-0"
              style={{
                color,
              }}
            >
              <span className="max-w-44 truncate">
                {placeholder}
              </span>

              <span
                className="ml-2 flex size-5 shrink-0 items-center justify-center rounded border"
                style={{
                  backgroundColor: `${color}14`,
                  borderColor: `${color}20`,
                }}
              >
                <IconPencilBolt
                  className="size-3 opacity-65 group-hover:opacity-100"
                  stroke={2.1}
                />
              </span>
            </Button>
          </TooltipTrigger>

          <TooltipContent side="top" className="text-xs">
            Edit blank
          </TooltipContent>
        </Tooltip>

        <div className="h-5 w-px bg-border" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onDelete}
              aria-label="Delete blank"
              className="size-8 rounded-none text-muted-foreground hover:bg-destructive/10 hover:text-destructive focus-visible:ring-0"
            >
              <IconTrash className="size-3.5" stroke={2} />
            </Button>
          </TooltipTrigger>

          <TooltipContent side="top" className="text-xs">
            Delete blank
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}