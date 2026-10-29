"use client";

import { Button } from "@/components/ui/button";
import {
  useAnswerByQuestionId,
  useRuntimeActions,
  useRuntimePhase,
} from "@/features/quiz-runtime/store";
import type { RuntimeQuestion } from "@/features/quiz-runtime/types/runtime-types";
import { Check, CheckCircle2, ArrowRight, LockKeyhole } from "lucide-react";
import { QuestionContentRouterProps } from "../question-content-router";
import { EvaluationResult } from "@/features/quiz-runtime/types/evaluation-types";

export default function SingleSelectContent({
  runtimeQuestion,
  isLocked,
  isSubmitted,
}: QuestionContentRouterProps) {
  const { question, maxPoints } = runtimeQuestion;
  const answerState = useAnswerByQuestionId(question.id);
  const { setAnswer, lockQuestion, setAnswerEvaluation } = useRuntimeActions();

  if (question.type !== "SINGLE_SELECT") return null;

  const { options, correctOptionId } = question.content;
  const answer = answerState?.answer ?? null;

  const selectedOptionId =
    answer?.type === "SINGLE_SELECT" ? answer.optionId : null;

  const isCorrect = selectedOptionId === correctOptionId;

  

  const handleSelect = (optionId: string) => {
    if (isLocked || selectedOptionId === optionId) return;
    const answeredAt = new Date().getTime();
    setAnswer(question.id, {
      type: "SINGLE_SELECT",
      questionId: question.id,
      optionId,
      answeredAt,
      timeSpentSeconds: 0,
    });
  };

  const handleSubmit = () => {
    if (!selectedOptionId || isLocked) return;

    const correct = selectedOptionId === correctOptionId;
    const evaluation: EvaluationResult = {
      isCorrect: correct,
      earnedPoints: correct ? maxPoints : 0,
      maxPoints,
      status: "EVALUATED" as const,
      outcome: correct ? ("CORRECT" as const) : ("INCORRECT" as const),
      evaluatedAt: new Date().getTime(),
      parts: [],
      visibility: {
        showCorrectAnswer: true,
        showEarnedPoints: true,
        showExplanation: true,
        showFeedback: true,
      },
      accuracy: null,
      feedback: null,
      explanation: null,
    };

    lockQuestion(question.id);
    setAnswerEvaluation(question.id, evaluation);
    // showFeedback(question.id, evaluation);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-2.5 sm:grid-cols-2">
        {options.map((option, index) => {
          const selected = selectedOptionId === option.id;
          const correct = isSubmitted && option.id === correctOptionId;
          const incorrect = isSubmitted && selected && !correct;

          return (
            <button
              key={option.id}
              type="button"
              disabled={isLocked}
              onClick={() => handleSelect(option.id)}
              aria-pressed={selected}
              className={[
                "group flex min-h-14 items-center gap-3 rounded-xl border p-3 text-left",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                "disabled:cursor-not-allowed",
                correct
                  ? "border-emerald-500 bg-emerald-500/10"
                  : incorrect
                    ? "border-destructive bg-destructive/5"
                    : selected
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border bg-card hover:border-primary/40 hover:bg-muted/40",
              ].join(" ")}
            >
              <span
                className={[
                  "flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors",
                  correct
                    ? "bg-emerald-500 text-white"
                    : incorrect
                      ? "bg-destructive text-destructive-foreground"
                      : selected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10",
                ].join(" ")}
              >
                {correct ? (
                  <Check size={16} />
                ) : incorrect ? (
                  "×"
                ) : (
                  String.fromCharCode(65 + index)
                )}
              </span>

              <span className="flex-1 text-sm font-medium leading-relaxed">
                {option.text}
              </span>

              {selected && !isSubmitted && (
                <span className="size-2 shrink-0 rounded-full bg-primary" />
              )}

              {correct && (
                <CheckCircle2
                  className="size-4 shrink-0 text-emerald-600"
                  aria-label="Correct answer"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-3">
        {isSubmitted ? (
          <div
            className={[
              "flex items-center gap-2 text-sm font-medium",
              isCorrect ? "text-emerald-600" : "text-destructive",
            ].join(" ")}
            role="status"
          >
            {isCorrect ? (
              <CheckCircle2 className="size-4" />
            ) : (
              <LockKeyhole className="size-4" />
            )}
            {isCorrect ? "Correct answer!" : "Answer revealed"}
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">
            {selectedOptionId ? "Ready to check" : "Choose an answer"}
          </span>
        )}

        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={!selectedOptionId || isLocked}
          className="h-9 gap-2 rounded-lg px-4 shadow-sm"
        >
          {isSubmitted ? (
            <>
              Answer checked
              <Check className="size-4" />
            </>
          ) : (
            <>
              Check answer
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
