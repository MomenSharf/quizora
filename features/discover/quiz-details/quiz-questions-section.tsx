
"use client";

import { useState } from "react";
import {
  IconBook2,
  IconCheck,
  IconEye,
  IconEyeOff,
  IconListCheck,
  IconStar,
} from "@tabler/icons-react";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { QuizQuestionCard } from "./quiz-question-card";

interface QuizQuestionsSectionProps {
  questions: {
    id: string;
    type: string;
    title: string;
    description: string | null;
    image: unknown;
    points: number;
    timeLimitSeconds: number | null;
    orderIndex: number;
  }[];
  totalPoints: number;
}

export function QuizQuestionsSection({
  questions,
  totalPoints,
}: QuizQuestionsSectionProps) {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <IconListCheck className="size-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight">
              Questions
            </h2>
            <Badge variant="secondary">
              {questions.length}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            Explore the questions included in this quiz.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border bg-card px-4 py-3 sm:justify-start">
          <div className="flex items-center gap-2.5">
            {showAnswers ? (
              <IconEye className="size-4 text-primary" />
            ) : (
              <IconEyeOff className="size-4 text-muted-foreground" />
            )}

            <div className="space-y-0.5">
              <Label
                htmlFor="show-answers"
                className="cursor-pointer text-sm font-medium"
              >
                Show answers
              </Label>
              <p className="text-xs text-muted-foreground">
                {showAnswers ? "Answers are visible" : "Answers are hidden"}
              </p>
            </div>
          </div>

          <Switch
            id="show-answers"
            checked={showAnswers}
            onCheckedChange={setShowAnswers}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <IconBook2 className="size-3.5" />
          {questions.length} questions
        </span>

        <span className="flex items-center gap-1.5">
          <IconStar className="size-3.5" />
          {totalPoints} total points
        </span>
      </div>

      {questions.length > 0 ? (
      <div className="space-y-3">
    {/* {questions.map((question, index) => (
      <QuizQuestionCard
        key={question.id}
        question={question}
        index={index}
        showAnswers={showAnswers}
      />
    ))} */}
  </div>

      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-muted">
            <IconBook2 className="size-6 text-muted-foreground" />
          </div>

          <h3 className="font-semibold">No questions yet</h3>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            This quiz doesn&apos;t have any questions available yet.
          </p>
        </div>
      )}
    </section>
  );
}
