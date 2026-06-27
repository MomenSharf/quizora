import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconArrowBackUp, IconArrowForwardUp } from "@tabler/icons-react";
import type { Editor } from "@tiptap/react";

const UndoRedo = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex gap-0.5">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={!editor.can().chain().focus().undo().run()}
            onClick={editor.chain().focus().undo().run}
          >
            <IconArrowBackUp />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Undo</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={!editor.can().chain().focus().redo().run()}
            onClick={editor.chain().focus().redo().run}
          >
            <IconArrowForwardUp />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Redo</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default UndoRedo;
