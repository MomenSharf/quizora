"use client";

import {
  useRuntime,
  useRuntimeActions,
  useRuntimeCurrentQuestion,
  useRuntimePhase,
} from "../store";

import type { QuizAttemptRuntime } from "../types/runtime-types";

import GamePlayActions from "./actions-bar/game-play-actions";
import GameplayViewRouter from "./gameplay-view-router";
import GamePlayHeader from "./header/game-play-header";
import { InitializeGameplay } from "./initialize-gameplay";
import GameplayQuestion from "./question/gameplay-question";
import QuestionsReview from "./questions-review";
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
  const { currentView } = useRuntime();

  const { runtimeCurrentQuestion } = useRuntimeCurrentQuestion();

  const isReviewOpen = currentView === "REVIEW";
  const isReady = currentView === "READY";
  const isCompleted = currentView === "RESULTS";

  const showActions = !isReady && !isReviewOpen && !isCompleted;

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      {/* Shared Header */}
      <header className="shrink-0">
        <GamePlayHeader />
      </header>

      {/* Main Pages */}
      <main className="flex min-h-0 flex-1 justify-center overflow-y-auto overscroll-contain">
        <div className="container flex min-h-full min-w-0 flex-col px-2 py-3 sm:px-6 sm:py-7 lg:px-8">
          <GameplayViewRouter
            ready={<QuizReadyPage />}
            question={<GameplayQuestion />}
            settings={<div />}
            review={<QuestionsReview />}
            results={<div />}
          />
        </div>
      </main>

      {/* Gameplay Actions */}
      {showActions && (
        <footer className="shrink-0">
          <GamePlayActions
            runtimeCurrentQuestion={runtimeCurrentQuestion}
          />
        </footer>
      )}
    </div>
  );
}
