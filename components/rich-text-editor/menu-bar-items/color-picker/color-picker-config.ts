import type { Editor } from "@tiptap/react";
import { Highlighter, Palette } from "lucide-react";

export type ColorPickerConfig = {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  getValue: (editor: Editor) => string | null;
  setValue: (editor: Editor, color: string) => void;
  reset: (editor: Editor) => void;
};

export const textColorConfig: ColorPickerConfig = {
  label: "Text color",
  Icon: Palette,

  getValue: (editor) =>
    editor.getAttributes("textStyle").color ?? null,

  setValue: (editor, color) => {
    editor.chain().focus().setColor(color).run();
  },

  reset: (editor) => {
    editor.chain().focus().unsetColor().run();
  },
};

export const highlightConfig: ColorPickerConfig = {
  label: "Highlight",
  Icon: Highlighter,

  getValue: (editor) =>
    editor.getAttributes("highlight").color ?? null,

  setValue: (editor, color) => {
    editor.chain().focus().toggleHighlight({ color }).run();
  },

  reset: (editor) => {
    editor.chain().focus().unsetHighlight().run();
  },
};