
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  IconCards,
  IconDots,
  IconPlayerPlay,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";

import type { CollectionItem } from "@/types/collection";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type QuizTableProps = {
  items: CollectionItem[];
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

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

export function QuizTable({ items }: QuizTableProps) {
  const isLearning = items.some((item) => item.kind === "ATTEMPT");

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border/70 bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="h-10 min-w-[280px] pl-4">
              Quiz
            </TableHead>

            {isLearning ? (
              <>
                <TableHead className="h-10">Progress</TableHead>
                <TableHead className="h-10">Started</TableHead>
                <TableHead className="h-10">Last activity</TableHead>
              </>
            ) : (
              <>
                <TableHead className="h-10">Visibility</TableHead>
                <TableHead className="h-10">Created at</TableHead>
                <TableHead className="h-10">Last modified</TableHead>
              </>
            )}

            <TableHead className="h-10 w-12 pr-3" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((item) => {
            const isAttempt = item.kind === "ATTEMPT";
            const isDraft = !isAttempt && item.publishedAt === null;

            const visibility =
              !isAttempt && item.visibility
                ? visibilityConfig[item.visibility]
                : null;

            const href = isAttempt
              ? `/attempts/${item.id}`
              : `/quizzes/${item.quizId}/editor`;

            const answered = item.progress?.answered ?? 0;
            const total = item.progress?.total ?? item.questionCount;
            const progress =
              total > 0 ? Math.min((answered / total) * 100, 100) : 0;

            return (
              <TableRow
                key={`${item.kind}-${item.id}`}
                className="group transition-colors"
              >
                <TableCell className="py-2.5 pl-4">
                  <Link href={href} className="flex min-w-0 items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-muted">
                      {item.thumbnail?.url ? (
                        <Image
                          src={item.thumbnail.url}
                          alt={item.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/[0.08] via-muted to-primary/[0.04]">
                          <IconCards
                            stroke={1.5}
                            className="size-5 text-primary"
                          />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 space-y-1">
                      <p className="truncate text-sm font-medium transition-colors group-hover:text-primary">
                        {item.title}
                      </p>

                      <div className="flex items-center gap-2">
                        {isDraft && (
                          <Badge
                            variant="secondary"
                            className="h-5 px-1.5 text-[10px]"
                          >
                            Draft
                          </Badge>
                        )}

                        {isAttempt && (
                          <Badge
                            variant="secondary"
                            className="h-5 gap-1 px-1.5 text-[10px]"
                          >
                            <IconPlayerPlay className="size-3" />
                            In progress
                          </Badge>
                        )}

                        <span className="text-xs text-muted-foreground">
                          {total} questions
                        </span>
                      </div>
                    </div>
                  </Link>
                </TableCell>

                {isLearning ? (
                  <>
                    <TableCell>
                      {isAttempt ? (
                        <div className="w-32 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium tabular-nums">
                              {answered}/{total}
                            </span>
                            <span className="text-muted-foreground">
                              {Math.round(progress)}%
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
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          —
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {formatDate(item.updatedAt)}
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>
                      {visibility ? (
                        <Badge
                          variant="outline"
                          className={cn(
                            "font-medium",
                            visibility.className,
                          )}
                        >
                          {visibility.label}
                        </Badge>
                      ) : (
                        "—"
                      )}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {formatDate(item.updatedAt)}
                    </TableCell>
                  </>
                )}

                <TableCell className="pr-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Actions for ${item.title}`}
                        className="size-8 text-muted-foreground"
                      >
                        <IconDots className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-44">
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
