"use client";

import { Editor } from "@tiptap/react";
import { IconForms } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InsertBlankProps {
  editor: Editor;
}

export function InsertBlank({ editor }: InsertBlankProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 gap-2"
            onClick={() => editor.chain().focus().insertBlank().run()}
            disabled={!editor.can().chain().focus().insertBlank().run()}
          >
            <IconForms className="size-4" />
            <span>Blank</span>
          </Button>
        </TooltipTrigger>

        <TooltipContent className="flex items-center gap-3">
          Insert Blank
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
