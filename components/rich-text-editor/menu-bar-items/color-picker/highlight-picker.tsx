"use client";

import type { Editor } from "@tiptap/react";

import ColorPicker from "./color-picker";
import { highlightConfig } from "./color-picker-config";

type Props = {
  editor: Editor;
};

export default function HighlightPicker({
  editor,
}: Props) {
  return (
    <ColorPicker
      editor={editor}
      config={highlightConfig}
    />
  );
}