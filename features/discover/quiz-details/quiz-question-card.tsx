
"use client";

import type { ComponentProps } from "react";
import { IconClock } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";

import { SingleSelectQuestion } from "./questions/single-select-question";
import { MultipleSelectQuestion } from "./questions/multiple-select-question";
import { TrueFalseQuestion } from "./questions/true-false-question";
import { OrderingQuestion } from "./questions/ordering-question";
import { MatchQuestion } from "./questions/match-question";
import { TypeAnswerQuestion } from "./questions/type-answer-question";
import { FlashcardsQuestion } from "./questions/flashcards-question";
import { FillBlankQuestion } from "./questions/fill-blank-question";
import { RangeQuestion } from "./questions/rang-question";
import { GuessQuestion } from "./questions/guess-question";
import { TapFindQuestion } from "./questions/tap-find-question";

type QuestionDataMap = {
  SINGLE_SELECT: ComponentProps<typeof SingleSelectQuestion>["data"];
  MULTIPLE_SELECT: ComponentProps<typeof MultipleSelectQuestion>["data"];
  TRUE_FALSE: ComponentProps<typeof TrueFalseQuestion>["data"];
  ORDERING: ComponentProps<typeof OrderingQuestion>["data"];
  MATCH: ComponentProps<typeof MatchQuestion>["data"];
  TYPE_ANSWER: ComponentProps<typeof TypeAnswerQuestion>["data"];
  FILL_BLANK: ComponentProps<typeof FillBlankQuestion>["data"];
  FLASHCARDS: ComponentProps<typeof FlashcardsQuestion>["data"];
  RANGE: ComponentProps<typeof RangeQuestion>["data"];
  GUESS: ComponentProps<typeof GuessQuestion>["data"];
  TAP_FIND: ComponentProps<typeof TapFindQuestion>["data"];
};

type QuestionType = keyof QuestionDataMap;

type QuizQuestionBase = {
  id: string;
  title: string;
  description: string | null;
  image: unknown;
  points: number;
  timeLimitSeconds: number | null;
  orderIndex: number;
};

export type QuizQuestion = {
  [K in QuestionType]: QuizQuestionBase & {
    type: K;
    data: QuestionDataMap[K];
  };
}[QuestionType];

interface QuizQuestionCardProps {
  question: QuizQuestion;
  index: number;
  showAnswers: boolean;
}

const QUESTION_TYPES: Record<QuestionType, string> = {
  SINGLE_SELECT: "Single choice",
  MULTIPLE_SELECT: "Multiple choice",
  TRUE_FALSE: "True / False",
  ORDERING: "Ordering",
  MATCH: "Matching",
  TYPE_ANSWER: "Type answer",
  FILL_BLANK: "Fill in the blank",
  FLASHCARDS: "Flashcards",
  RANGE: "Range",
  GUESS: "Guess",
  TAP_FIND: "Tap to find",
};

export function QuizQuestionCard({
  question,
  index,
  showAnswers,
}: QuizQuestionCardProps) {
  const hasTimeLimit =
    question.timeLimitSeconds != null &&
    question.timeLimitSeconds > 0;

  return (
    <article className="overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/25">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/20 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
            {index + 1}
          </span>

          <Badge variant="secondary" className="font-normal">
            {QUESTION_TYPES[question.type]}
          </Badge>
        </div>

        <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
          {hasTimeLimit && (
            <span className="flex items-center gap-1.5">
              <IconClock className="size-3.5" />
              {question.timeLimitSeconds}s
            </span>
          )}

          <span className="font-medium tabular-nums">
            {question.points} {question.points === 1 ? "point" : "points"}
          </span>
        </div>
      </header>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="space-y-1.5">
          <h3
            className="text-sm font-semibold leading-6 sm:text-base"
            dangerouslySetInnerHTML={{ __html: question.title }}
          />

          {question.description && (
            <p className="text-sm leading-6 text-muted-foreground">
              {question.description}
            </p>
          )}
        </div>

        <QuestionTypeRenderer
          question={question}
          showAnswers={showAnswers}
        />
      </div>
    </article>
  );
}

function QuestionTypeRenderer({
  question,
  showAnswers,
}: {
  question: QuizQuestion;
  showAnswers: boolean;
}) {
  switch (question.type) {
    case "SINGLE_SELECT":
      return (
        <SingleSelectQuestion
          data={question.data}
          showAnswers={showAnswers}
        />
      );

    case "MULTIPLE_SELECT":
      return (
        <MultipleSelectQuestion
          data={question.data}
          showAnswers={showAnswers}
        />
      );

    case "TRUE_FALSE":
      return (
        <TrueFalseQuestion
          data={question.data}
          showAnswers={showAnswers}
        />
      );

    case "ORDERING":
      return (
        <OrderingQuestion
          data={question.data}
          showAnswers={showAnswers}
        />
      );

    case "MATCH":
      return (
        <MatchQuestion
          data={question.data}
          showAnswers={showAnswers}
        />
      );

    case "TYPE_ANSWER":
      return (
        <TypeAnswerQuestion
          data={question.data}
          showAnswers={showAnswers}
        />
      );

    case "FILL_BLANK":
      return (
        <FillBlankQuestion
          data={question.data}
          showAnswers={showAnswers}
        />
      );

    case "FLASHCARDS":
      return (
        <FlashcardsQuestion
          data={question.data}
          showAnswers={showAnswers}
        />
      );

    case "RANGE":
      return (
        <RangeQuestion
          data={question.data}
          showAnswers={showAnswers}
        />
      );

    case "GUESS":
      return (
        <GuessQuestion
          data={question.data}
          showAnswers={showAnswers}
        />
      );

    case "TAP_FIND":
      return (
        <TapFindQuestion
          data={question.data}
          showAnswers={showAnswers}
        />
      );

  }
}
