"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { QUESTION_TYPE_COLORS } from "@/features/quiz-editor/constants/question-types";
import {
  IconCheck,
  IconTrash,
} from "@tabler/icons-react";

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

  const handleSave = () => {
    const trimmed = text.trim();

    if (!trimmed) {
      onDelete();
      return;
    }

    onSave(trimmed);
  };

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleSave();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [text]);

  return (
    <span
      ref={wrapperRef}
      className="group relative inline-flex h-10 items-center rounded-lg border bg-background shadow-sm transition-[box-shadow,border-color] duration-200 focus-within:shadow-md"
      style={{
        borderColor: `${color}55`,
        boxShadow: `0 0 0 3px ${color}0D`,
      }}
    >
      <span
        className="absolute inset-y-2 left-0.5 w-0.5 rounded-full"
        style={{ backgroundColor: color }}
      />

      <input
        ref={inputRef}
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            handleSave();
          }

          if (event.key === "Escape") {
            event.preventDefault();
            onDelete();
          }
        }}
        placeholder="Type answer..."
        className="h-full w-32 bg-transparent pl-3.5 pr-2 text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/50 focus:w-44"
        style={{
          transition: "width 180ms ease",
        }}
      />

      <span className="mr-1 h-5 w-px bg-border" />

      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={handleSave}
        aria-label="Save blank"
        className="size-8 rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary"
      >
        <IconCheck className="size-4" stroke={2.3} />
      </Button>

      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={onDelete}
        aria-label="Delete blank"
        className="mr-0.5 size-8 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
      >
        <IconTrash className="size-3.5" stroke={2} />
      </Button>
    </span>
  );
}