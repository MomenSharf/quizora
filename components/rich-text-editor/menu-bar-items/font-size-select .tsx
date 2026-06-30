"use client";

import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FONT_SIZES = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
  "48px",
  "64px",
];

export default function FontSizeDialog({
  editor,
}: {
  editor: Editor;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("16px");

  useEffect(() => {
    const update = () => {
      setValue(editor.getAttributes("textStyle").fontSize || "16px");
    };

    update();

    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  const apply = () => {
    const size = value.trim();

    if (!size) {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor
        .chain()
        .focus()
        .setFontSize(/^\d+$/.test(size) ? `${size}px` : size)
        .run();
    }

    setOpen(false);
  };

  const reset = () => {
    editor.chain().focus().unsetFontSize().run();
    setValue("16px");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs">
              {value}
            </Button>
          </DialogTrigger>
        </TooltipTrigger>

        <TooltipContent>Font Size</TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle>Font Size</DialogTitle>
        </DialogHeader>

        <Input
          value={value}
          placeholder="16px"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              apply();
            }
          }}
        />

        <div className="grid grid-cols-4 gap-2">
          {FONT_SIZES.map((size) => (
            <Button
              key={size}
              variant={size === value ? "default" : "outline"}
              size="sm"
              onClick={() => setValue(size)}
            >
              {size}
            </Button>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={reset}>
            Default
          </Button>

          <Button onClick={apply}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}