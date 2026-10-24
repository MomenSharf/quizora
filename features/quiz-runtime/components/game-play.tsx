"use client";

import { QuizAttemptRuntime } from "../types/runtime-types";
import {
  useRuntime,
  useRuntimeActions,
  useRuntimePhase,
  useRuntimeStore,
  useRuntimeTimer,
} from "../store";
import { InitializeGameplay } from "./initialize-gameplay";
import GamePlayHeader from "./header/game-play-header";
import GamePlayActions from "./actions-bar/game-play-actions";
import QuestionContainer from "./question/question-container";
import GameplayPhaseRouter from "./gameplay-phase-router";
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
  const { setPhase } = useRuntimeActions();

  const { quizTitle, quizDescription, questionsCount } = useRuntime();
  const timer = useRuntimeTimer();

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <header className="shrink-0">
        <GamePlayHeader />
      </header>

      <main className="flex min-h-0 flex-1 justify-center overflow-y-auto overscroll-contain">
        <div className="container flex min-h-full min-w-0 flex-col px-2 py-3 sm:px-6 sm:py-7 lg:px-8">
          <GameplayPhaseRouter
            phase={phase}
            ready={
              <div className="flex justify-center items-center w-full h-full">
                <QuizReadyPage
                  quizTitle={quizTitle ?? "Untitled quiz"}
                  description={quizDescription}
                  questionCount={questionsCount}
                  duration={
                    timer.isAttemptTimerRunning ? "10 minutes" : "No time limit"
                  }
                  onStart={() => setPhase("QUESTION")}
                />
              </div>
            }
            question={<QuestionContainer />}
            submitting={<div />}
            feedback={<div />}
            paused={<div />}
            result={<div />}
          />
        </div>
      </main>

      <footer className="shrink-0">
        <GamePlayActions />
      </footer>
    </div>
  );
}
