
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
} from "@tabler/icons-react";
import { DiscoverQuiz } from "../constants/discover.select";

type QuizCardProps = {
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

function formatDifficulty(difficulty: string) {
  return difficulty.charAt(0) + difficulty.slice(1).toLowerCase();
}

function getDifficultyStyle(difficulty: string) {
  switch (difficulty) {
    case "EASY":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "MEDIUM":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
    case "HARD":
      return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function QuizCard({ quiz }: QuizCardProps) {
  const duration = formatDuration(quiz.estimatedDurationSeconds);

  return (
    <Link
    href={`/discover/${quiz.slug ?? quiz.id}`}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/[0.06]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {quiz.thumbnail?.url ? (
          <Image
            src={quiz.thumbnail.url}
            alt={quiz.title}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 300px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/15 via-muted to-primary/5">
            <IconRosette
              size={48}
              stroke={1.2}
              className="text-primary/30"
            />
          </div>
        )}

        {/* Image gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

        {/* Category */}
        {quiz.category && (
          <div className="absolute left-3 top-3 flex max-w-[75%] items-center gap-1.5 rounded-lg border border-white/20 bg-black/45 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
            <IconBook2 size={13} stroke={2} />
            <span className="truncate">{quiz.category}</span>
          </div>
        )}

        {/* Quick action */}
        <div className="absolute bottom-3 right-3 flex size-9 translate-y-2 items-center justify-center rounded-full bg-white text-gray-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <IconArrowUpRight size={19} stroke={2} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Difficulty and language */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span
            className={`rounded-md px-2 py-1 text-[11px] font-semibold ${getDifficultyStyle(quiz.difficulty)}`}
          >
            {formatDifficulty(quiz.difficulty)}
          </span>

          <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
            <IconWorld size={15} className="text-sky-500" stroke={1.9} />
            {quiz.language.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-[15px] font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
          {quiz.title}
        </h3>

        {/* Description */}
        {quiz.description && (
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
            {quiz.description}
          </p>
        )}

        {/* Quiz details */}
        <div className="mt-4 flex flex-wrap items-center gap-1">
          <div className="flex items-center gap-1.5 rounded-lg bg-primary/[0.07] px-2.5 py-2 text-xs font-medium text-primary">
            <IconRosette size={15} stroke={1.9} />
            {quiz.questionCount} questions
          </div>

          {duration && (
            <div className="flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-2 text-xs font-medium text-muted-foreground">
              <IconClock size={15} stroke={1.9} />
              {duration}
            </div>
          )}
        </div>

        {/* Engagement stats */}
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <IconPlayerPlay
              size={16}
              className="text-blue-500"
              stroke={1.9}
            />
            <span className="font-semibold text-foreground">
              {numberFormatter.format(quiz.playCount)}
            </span>
            plays
          </span>

          <span className="flex items-center gap-1.5">
            <IconTrophy
              size={16}
              className="text-amber-500"
              stroke={1.9}
            />
            <span className="font-semibold text-foreground">
              {numberFormatter.format(quiz.completionCount)}
            </span>
            completed
          </span>
        </div>

        {/* Creator */}
    
{/* Creator */}
<div className="mt-auto pt-4">
  <div className="flex items-center gap-2.5 rounded-xl bg-muted/50 p-2.5 transition-colors group-hover:bg-muted/80">
    <Link
      href={`/users/${quiz.owner.id}`}
      onClick={(e) => e.stopPropagation()}
      className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {quiz.owner.image ? (
        <Image
          src={quiz.owner.image}
          alt={quiz.owner.name ?? "Creator"}
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-full object-cover ring-2 ring-background"
        />
      ) : (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary ring-2 ring-background">
          {quiz.owner.name?.charAt(0).toUpperCase() ?? "?"}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-foreground transition-colors hover:text-primary">
          {quiz.owner.name ?? "Unknown creator"}
        </p>
        <p className="text-[10px] text-muted-foreground">Quiz creator</p>
      </div>

      <IconArrowUpRight
        size={16}
        className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
      />
    </Link>
  </div>
</div>

      </div>
    </Link>
  );
}
