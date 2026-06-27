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

export default function FontSizeSelect({
  editor,
}: {
  editor: Editor;
}) {
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
      <SelectTrigger className="w-18 text-xs">

        <SelectValue/>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="default" className="text-xs">Default</SelectItem>

        {FONT_SIZES.map((size) => (
          <SelectItem key={size} value={size} className="text-xs">
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}