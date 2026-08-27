"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag } from "lucide-react";

import { cn } from "@/lib/utils";

interface TagsInputProps {
  value?: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
  className?: string;
}

export function TagsInput({
  value = [],
  onChange,
  placeholder = "Add a tag...",
  maxTags = 10,
  disabled = false,
  className,
}: TagsInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTag = React.useCallback(() => {
    const tag = inputValue.trim();

    if (!tag) return;

    // Prevent duplicates
    if (value.some((item) => item.toLowerCase() === tag.toLowerCase())) {
      setInputValue("");
      return;
    }

    // Prevent exceeding max tags
    if (value.length >= maxTags) return;

    onChange([...value, tag]);
    setInputValue("");
  }, [inputValue, value, maxTags, onChange]);

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag();
      return;
    }

    // Delete the last tag when input is empty
    if (
      event.key === "Backspace" &&
      inputValue === "" &&
      value.length > 0
    ) {
      event.preventDefault();
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div
      className={cn(
        "group flex min-h-11 w-full cursor-text flex-wrap items-center gap-1.5 rounded-xl border border-border/70 bg-background px-3 py-4",
        "transition-all duration-200",
        "hover:border-border",
        "focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Icon */}
      <Tag className="mr-1 size-4 shrink-0 text-muted-foreground" />

      {/* Tags */}
     <AnimatePresence initial={false}>
  {value.map((tag) => (
    <motion.div
      key={tag}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{
        duration: 0.12,
        ease: "easeOut",
      }}
      className="group/tag inline-flex items-center gap-1 rounded-lg border border-border/70 bg-muted/70 py-1 pl-2.5 pr-1 text-xs font-medium text-foreground"
    >
      <span>{tag}</span>

      <button
        type="button"
        disabled={disabled}
        onClick={(event) => {
          event.stopPropagation();
          removeTag(tag);
        }}
        className="flex size-5 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
        aria-label={`Remove ${tag}`}
      >
        <X className="size-3" />
      </button>
    </motion.div>
  ))}
</AnimatePresence>

      {/* Input */}
      <input
        ref={inputRef}
        value={inputValue}
        disabled={disabled || value.length >= maxTags}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
        className="h-7 min-w-[120px] flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground/60 disabled:cursor-not-allowed"
      />
    </div>
  );
}