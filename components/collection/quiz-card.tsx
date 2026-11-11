"use client";

import Image from "next/image";
import Link from "next/link";

import {
  IconCards,
  IconCheck,
  IconClock,
  IconDots,
  IconEdit,
  IconLanguage,
  IconListNumbers,
  IconPlayerPlay,
  IconTrash,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { CollectionItem } from "@/types/collection";
import { QuizAttemptStatus } from "@/lib/db/generated/prisma/enums";

type QuizCardProps = {
  item: CollectionItem;
};

const visibilityConfig = {
  PUBLIC: {
    label: "Public",
    className:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  UNLISTED: {
    label: "Unlisted",
    className:
      "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  PRIVATE: {
    label: "Private",
    className: "border-border bg-muted text-muted-foreground",
  },
};

type AttemptStatusConfig = {
  label: string;
  icon: typeof IconPlayerPlay;
  className: string;
};

const attemptStatusConfig = {
  IDLE: null,
  IN_PROGRESS: {
    label: "In Progress",
    icon: IconPlayerPlay,
    className: "bg-blue-600 text-white hover:bg-blue-600",
  },
  COMPLETED: {
    label: "Completed",
    icon: IconCheck,
    className: "bg-emerald-600 text-white hover:bg-emerald-600",
  },
  EXPIRED: {
    label: "Expired",
    icon: IconClock,
    className: "bg-orange-500 text-white hover:bg-orange-500",
  },
} satisfies Record<QuizAttemptStatus, AttemptStatusConfig | null>;

export function QuizCard({ item }: QuizCardProps) {
  const isAttempt = item.kind === "ATTEMPT";
  const isDraft = !isAttempt && item.publishedAt === null;

  const href = isAttempt
    ? `/attempts/${item.id}`
    : `/quizzes/${item.quizId}/editor`;

  const answered = item.progress?.answered ?? 0;
  const total = item.progress?.total ?? item.questionCount;
  const progress = total > 0 ? Math.min((answered / total) * 100, 100) : 0;

  const visibility =
    !isAttempt && item.visibility ? visibilityConfig[item.visibility] : null;

  const attemptStatus =
    isAttempt && item.status ? attemptStatusConfig[item.status] : null;
  return (
    <Card className="group overflow-hidden rounded-xl border-border/70 bg-card py-0 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
      <Link
        href={href}
        className="relative block aspect-[16/9] overflow-hidden bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      >
        {item.thumbnail ? (
          <Image
            src={item.thumbnail.url}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative flex size-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary/[0.08] via-muted to-primary/[0.04]">
            <div className="absolute -right-6 -top-8 size-28 rounded-full bg-primary/[0.05] blur-2xl" />

            <div className="relative flex size-14 items-center justify-center rounded-2xl border border-border/60 bg-background/80 shadow-sm">
              <IconCards stroke={1.5} className="size-7 text-primary" />
            </div>
          </div>
        )}

        {isDraft && (
          <Badge
            variant="secondary"
            className="absolute left-2.5 top-2.5 border border-border/60 bg-background/90 text-foreground shadow-sm backdrop-blur"
          >
            Draft
          </Badge>
        )}

        {attemptStatus && (
          <Badge
            className={cn(
              "absolute left-3 top-3 gap-1.5 rounded-md border-0 px-2.5 py-1 text-[11px] font-semibold shadow-sm",
              attemptStatus.className,
            )}
          >
            <attemptStatus.icon className="size-3.5" strokeWidth={2.2} />
            {attemptStatus.label}
          </Badge>
        )}
      </Link>

      <CardContent className="flex flex-col gap-2.5 p-3">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={href}
            className="min-w-0 flex-1 outline-none focus-visible:underline focus-visible:underline-offset-4"
          >
            <h3 className="line-clamp-2 text-sm font-semibold leading-5 tracking-tight transition-colors group-hover:text-primary">
              {item.title}
            </h3>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Collection item actions"
                className="size-8 shrink-0 rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <IconDots className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 p-1.5">
              {isAttempt ? (
                <>
                  <DropdownMenuItem asChild className="gap-2.5 rounded-md">
                    <Link href={href}>
                      <IconPlayerPlay className="size-4 text-muted-foreground" />
                      <span>Continue Attempt</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1" />

                  <DropdownMenuItem
                    className="gap-2.5 rounded-md text-destructive focus:bg-destructive/10 focus:text-destructive"
                    onSelect={() => {
                      // Handle delete attempt
                    }}
                  >
                    <IconTrash className="size-4" />
                    <span>Delete Attempt</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild className="gap-2.5 rounded-md">
                    <Link href={href}>
                      <IconEdit className="size-4 text-muted-foreground" />
                      <span>Edit Quiz</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1" />

                  <DropdownMenuItem
                    className="gap-2.5 rounded-md text-destructive focus:bg-destructive/10 focus:text-destructive"
                    onSelect={() => {
                      // Handle delete quiz
                    }}
                  >
                    <IconTrash className="size-4" />
                    <span>Delete Quiz</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between gap-2">
          {visibility ? (
            <Badge
              variant="outline"
              className={cn("text-[10px] font-medium", visibility.className)}
            >
              {visibility.label}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-[10px] font-medium">
              {isAttempt ? "Attempt" : "Quiz"}
            </Badge>
          )}

          <span className="text-xs tabular-nums text-muted-foreground">
            {total} questions
          </span>
        </div>

        {isAttempt ? (
          <div className="space-y-1.5 border-t border-border/60 pt-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium tabular-nums text-foreground">
                {answered}/{total} answered
              </span>
            </div>

            <div
              className="h-1.5 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuenow={answered}
              aria-valuemin={0}
              aria-valuemax={total}
            >
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 border-t border-border/60 pt-2.5">
            <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
              <IconLanguage className="size-3.5 shrink-0" />
              <span className="truncate">{item.language}</span>
            </div>

            {item.category && (
              <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                <IconListNumbers className="size-3.5 shrink-0" />
                <span className="truncate">{item.category}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
