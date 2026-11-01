"use client";

import { useRuntime, useRuntimeActions, useRuntimeCurrentQuestion, useRuntimePhase } from "../store";
import { QuizAttemptRuntime } from "../types/runtime-types";
import GamePlayActions from "./actions-bar/game-play-actions";
import GameplayPhaseRouter from "./gameplay-phase-router";
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
  const { quizSnapshot, questionCount , } = useRuntime();
  const { startAttempt , submitPracticeAnswer} = useRuntimeActions();
  const {runtimeCurrentQuestion} = useRuntimeCurrentQuestion()

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
                  quizSnapshot={quizSnapshot}
                  questionCount={questionCount}
                  duration={"No time limit"}
                  onStart={() => startAttempt(Date.now())}
                />
              </div>
            }
            question={<QuestionContainer />}

            result={<div />}
          />
        </div>
      </main>

      <footer className="shrink-0">
        <GamePlayActions onSubmitAnswer={() => submitPracticeAnswer(runtimeCurrentQuestion.id)} />
      </footer>
    </div>
  );
}
