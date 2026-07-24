"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import {
  IconArrowBarToDown,
  IconArrowBarToUp,
  IconCopy,
  IconDots,
  IconTrash,
} from "@tabler/icons-react";
import { useWatch } from "react-hook-form";

export function ActionsDropdown({
  onCopy,
  onDelete,
  canDelete,
  moveUp,
  moveDown,
  canMoveUp,
  canMoveDown,
}: {
  onCopy?: () => void;
  onDelete?: () => void;
  canDelete?: boolean;
  moveUp: () => void;
  moveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto shrink-0 lg:ml-0 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100"
        >
          <IconDots className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
        {onCopy && (
          <>
            <DropdownMenuItem
              onClick={onCopy}
              className="cursor-pointer rounded-md"
            >
              <IconCopy className="mr-2 size-4" />
              Copy
            </DropdownMenuItem>

            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem
          onClick={moveUp}
          className="cursor-pointer rounded-md"
          disabled={!canMoveUp}
        >
          <IconArrowBarToUp className="mr-2 size-4" />
          Move to top
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={moveDown}
          className="cursor-pointer rounded-md"
          disabled={!canMoveDown}
        >
          <IconArrowBarToDown className="mr-2 size-4" />
          Move to bottom
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {onDelete && (
          <DropdownMenuItem
            onClick={onDelete}
            className="cursor-pointer rounded-md text-destructive focus:bg-destructive/10 focus:text-destructive"
            disabled={!canDelete}
          >
            <IconTrash className="mr-2 size-4 text-destructive" />
            Delete option
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
