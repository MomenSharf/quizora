"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  IconArrowLeft,
  IconCheck,
  IconClock,
  IconFlag,
  IconSearch,
  IconX,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useReviewQuestions, useRuntimeActions } from "../store";
import { RuntimeQuestion } from "../types/runtime-types";

type ReviewTab = "all" | "answered" | "unanswered" | "marked";

const tabs: { id: ReviewTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "answered", label: "Answered" },
  { id: "unanswered", label: "Unanswered" },
  { id: "marked", label: "Marked" },
];

export default function QuestionsReview() {
  const [activeTab, setActiveTab] = useState<ReviewTab>("all");
  const [search, setSearch] = useState("");

  const {
    allQuestions,
    answeredQuestions,
    unansweredQuestions,
    markedQuestions,
    totalCount,
    answeredCount,
    unansweredCount,
    markedCount,
  } = useReviewQuestions();

  const { setCurrentQuestion, setCurrentView } = useRuntimeActions();

  const counts: Record<ReviewTab, number> = {
    all: totalCount,
    answered: answeredCount,
    unanswered: unansweredCount,
    marked: markedCount,
  };

  const visibleQuestions = useMemo(() => {
    const source: Record<ReviewTab, RuntimeQuestion[]> = {
      all: allQuestions,
      answered: answeredQuestions,
      unanswered: unansweredQuestions,
      marked: markedQuestions,
    };

    const query = search.trim();

    return source[activeTab]
      .map((question) => ({
        question,
        index: allQuestions.findIndex((item) => item.id === question.id),
      }))
      .filter(({ index }) =>
        query ? String(index + 1).includes(query) : true,
      );
  }, [
    activeTab,
    search,
    allQuestions,
    answeredQuestions,
    unansweredQuestions,
    markedQuestions,
  ]);

  const handleJump = (index: number) => {
    setCurrentQuestion(index);
    setCurrentView("QUESTION");
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-2 py-3 sm:px-6 sm:py-7 lg:px-8">
      {/* Back to question */}
      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentView("QUESTION")}
        >
          <IconArrowLeft size={16} />
          Back to question
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto border-b pb-3">
        <div className="flex min-w-fit items-center gap-1">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {tab.label}

                <span
                  className={cn(
                    "text-xs tabular-nums",
                    active
                      ? "text-primary-foreground/75"
                      : "text-muted-foreground",
                  )}
                >
                  {counts[tab.id]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Question number search */}
        <div className="ml-auto flex min-w-24 items-center gap-2">
          <IconSearch size={16} className="shrink-0 text-muted-foreground" />

          <Input
            type="number"
            min={1}
            max={totalCount}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="#"
            aria-label="Find question by number"
            className="h-9 w-16 border-0 bg-muted/60 text-center shadow-none focus-visible:ring-1"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear question number"
              className="text-muted-foreground hover:text-foreground"
            >
              <IconX size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <Legend color="bg-emerald-500" label="Answered" />
        <Legend color="bg-amber-500" label="Unanswered" />
        <Legend color="bg-rose-500" label="Timed out" />
        <Legend color="bg-muted-foreground/40" label="Not visited" />

        <span className="ml-auto">
          {visibleQuestions.length} of {totalCount}
        </span>
      </div>

      {/* Jump to question */}
      <div className="space-y-3 rounded-xl border bg-card p-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Jump to question</p>
          <span className="text-xs text-muted-foreground">
            {allQuestions.filter((q) => q.visited).length} / {totalCount}{" "}
            visited
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10">
          {allQuestions.map((question, index) => {
            const isAnswered = question.status === "ANSWERED";
            const isTimedOut = question.status === "TIMED_OUT";

            return (
              <button
                key={question.id}
                type="button"
                disabled={!question.visited}
                onClick={() => handleJump(index)}
                title={
                  question.visited
                    ? `Go to question ${index + 1}`
                    : `Question ${index + 1} - Not visited`
                }
                className={cn(
                  "relative flex aspect-square items-center justify-center rounded-lg border text-xs font-semibold tabular-nums transition-all",
                  !question.visited &&
                    "cursor-not-allowed border-dashed border-border/60 bg-muted/40 text-muted-foreground/35",
                  question.visited &&
                    isAnswered &&
                    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400",
                  question.visited &&
                    isTimedOut &&
                    "border-rose-500/30 bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 dark:text-rose-400",
                  question.visited &&
                    !isAnswered &&
                    !isTimedOut &&
                    "border-amber-500/30 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 dark:text-amber-400",
                  question.visited &&
                    question.flagged &&
                    "ring-1 ring-violet-500/50",
                )}
              >
                {index + 1}

                {question.flagged && question.visited && (
                  <IconFlag
                    size={10}
                    className="absolute -right-1 -top-1 fill-violet-500 text-violet-500"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + search}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
          className="space-y-2"
        >
          {visibleQuestions
            .filter((e) => e.question.visited)
            .map(({ question, index }) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
                onClick={() => handleJump(index)}
              />
            ))}
        </motion.div>
      </AnimatePresence>

      {visibleQuestions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <IconSearch size={24} className="mb-2 text-muted-foreground" />

          <p className="text-sm font-medium">No questions found</p>

          <p className="mt-1 text-xs text-muted-foreground">
            {search
              ? "Try another question number."
              : "There are no questions in this category."}
          </p>
        </div>
      )}
    </div>
  );
}

function QuestionCard({
  question,
  index,
  onClick,
}: {
  question: RuntimeQuestion;
  index: number;
  onClick: () => void;
}) {
  const isAnswered = question.status === "ANSWERED";
  const isTimedOut = question.status === "TIMED_OUT";

  const status = isAnswered
    ? {
        label: "Answered",
        className: "text-emerald-600 dark:text-emerald-400",
        icon: IconCheck,
      }
    : isTimedOut
      ? {
          label: "Timed out",
          className: "text-rose-600 dark:text-rose-400",
          icon: IconClock,
        }
      : {
          label: "Unanswered",
          className: "text-amber-600 dark:text-amber-400",
          icon: IconClock,
        };

  const StatusIcon = status.icon;
  const image = question.question.image;

  return (
    <button
      type="button"
      onClick={onClick}
      title={`Go to question ${index + 1}`}
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg border bg-card p-2.5 text-left transition-all",
      )}
    >
      {/* Question index */}
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold tabular-nums text-muted-foreground transition-colors group-hover:text-foreground">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Question image */}
      {image?.url && (
        <div className="relative size-10 shrink-0 overflow-hidden rounded-md border bg-muted">
          <Image
            src={image.url}
            alt={image.alt || `Question ${index + 1}`}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
      )}

      {/* Question content */}
      <div className="min-w-0 flex-1 space-y-1">
        <div
          className="line-clamp-2 text-xs font-medium leading-5 text-foreground sm:text-sm"
          dangerouslySetInnerHTML={{
            __html: question.question.title || "Untitled question",
          }}
        />

        <div className="flex items-center gap-2 text-[11px]">
          <span
            className={cn("inline-flex items-center gap-1", status.className)}
          >
            <StatusIcon size={12} />
            {status.label}
          </span>

          {question.flagged && (
            <IconFlag
              size={12}
              className="fill-violet-500/15 text-violet-500"
            />
          )}

          <span className="text-muted-foreground">
            {question.maxPoints ?? 0} pts
          </span>
        </div>
      </div>
    </button>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("size-2 rounded-full", color)} />
      {label}
    </span>
  );
}
