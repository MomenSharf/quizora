"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  IconArrowBarToDown,
  IconArrowBarToUp,
  IconCheck,
  IconCheckbox,
  IconCopy,
  IconDots,
  IconRotateClockwise,
  IconTrash
} from "@tabler/icons-react";

export function ActionsDropdown({
  trigger,
  onDuplicate,
  onDelete,
  canDelete,
  onSelect,
  onReset,
  // TODO: Solve canReset issue when user add new item it's not dirty
  canReset,
  moveUp,
  moveDown,
  canMoveUp,
  canMoveDown,
}: {
  trigger?: React.ReactNode;
  onDuplicate?: () => void;
  onDelete?: () => void;
  canDelete?: boolean;
  onReset?: () => void;
  canReset?: boolean;
  onSelect?: () => void;
  moveUp: () => void;
  moveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ?? (
          <Button
            size="icon-sm"
            variant="ghost"
            className="rounded-lg text-muted-foreground hover:text-foreground"
          >
            <IconDots className="size-5" />
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 rounded-xl p-2" onClick={(e) => e.stopPropagation()}>
        {onSelect && (
          <DropdownMenuItem
            onClick={onSelect}
            className="cursor-pointer rounded-md"
          >
            <IconCheckbox className="mr-2 size-4" />
            Select
          </DropdownMenuItem>
        )}

        {onDuplicate && (
          <DropdownMenuItem
            onClick={onDuplicate}
            className="cursor-pointer rounded-md"
          >
            <IconCopy className="mr-2 size-4" />
            Duplicate
          </DropdownMenuItem>
        )}

        {(onSelect || onDuplicate) && <DropdownMenuSeparator />}

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

        {onReset && (
          <>
            <DropdownMenuItem
              onClick={onReset}
              disabled={!canReset}
              className="cursor-pointer rounded-md"
            >
              <IconRotateClockwise className="mr-2 size-4" />
              Reset
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {onDelete && (
          <DropdownMenuItem
            onClick={onDelete}
            className="cursor-pointer rounded-md text-destructive focus:bg-destructive/10 focus:text-destructive"
            disabled={!canDelete}
          >
            <IconTrash className="mr-2 size-4 text-destructive" />
            Delete question
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
