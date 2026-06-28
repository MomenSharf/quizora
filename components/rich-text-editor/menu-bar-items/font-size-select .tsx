"use client";

import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function FontSizeSelect({ editor }: { editor: Editor }) {
  const [value, setValue] = useState("16px");

  useEffect(() => {
    if (!editor) return;

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

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        setValue(value);

        if (value === "default") {
          editor.chain().focus().unsetFontSize().run();
          return;
        }

        editor.chain().focus().setFontSize(value).run();
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <SelectTrigger className="w-18 text-xs">
              <SelectValue />
            </SelectTrigger>
          </div>
        </TooltipTrigger>
        <TooltipContent>Font Size</TooltipContent>
      </Tooltip>

      <SelectContent className="min-w-0 w-18 p-1">
        <SelectItem value="default" className="text-xs">
          Default
        </SelectItem>

        {FONT_SIZES.map((size) => (
          <SelectItem key={size} value={size} className="text-xs">
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
