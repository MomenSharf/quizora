"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";
import { IconPencilBolt } from "@tabler/icons-react";

interface BlankViewProps {
  placeholder: string;
  onEdit: () => void;
}

export function BlankView({ placeholder, onEdit }: BlankViewProps) {
   const color = QUESTION_TYPE_COLORS["FILL_BLANK"];

  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            onClick={onEdit}
            className="group h-9 rounded-md border px-2.5 shadow-xs transition-all duration-200 hover:-translate-y-px hover:shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              color,
              borderColor: `${color}2E`,
              backgroundColor: `${color}10`,
              ["--tw-ring-color" as string]: `${color}55`,
            }}
          >
            <span className="max-w-44 truncate text-sm font-medium">
              {placeholder}
            </span>

            <span
              className="ml-2 flex size-5 shrink-0 items-center justify-center rounded border transition-all duration-200 group-hover:-rotate-6 group-hover:scale-105"
              style={{
                backgroundColor: `${color}14`,
                borderColor: `${color}20`,
              }}
            >
              <IconPencilBolt
                className="size-3 opacity-60 transition-all duration-200 group-hover:opacity-100"
                stroke={2.1}
              />
            </span>
          </Button>
        </TooltipTrigger>

        <TooltipContent side="top" className="text-xs">
          Edit blank
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}