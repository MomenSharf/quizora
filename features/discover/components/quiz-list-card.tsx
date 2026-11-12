import Image from "next/image";
import Link from "next/link";
import {
  IconArrowUpRight,
  IconClock,
  IconPlayerPlay,
  IconRosette,
  IconTrophy,
  IconWorld,
  IconBook2,
  IconCheck,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import type { DiscoverQuiz } from "../constants/discover.select";

type QuizListCardProps = {
  quiz: DiscoverQuiz;
};

const numberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function formatDuration(seconds: number | null) {
  if (!seconds || seconds <= 0) return null;

  const minutes = Math.ceil(seconds / 60);

  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

function formatLabel(value?: string | null) {
  if (!value) return "";

  return value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getDifficultyStyle(difficulty: string) {
  switch (difficulty) {
    case "BEGINNER":
      return {
        label: "Beginner",
        className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        dotClassName: "bg-emerald-500",
      };

    case "INTERMEDIATE":
      return {
        label: "Intermediate",
        className: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
        dotClassName: "bg-amber-500",
      };

    case "ADVANCED":
      return {
        label: "Advanced",
        className: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
        dotClassName: "bg-rose-500",
      };

    default:
      return {
        label: formatLabel(difficulty),
        className: "bg-muted text-muted-foreground",
        dotClassName: "bg-muted-foreground",
      };
  }
}

function getInitial(name?: string | null) {
  return name?.trim().charAt(0).toUpperCase() || "?";
}

export function QuizListCard({ quiz }: QuizListCardProps) {
  const duration = formatDuration(quiz.estimatedDurationSeconds);
  const difficulty = getDifficultyStyle(quiz.difficulty);

  const creatorName = quiz.owner.name ?? "Unknown creator";

  return (
    <article
      className={cn(
        "group relative flex min-w-0 flex-col gap-4 rounded-2xl border border-border/70 bg-card p-3",
        "transition-all duration-200 hover:border-primary/25 hover:shadow-md hover:shadow-black/[0.03]",
        "sm:flex-row sm:items-center sm:gap-5 sm:p-4",
      )}
    >
      <Link
        href={`/discover/${quiz.slug ?? quiz.id}`}
        aria-label={`Open quiz: ${quiz.title}`}
        className="absolute inset-0 z-0 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      />

      <div className="relative z-10 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:aspect-[4/3] sm:w-40 md:w-48">
          {quiz.thumbnail?.url ? (
            <Image
              src={quiz.thumbnail.url}
              alt={quiz.title}
              fill
              sizes="(max-width: 640px) 100vw, 192px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/15 via-muted to-primary/5">
              <IconRosette size={42} stroke={1.2} className="text-primary/35" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />

          {quiz.category && (
            <div className="absolute bottom-2 left-2 flex max-w-[85%] items-center gap-1.5 rounded-md border border-white/15 bg-black/45 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
              <IconBook2 size={12} />
              <span className="truncate">{formatLabel(quiz.category)}</span>
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-semibold",
                difficulty.className,
              )}
            >
              <span
                className={cn("size-1.5 rounded-full", difficulty.dotClassName)}
              />
              {difficulty.label}
            </span>

            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <IconWorld size={14} />
              {quiz.language.toUpperCase()}
            </span>
          </div>

          <Link
        href={`/discover/${quiz.slug ?? quiz.id}`}
            className="relative z-10 w-fit rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <h3 className="line-clamp-1 text-sm font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-base">
              {quiz.title}
            </h3>
          </Link>

          {quiz.description && (
            <p className="mt-1.5 line-clamp-2 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
              {quiz.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <IconRosette size={15} className="text-primary" />
              <span className="font-medium text-foreground">
                {quiz.questionCount}
              </span>
              questions
            </span>

            {duration && (
              <span className="inline-flex items-center gap-1.5">
                <IconClock size={15} />
                {duration}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex shrink-0 items-center justify-between gap-3 border-t border-border/70 pt-3 sm:min-w-[170px] sm:flex-col sm:items-end sm:justify-center sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" title="Total plays">
            <IconPlayerPlay size={15} className="text-sky-500" />
            <span className="text-xs font-semibold tabular-nums text-foreground">
              {numberFormatter.format(quiz.playCount)}
            </span>
          </div>

          <div className="flex items-center gap-1.5" title="Completed attempts">
            <IconTrophy size={15} className="text-amber-500" />
            <span className="text-xs font-semibold tabular-nums text-foreground">
              {numberFormatter.format(quiz.completionCount)}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <Link
            href={`/users/${quiz.owner.id}`}
            className="relative z-20 flex min-w-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={`View ${creatorName}'s profile`}
          >
            {quiz.owner.image ? (
              <Image
                src={quiz.owner.image}
                alt={creatorName}
                width={30}
                height={30}
                className="size-[30px] shrink-0 rounded-full border border-border/70 object-cover"
              />
            ) : (
              <div className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {getInitial(creatorName)}
              </div>
            )}

            <div className="min-w-0">
              <p className="max-w-28 truncate text-xs font-semibold text-foreground transition-colors hover:text-primary">
                {creatorName}
              </p>
              <p className="text-[10px] text-muted-foreground">Creator</p>
            </div>
          </Link>

          <div className="pointer-events-none hidden size-8 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-primary sm:flex">
            <IconArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
