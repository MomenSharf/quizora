"use client";

import { useShallow } from "zustand/react/shallow";

import { useRuntimeStore } from "./runtime-store";
import { useMemo } from "react";

export const useRuntime = () =>
  useRuntimeStore(
    useShallow((state) => ({
      attemptId: state.attemptId,
      quizId: state.quizId,
      quizSnapshot: state.quizSnapshot,
      questionCount: state.questions.length,
      environment: state.environment,
      mode: state.mode,
      settings: state.settings,
      status: state.status,
      phase: state.phase,
      startedAt: state.startedAt,
      lastActivityAt: state.lastActivityAt,
      pausedAt: state.pausedAt,
      completedAt: state.completedAt,
      expiresAt: state.expiresAt,
    })),
  );

export const useRuntimeCurrentQuestion = () =>
  useRuntimeStore(
    useShallow((state) => {
      const { questions, progress } = state;
      const { currentQuestionIndex } = progress;
      const runtimeCurrentQuestion = questions[currentQuestionIndex] ?? null;

      return {
        runtimeCurrentQuestion,
        currentQuestionIndex,
      };
    }),
  );

export function useRuntimeHeader() {
  return useRuntimeStore(
    useShallow((state) => ({
      title: state.quizSnapshot.title,
      mode: state.mode,
      currentQuestionIndex: state.progress.currentQuestionIndex + 1,
      totalQuestions: state.questions.length,
      phase: state.phase
    })),
  );
}


export function useRuntimeActionBar() {
  const { currentQuestionIndex, questions } = useRuntimeStore(
    useShallow((state) => ({
      currentQuestionIndex: state.progress.currentQuestionIndex,
      questions: state.questions,
    })),
  );

  const currentQuestion = questions[currentQuestionIndex];
  const isEvaluated = currentQuestion?.evaluation?.status === "EVALUATED";

  const nextAction = !isEvaluated
    ? "Pass"
    : currentQuestionIndex === questions.length - 1
      ? "Finish"
      : "Next";

  return {
    currentQuestionId: currentQuestion?.id ?? null,
    isFirstQuestion: currentQuestionIndex === 0,
    isLastQuestion: currentQuestionIndex === questions.length - 1,
    isFlagged: currentQuestion?.flagged ?? false,
    nextAction,
  };
}

export const useRuntimePhase = () => useRuntimeStore((state) => state.phase);

export const useRuntimeActions = () =>
  useRuntimeStore(
    useShallow((state) => ({
      initializeAttempt: state.initializeAttempt,
      hydrateAttempt: state.hydrateAttempt,
      clearAttempt: state.clearAttempt,

      setStatus: state.setStatus,
      setPhase: state.setPhase,
      startAttempt: state.startAttempt,
      pauseAttempt: state.pauseAttempt,
      resumeAttempt: state.resumeAttempt,
      completeAttempt: state.completeAttempt,
      abandonAttempt: state.abandonAttempt,
      updateLastActivity: state.updateLastActivity,

      setCurrentQuestion: state.setCurrentQuestion,
      goToNextQuestion: state.goToNextQuestion,
      goToPreviousQuestion: state.goToPreviousQuestion,
      goToQuestion: state.goToQuestion,
      toggleQuestionFlag: state.toggleQuestionFlag,
      lockQuestion: state.lockQuestion,
      unlockQuestion: state.unlockQuestion,

      setAnswer: state.setAnswer,
      clearAnswer: state.clearAnswer,
      setAnswerEvaluation: state.setAnswerEvaluation,
      submitPracticeAnswer: state.submitPracticeAnswer,

      setProgress: state.setProgress,
      recalculateProgress: state.recalculateProgress,

      setError: state.setError,
      clearError: state.clearError,

      reset: state.reset,
    })),
  );
