
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconSearch,
  IconX,
  IconArrowRight,
} from "@tabler/icons-react";

import { useQuizSearchParams } from "../../hooks/use-quiz-search-params";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type QuizSearchInputProps = {
  className?: string;
  placeholder?: string;
  onSearch?: () => void;
};

export function QuizSearchInput({
  className,
  placeholder = "Search quizzes...",
  onSearch,
}: QuizSearchInputProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const { query, setQuery, commitSearch } = useQuizSearchParams();

  const [focused, setFocused] = useState(false);

  function handleSearch() {
    commitSearch();
    onSearch?.();
  }

  function handleClear() {
    setQuery("");
    inputRef.current?.focus();
  }

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === "Escape") {
        inputRef.current?.blur();
      }
    }

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
      className={cn(
        "relative w-full max-w-md",
        className,
      )}
    >
      <div
        className={cn(
          "bg-muted/60 relative flex h-10 items-center rounded-lg border transition-all duration-200",
          focused
            ? "border-primary/40 bg-background ring-2 ring-primary/10"
            : "border-transparent hover:border-border hover:bg-muted",
        )}
      >
        <IconSearch
          className={cn(
            "ml-3 size-[18px] shrink-0 transition-colors",
            focused ? "text-primary" : "text-muted-foreground",
          )}
          strokeWidth={1.8}
        />

        <Input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="h-full min-w-0 flex-1 border-0 bg-transparent px-2 shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        {query ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="mr-1 size-7 shrink-0 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <IconX className="size-4" />
          </Button>
        ) : (
          <kbd className="text-muted-foreground mr-2 hidden h-6 items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] sm:inline-flex">
            <span>⌘</span>K
          </kbd>
        )}

        {query.trim() && (
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="mr-1 size-7 shrink-0"
            aria-label="Submit search"
          >
            <IconArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
