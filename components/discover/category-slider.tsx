"use client";

import Link from "next/link";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";

import { useSlider } from "@/hooks/use-slider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QUIZ_CATEGORIES } from "@/lib/config/quiz-categories";

export function CategorySlider() {
  const {
    ref,
    canScrollLeft,
    canScrollRight,
    scrollNext,
    scrollPrevious,
    overflow,
  } = useSlider<HTMLDivElement>(200);

  return (
    <section className="w-full space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight">
            Explore categories
          </h2>
          <p className="text-sm text-muted-foreground">
            Find quizzes based on what interests you.
          </p>
        </div>
      </div>
      <div className="relative w-full min-w-0 overflow-hidden">
        <div
          ref={ref}
          className={cn(
            "flex h-12 w-full min-w-0 items-center gap-2",
            "overflow-x-auto overflow-y-hidden",
            "scrollbar-none scroll-smooth px-10",
            overflow === "none" && "px-0",
          )}
        >
          {QUIZ_CATEGORIES.map((category) => (
            <Link
              key={category.value}
              href={`/explore?category=${encodeURIComponent(category.value)}`}
              className={cn(
                "inline-flex h-10 shrink-0 items-center justify-center",
                "rounded-full border border-border/70 bg-background px-4",
                "text-sm font-medium text-muted-foreground",
                "transition-colors duration-200",
                "hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
              )}
            >
              {category.label}
            </Link>
          ))}
        </div>

        {/* Keep your existing left and right scroll buttons here */}
      </div>
    </section>
  );
}
