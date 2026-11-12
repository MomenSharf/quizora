
"use client";

import Link from "next/link";
import {
  IconArrowUpRight,
  IconChevronLeft,
  IconChevronRight,
  IconFlame,
  IconTrendingUp,
  IconTrophy,
  IconEye,
  IconHeart,
  IconStar,
} from "@tabler/icons-react";

import { useSlider } from "@/hooks/use-slider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { QuizCard } from "./quiz-card";
import { DiscoverQuiz } from "../constants/discover.select";
import { useRouter } from "next/navigation";

const DISCOVER_ICONS = {
  popular: IconFlame,
  trending: IconTrendingUp,
  completed: IconTrophy,
  viewed: IconEye,
  liked: IconHeart,
  featured: IconStar,
} as const;

const DISCOVER_COLORS = {
  popular: {
    color: "text-orange-500",
    background: "bg-orange-500/10",
    decoration: "bg-orange-500/[0.06]",
  },
  trending: {
    color: "text-rose-500",
    background: "bg-rose-500/10",
    decoration: "bg-rose-500/[0.06]",
  },
  completed: {
    color: "text-emerald-500",
    background: "bg-emerald-500/10",
    decoration: "bg-emerald-500/[0.06]",
  },
  viewed: {
    color: "text-sky-500",
    background: "bg-sky-500/10",
    decoration: "bg-sky-500/[0.06]",
  },
  liked: {
    color: "text-pink-500",
    background: "bg-pink-500/10",
    decoration: "bg-pink-500/[0.06]",
  },
  featured: {
    color: "text-violet-500",
    background: "bg-violet-500/10",
    decoration: "bg-violet-500/[0.06]",
  },
} as const;

type DiscoverQuizSliderProps = {
  title: string;
  description: string;
  href: string;
  quizzes: DiscoverQuiz[];
  icon: keyof typeof DISCOVER_ICONS;
};

export function DiscoverQuizSlider({
  title,
  description,
  href,
  quizzes,
  icon,
}: DiscoverQuizSliderProps) {
  const {
    ref,
    canScrollLeft,
    canScrollRight,
    scrollNext,
    scrollPrevious,
    overflow,
  } = useSlider<HTMLDivElement>(260);

  const hasOverflow = overflow !== "none";

  const router = useRouter()
  if (!quizzes.length) return null;

  const Icon = DISCOVER_ICONS[icon];
  const colors = DISCOVER_COLORS[icon];

  return (
    <section className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:gap-4">
      {/* Section card */}
    <button
  type="button"
  onClick={() => router.push(href)}
  className={cn(
    "group relative flex min-h-40 w-full shrink-0 flex-col justify-between",
    "overflow-hidden rounded-2xl border border-border/70 bg-card p-5 text-left",
    "transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-lg hover:shadow-black/[0.04]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
    "sm:min-h-[270px] sm:w-[190px] sm:p-5 lg:w-[215px]",
  )}
>
        <div className="relative z-10 flex items-start justify-between">
          <div
            className={cn(
              "flex size-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 sm:size-14",
              colors.background,
              colors.color,
            )}
          >
            <Icon className="size-7 sm:size-8" strokeWidth={1.7} />
          </div>

          <IconArrowUpRight className="size-5 text-muted-foreground/60 transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
        </div>

        <div className="relative z-10 mt-5">
          <h2 className="text-lg font-bold tracking-tight sm:text-xl">
            {title}
          </h2>

          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>

          <div
            className={cn(
              "mt-4 inline-flex items-center gap-1.5 text-xs font-semibold",
              colors.color,
            )}
          >
            Explore quizzes
            <IconArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Decorative shapes */}
        <div
          className={cn(
            "pointer-events-none absolute -bottom-12 -right-10 size-36 rounded-full transition-transform duration-500 group-hover:scale-125",
            colors.decoration,
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute -bottom-16 -right-2 size-24 rounded-full",
            colors.decoration,
          )}
        />
      </button>

      {/* Quiz slider */}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex min-h-9 items-center justify-end gap-1.5">
          {hasOverflow && (
            <>
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={!canScrollLeft}
                aria-label={`Scroll ${title} left`}
                onMouseDown={(event) => event.preventDefault()}
                onClick={scrollPrevious}
                className="size-8 rounded-full"
              >
                <IconChevronLeft className="size-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={!canScrollRight}
                aria-label={`Scroll ${title} right`}
                onMouseDown={(event) => event.preventDefault()}
                onClick={scrollNext}
                className="size-8 rounded-full"
              >
                <IconChevronRight className="size-4" />
              </Button>
            </>
          )}
        </div>

        <div
          ref={ref}
          className={cn(
            "flex min-w-0 flex-1 items-stretch gap-3",
            "overflow-x-auto overflow-y-hidden",
            "scrollbar-none scroll-smooth pb-1",
          )}
        >
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="w-[250px] shrink-0 sm:w-[260px] lg:w-[270px]"
            >
              <QuizCard quiz={quiz} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
