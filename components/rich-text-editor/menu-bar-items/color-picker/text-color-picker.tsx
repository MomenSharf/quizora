"use client";

import type { Editor } from "@tiptap/react";

import ColorPicker from "./color-picker";
import { textColorConfig } from "./color-picker-config";

type Props = {
  editor: Editor;
};

export default function TextColorPicker({
  editor,
}: Props) {
  return (
    <ColorPicker
      editor={editor}
      config={textColorConfig}
    />
  );
}