
"use client";

import Link from "next/link";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCompass,
  IconArrowUpRight,
  IconCategory2,
} from "@tabler/icons-react";

import { useSlider } from "@/hooks/use-slider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { QUIZ_CATEGORIES } from "@/lib/config/quiz-categories";



export function CategorySlider() {
  const {
    ref,
    canScrollLeft,
    canScrollRight,
    scrollNext,
    scrollPrevious,
    overflow,
  } = useSlider<HTMLDivElement>(240);

  const hasOverflow = overflow !== "none";

  return (
    <section className="w-full min-w-0 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <IconCategory2 className="size-5" strokeWidth={1.8} />
          </div>

          <div className="min-w-0 space-y-0.5">
            <h2 className="text-base font-semibold tracking-tight sm:text-lg">
              Explore categories
            </h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Find your next favorite topic.
            </p>
          </div>
        </div>

        {hasOverflow && (
          <div className="flex shrink-0 items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={!canScrollLeft}
              aria-label="Scroll categories left"
              onMouseDown={(event) => event.preventDefault()}
              onClick={scrollPrevious}
              className="size-9 rounded-full"
            >
              <IconChevronLeft className="size-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={!canScrollRight}
              aria-label="Scroll categories right"
              onMouseDown={(event) => event.preventDefault()}
              onClick={scrollNext}
              className="size-9 rounded-full"
            >
              <IconChevronRight className="size-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="relative min-w-0">
        <div
          ref={ref}
          className={cn(
            "flex w-full min-w-0 items-stretch gap-3",
            "overflow-x-auto overflow-y-hidden",
            "scrollbar-none scroll-smooth py-1",
          )}
        >
          {QUIZ_CATEGORIES.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.value}
                href={`/discover/search?category=${encodeURIComponent(category.value)}`}
                className={cn(
                  "group relative flex min-h-32 w-40 shrink-0 flex-col justify-between",
                  "overflow-hidden rounded-2xl border border-border/70",
                  "bg-card p-4",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-1 hover:shadow-md",
                  category.color.border,
                  "active:translate-y-0 active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-primary focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-background",
                  "sm:w-44 sm:min-h-36 sm:p-5",
                )}
              >
                <div className="relative z-10 flex items-start justify-between gap-2">
                  <div
                    className={cn(
                      "flex size-11 items-center justify-center rounded-xl",
                      "transition-all duration-200",
                      category.color.background,
                      category.color.foreground,
                      category.color.hover,
                      "group-hover:scale-105",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={1.8} />
                  </div>

                  <IconArrowUpRight
                    className={cn(
                      "size-4 text-muted-foreground/50",
                      "transition-all duration-200",
                      "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                      category.color.foreground,
                    )}
                  />
                </div>

                <div className="relative z-10 mt-5">
                  <h3
                    className={cn(
                      "text-sm font-semibold tracking-tight text-foreground",
                      "transition-colors duration-200",
                      "group-hover:text-foreground sm:text-base",
                    )}
                  >
                    {category.label}
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Explore quizzes
                  </p>
                </div>

                <div
                  className={cn(
                    "pointer-events-none absolute -bottom-8 -right-8 size-24 rounded-full",
                    "transition-transform duration-300 group-hover:scale-150",
                    category.color.decoration,
                  )}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
