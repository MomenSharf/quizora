"use client";

import { useRouter } from "next/navigation";
import {
  useRuntime,
  useRuntimeActions,
  useRuntimeCurrentQuestion,
} from "../store";

import type {
  QuizAttemptRuntime,
  RuntimeEnvironment,
} from "../types/runtime-types";

import GamePlayActions from "./actions-bar/game-play-actions";
import GameplayViewRouter from "./gameplay-view-router";
import GamePlayHeader from "./header/game-play-header";
import GameplayQuestion from "./question/gameplay-question";
import QuestionsReview from "./questions-review";
import QuizReadyPage from "./quiz-ready-page";
import ResultsPage from "./results-page";
import { RuntimeProvider } from "./runtime-provider";

type GameplayLayoutProps = {
  attempt: QuizAttemptRuntime;
};

export default function Gameplay({ attempt}: GameplayLayoutProps) {
  return (
    <RuntimeProvider attempt={attempt}>
      <GameplayContent />
    </RuntimeProvider>
  );
}
function GameplayContent() {
  const { currentView } = useRuntime();

  const { runtimeCurrentQuestion } = useRuntimeCurrentQuestion();
  const { startAttempt } = useRuntimeActions();

  const isReviewOpen = currentView === "REVIEW";
  const isReady = currentView === "READY";
  const isCompleted = currentView === "RESULTS";

  const showActions = !isReady && !isReviewOpen && !isCompleted;

  const router = useRouter();

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      {/* Shared Header */}
      <header className="shrink-0">
        <GamePlayHeader />
      </header>

      {/* Main Pages */}
      <main className="flex min-h-0 flex-1 justify-center overflow-y-auto overscroll-contain">
        <div className="container flex min-h-full min-w-0">
          <GameplayViewRouter
            ready={<QuizReadyPage />}
            question={<GameplayQuestion />}
            review={<QuestionsReview />}
            results={
              <ResultsPage
                onDashboard={() => {
                  router.push("/");
                }}
                onRetry={() => {
                  startAttempt(new Date());
                }}
              />
            }
          />
        </div>
      </main>

      {/* Gameplay Actions */}
      {showActions && (
        <footer className="shrink-0">
          <GamePlayActions runtimeCurrentQuestion={runtimeCurrentQuestion} />
        </footer>
      )}
    </div>
  );
}
