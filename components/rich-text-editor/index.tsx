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
  content: Content;
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
  // TODO: Fix Heading sizes and add P paragraph
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
          "w-full min-w-0 rounded-xl border border-border/70 bg-background/70 px-3 py-2.5 text-sm text-foreground backdrop-blur-sm shadow-sm transition-all duration-200 placeholder:text-muted-foreground/70 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary/30 hover:bg-background focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:shadow-[0_0_0_1px_var(--primary)] aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/10 dark:bg-background/40 dark:hover:border-primary/40 dark:focus-visible:ring-primary/15",
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
