"use client";

import { Button } from "@/components/ui/button";
import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";
import { IconCheck, IconCornerDownLeft, IconTrash } from "@tabler/icons-react";
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
  className="group inline-flex items-center gap-1 rounded-full border border-transparent px-1.5 py-1.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-offset-1"
  style={{
    borderColor: `${color}30`,
    backgroundColor: `${color}0A`,
    ["--tw-ring-color" as string]: color,
  }}
>
  <input
    ref={inputRef}
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Blank..."
    className="w-24 bg-transparent px-2.5 text-sm font-medium text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/60 focus:w-44"
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

  {/* Subtle vertical divider */}
  <div className="mx-0.5 h-4 w-px bg-foreground/10" />

  {/* Save Button with Enter Arrow */}
  <Button
    size="icon-sm"
    aria-label="Save answer (Enter)"
    className="size-7 rounded-full border-0 text-white shadow-sm transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
    style={{
      backgroundColor: color,
    }}
    onClick={() => onSave(text.trim())}
  >
    <IconCornerDownLeft className="size-3.5" stroke={2.5} />
  </Button>

  <Button
    size="icon-sm"
    variant="ghost"
    aria-label="Delete answer"
    className="size-7 rounded-full text-muted-foreground transition-all duration-200 hover:scale-105 hover:bg-destructive/15 hover:text-destructive active:scale-95"
    onClick={onDelete}
  >
    <IconTrash className="size-3.5" stroke={2} />
  </Button>
</span>
  );
}