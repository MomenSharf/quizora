
"use client";

import {
  useRuntime,
  useRuntimeActions,
  useRuntimeCurrentQuestion,
  useRuntimePhase,
  useIsReviewOpen,
  useReviewQuestions,
} from "../store";

import type { QuizAttemptRuntime } from "../types/runtime-types";

import GamePlayActions from "./actions-bar/game-play-actions";
import GameplayPageRouter from "./gameplay-page-router";
import GamePlayHeader from "./header/game-play-header";
import { InitializeGameplay } from "./initialize-gameplay";
import QuestionContainer from "./question/question-container";
import QuizReadyPage from "./quiz-ready-page";

type GameplayLayoutProps = {
  attempt: QuizAttemptRuntime;
};

export default function Gameplay({ attempt }: GameplayLayoutProps) {
  return (
    <InitializeGameplay attempt={attempt}>
      <GameplayContent />
    </InitializeGameplay>
  );
}

function GameplayContent() {
  const phase = useRuntimePhase();
  const isReviewOpen = useIsReviewOpen();

  const { quizSnapshot, questionCount, status } = useRuntime();

  const {
    startAttempt,
    submitPracticeAnswer,
    completeAttempt,
    // closeReview,
  } = useRuntimeActions();

  const { runtimeCurrentQuestion } = useRuntimeCurrentQuestion();

  const review = useReviewQuestions();

  const isReady = phase === "READY";
  const isCompleted = status === "COMPLETED";

  const showActions =
    !isReady && !isReviewOpen && !isCompleted;

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      {/* Shared Header */}
      <header className="shrink-0">
        <GamePlayHeader />
      </header>

      {/* Main Pages */}
      <main className="flex min-h-0 flex-1 justify-center overflow-y-auto overscroll-contain">
        <div className="container flex min-h-full min-w-0 flex-col px-2 py-3 sm:px-6 sm:py-7 lg:px-8">
          <GameplayPageRouter
            isReady={isReady}
            isReviewOpen={isReviewOpen}
            isCompleted={isCompleted}
            ready={
              <div className="flex min-h-full w-full items-center justify-center">
                <QuizReadyPage
                  quizSnapshot={quizSnapshot}
                  questionCount={questionCount}
                  duration="No time limit"
                  onStart={() => startAttempt(Date.now())}
                />
              </div>
            }
            gameplay={<QuestionContainer />}
            review={
              <QuestionsReviewPage
                questions={review.allQuestions}
                answeredCount={review.answeredCount}
                unansweredCount={review.unansweredCount}
                markedCount={review.markedCount}
                onClose={closeReview}
              />
            }
            result={
              <QuizResultPage
                totalQuestions={review.totalCount}
                answeredCount={review.answeredCount}
                markedCount={review.markedCount}
              />
            }
          />
        </div>
      </main>

      {/* Gameplay Actions */}
      {showActions && (
        <footer className="shrink-0">
          <GamePlayActions
            onSubmitAnswer={() => {
              if (!runtimeCurrentQuestion) return;

              submitPracticeAnswer(runtimeCurrentQuestion.id);
            }}
            onFinishAttempt={() => completeAttempt(Date.now())}
          />
        </footer>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Temporary Review Page                                                      */
/* -------------------------------------------------------------------------- */

type QuestionsReviewPageProps = {
  questions: ReturnType<typeof useReviewQuestions>["allQuestions"];
  answeredCount: number;
  unansweredCount: number;
  markedCount: number;
  onClose: () => void;
};

function QuestionsReviewPage({
  questions,
  answeredCount,
  unansweredCount,
  markedCount,
  onClose,
}: QuestionsReviewPageProps) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Review Questions
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review your answers and marked questions.
          </p>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          Back to quiz
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <ReviewStat label="Answered" count={answeredCount} />
        <ReviewStat label="Unanswered" count={unansweredCount} />
        <ReviewStat label="Marked" count={markedCount} />
      </div>

      {/* Questions */}
      <div className="space-y-2">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="flex items-center justify-between rounded-xl border bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
                {index + 1}
              </span>

              <div>
                <p className="text-sm font-medium">
                  Question {index + 1}
                </p>

                <p className="text-xs text-muted-foreground">
                  {question.status}
                </p>
              </div>
            </div>

            {question.flagged && (
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600">
                Marked
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewStat({
  label,
  count,
}: {
  label: string;
  count: number;
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-2xl font-bold tabular-nums">{count}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Temporary Result Page                                                      */
/* -------------------------------------------------------------------------- */

function QuizResultPage({
  totalQuestions,
  answeredCount,
  markedCount,
}: {
  totalQuestions: number;
  answeredCount: number;
  markedCount: number;
}) {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 py-10 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
        <span className="text-3xl">✓</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Quiz Completed!
        </h1>

        <p className="text-muted-foreground">
          You've completed your quiz. Here's a quick overview.
        </p>
      </div>

      <div className="grid w-full grid-cols-3 gap-3">
        <ReviewStat label="Total" count={totalQuestions} />
        <ReviewStat label="Answered" count={answeredCount} />
        <ReviewStat label="Marked" count={markedCount} />
      </div>
    </section>
  );
}
