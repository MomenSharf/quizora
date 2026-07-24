"use client";

import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Content, EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

import { cn } from "@/lib/utils";
import MenuBar from "./menu-bar";
import { Blank } from "./extensions/blank/blank";

interface RichTextEditorProps {
  content: Content ;
  onChange?: (html: string) => void;
  onJsonChange?: (json: JSONContent) => void;
  placeholder?: string;
  className?: string;
  fontSize?: string;
  menuBarClassName?: string;
  allowInsertBlank?: boolean;
}

export default function RichTextEditor({
  content,
  onChange,
  onJsonChange,
  placeholder = "Start typing...",
  className,
  fontSize = "16px",
  menuBarClassName,
  allowInsertBlank = false,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,

    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-6",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-6",
          },
        },
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Highlight,

      Placeholder.configure({
        placeholder,
      }),

      Superscript,
      Subscript,

      TextStyleKit,
      ...(allowInsertBlank ? [Blank] : []),
    ],

    content,

    editorProps: {
      attributes: {
        class: cn(
          "w-full min-w-0 rounded-md border border-input bg-transparent px-2 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          className,
        ),
        style: `font-size: ${fontSize};`,
      },
    },

    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
      onJsonChange?.(editor.getJSON());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== content) {
      editor.commands.setContent(content, {
        emitUpdate: false,
      });
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="relative group space-y-1">
      <MenuBar
        editor={editor}
        defaultFontSize={fontSize}
        className={menuBarClassName}
        allowInsertBlank={allowInsertBlank}
      />
      <EditorContent editor={editor} />
    </div>
  );
}
