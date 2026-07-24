"use client";

import { Button } from "@/components/ui/button";
import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";
import { IconCheck, IconTrash } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

interface BlankEditViewProps {
  value: string;
  onSave: (value: string) => void;
  onDelete: () => void;
}

export function BlankEditView({
  value,
  onSave,
  onDelete,
}: BlankEditViewProps) {
  const [text, setText] = useState(value);

  const wrapperRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const color = QUESTION_TYPE_COLORS["FILL_BLANK"];

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        if (text.trim().length === 0) {
          onDelete();
        } else {
          onSave(text.trim());
        }
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [text, onDelete, onSave]);

  return (
    <span
      ref={wrapperRef}
      className="inline-flex items-center gap-1 rounded-md border p-1 shadow-xs transition-all focus-within:shadow-sm"
      style={{
        borderColor: `${color}30`,
        backgroundColor: `${color}10`,
        ["--tw-ring-color" as string]: `${color}55`,
      }}
    >
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Blank..."
        className="min-w-20 max-w-44 bg-transparent px-2 text-sm font-medium outline-none placeholder:text-muted-foreground"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSave(text.trim());
          }

          if (e.key === "Escape") {
            e.preventDefault();
            onDelete();
          }
        }}
      />

      <Button
        size="icon-sm"
        variant="ghost"
        className="size-7 rounded transition-transform hover:scale-105"
        onClick={() => onSave(text.trim())}
      >
        <IconCheck className="size-3.5" stroke={2.3} />
      </Button>

      <Button
        size="icon-sm"
        variant="ghost"
        className="size-7 rounded text-destructive transition-transform hover:scale-105 hover:bg-destructive/10"
        onClick={onDelete}
      >
        <IconTrash className="size-3.5" stroke={2.2} />
      </Button>
    </span>
  );
}