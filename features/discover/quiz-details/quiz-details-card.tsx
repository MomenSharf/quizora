
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IconArrowUpRight,
  IconBook2,
  IconCheck,
  IconClock,
  IconCopy,
  IconEdit,
  IconHeart,
  IconPlayerPlay,
  IconRosette,
  IconShare3,
  IconStar,
  IconTrophy,
  IconWorld,
} from "@tabler/icons-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuizDetailsCardProps {
  quiz: {
    id: string;
    title: string;
    description: string | null;
    thumbnail: {
      url: string;
      alt?: string | null;
    } | null;
    category: string | null;
    difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    language: string;
    tags: string[];
    questionCount: number;
    totalPoints: number;
    estimatedDurationSeconds: number | null;
    playCount: number;
    completionCount: number;
    likeCount: number;
    isFeatured: boolean;
    isOwner: boolean;
    owner: {
      id: string;
      name: string | null;
      image: string | null;
    };
  };
}

const difficultyStyles = {
  BEGINNER:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  INTERMEDIATE:
    "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  ADVANCED:
    "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

function formatDuration(seconds: number | null) {
  if (!seconds || seconds <= 0) return "No time limit";

  const minutes = Math.ceil(seconds / 60);

  return minutes < 60
    ? `${minutes} min`
    : `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

function formatCount(value: number) {
  return new Intl.NumberFormat("en", {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof IconBook2;
  value: string;
  label: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/70 text-muted-foreground">
        <Icon className="size-[18px]" strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold tabular-nums">{value}</p>
        <p className="truncate text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function QuizDetailsCard({ quiz }: QuizDetailsCardProps) {
  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: quiz.title,
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      toast.success("Quiz link copied");
    } catch {
      toast.error("Unable to share this quiz");
    }
  };

  const handleFavorite = () => {
    toast.info("Favorites will be available soon");
  };

  const handleCopy = () => {
    toast.info("Quiz duplication will be available soon");
  };

  return (
    <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="relative min-h-[240px] overflow-hidden bg-muted sm:min-h-[320px] lg:min-h-[390px]">
          {quiz.thumbnail?.url ? (
            <Image
              src={quiz.thumbnail.url}
              alt={quiz.thumbnail.alt || quiz.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full min-h-[240px] items-center justify-center bg-gradient-to-br from-primary/15 via-primary/5 to-muted">
              <IconBook2
                className="size-20 text-primary/35"
                strokeWidth={1.2}
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/15" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {quiz.isFeatured && (
              <Badge className="gap-1.5 border-0 bg-amber-400 text-amber-950 hover:bg-amber-400">
                <IconStar className="size-3.5" />
                Featured
              </Badge>
            )}

            {quiz.category && (
              <Badge
                variant="secondary"
                className="border-white/15 bg-black/35 text-white backdrop-blur-md"
              >
                {quiz.category}
              </Badge>
            )}
          </div>

          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                Quiz overview
              </p>
              <p className="mt-1 text-sm font-medium">
                {quiz.questionCount} questions
                <span className="mx-2 text-white/50">·</span>
                {formatDuration(quiz.estimatedDurationSeconds)}
              </p>
            </div>

            <Badge
              variant="outline"
              className="shrink-0 border-white/30 bg-black/25 text-white backdrop-blur-md"
            >
              <IconWorld className="mr-1.5 size-3.5" />
              {quiz.language.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="flex min-w-0 flex-col p-5 sm:p-7 lg:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                "font-medium",
                difficultyStyles[quiz.difficulty],
              )}
            >
              <IconRosette className="mr-1.5 size-3.5" />
              {quiz.difficulty.charAt(0) +
                quiz.difficulty.slice(1).toLowerCase()}
            </Badge>

            <Badge variant="secondary" className="font-normal">
              {quiz.totalPoints} points
            </Badge>

            {quiz.isOwner && (
              <Badge variant="outline" className="gap-1 text-muted-foreground">
                <IconCheck className="size-3.5" />
                Your quiz
              </Badge>
            )}
          </div>

          <div className="mt-5">
            <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {quiz.title}
            </h1>

            {quiz.description && (
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground sm:text-[15px]">
                {quiz.description}
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {quiz.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-md px-2.5 py-1 text-xs font-normal text-muted-foreground"
              >
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="my-6 grid grid-cols-2 gap-x-4 gap-y-5 border-y py-5 sm:grid-cols-3">
            <Stat
              icon={IconPlayerPlay}
              value={formatCount(quiz.playCount)}
              label="Plays"
            />
            <Stat
              icon={IconTrophy}
              value={formatCount(quiz.completionCount)}
              label="Completions"
            />
            <Stat
              icon={IconHeart}
              value={formatCount(quiz.likeCount)}
              label="Likes"
            />
            <Stat
              icon={IconBook2}
              value={String(quiz.questionCount)}
              label="Questions"
            />
            <Stat
              icon={IconClock}
              value={formatDuration(quiz.estimatedDurationSeconds)}
              label="Estimated time"
            />
            <Stat
              icon={IconStar}
              value={String(quiz.totalPoints)}
              label="Total points"
            />
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-muted">
                {quiz.owner.image ? (
                  <Image
                    src={quiz.owner.image}
                    alt={quiz.owner.name || "Quiz creator"}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-sm font-semibold text-muted-foreground">
                    {(quiz.owner.name || "U").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Created by</p>
                <p className="truncate text-sm font-semibold">
                  {quiz.owner.name || "Anonymous"}
                </p>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-2 sm:w-auto">
              <Button asChild className="flex-1 sm:flex-none">
                <Link href={`/quizzes/${quiz.id}/play`}>
                  <IconPlayerPlay className="mr-2 size-4" />
                  Play quiz
                </Link>
              </Button>

              {quiz.isOwner ? (
                <Button asChild variant="outline" size="icon">
                  <Link
                    href={`/quizzes/${quiz.id}/editor`}
                    aria-label="Edit quiz"
                  >
                    <IconEdit className="size-4" />
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="flex-1 sm:flex-none"
                >
                  <IconCopy className="mr-2 size-4" />
                  Copy & edit
                </Button>
              )}

              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
                aria-label="Share quiz"
              >
                <IconShare3 className="size-4" />
              </Button>

              {!quiz.isOwner && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleFavorite}
                  aria-label="Add to favorites"
                >
                  <IconHeart className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
