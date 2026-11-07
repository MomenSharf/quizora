"use client";

import { useShallow } from "zustand/react/shallow";

import { useMemo } from "react";
import { GameplayAction } from "../types/runtime-types";
import { useRuntimeStore } from "./runtime-store";

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
      currentView: state.currentView,
      startedAt: state.startedAt,
      lastActivityAt: state.lastActivityAt,
      completedAt: state.completedAt,
      expiresAt: state.expiresAt,
      questions: state.questions,
    })),
  );

export const useRuntimeCurrentQuestion = () =>
  useRuntimeStore(
    useShallow((state) => {
      const { questions, currentQuestionIndex } = state;
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
      currentQuestionIndex: state.currentQuestionIndex + 1,
      totalQuestions: state.questions.length,
      phase: state.phase,
      currentView: state.currentView,
      mode: state.mode,
      keyboardShortcutsEnabled: state.settings.keyboardShortcutsEnabled,
      setKeyboardShortcutsEnabled: state.setKeyboardShortcutsEnabled,
    })),
  );
}

export function useRuntimeActionBar() {
  const {
    currentQuestionIndex,
    questions,
    status,
    mode,
    keyboardShortcutsEnabled,
    settings,
  } = useRuntimeStore(
    useShallow((state) => ({
      currentQuestionIndex: state.currentQuestionIndex,
      questions: state.questions,
      status: state.status,
      mode: state.mode,
      keyboardShortcutsEnabled: state.settings.keyboardShortcutsEnabled,
      settings: state.settings,
    })),
  );

  const currentQuestion = questions[currentQuestionIndex];

  const isCompleted = status === "COMPLETED";
  const isClassic = mode === "CLASSIC";
  const isTest = mode === "TEST";

  const isAnswered = currentQuestion?.answer != null;
  const isEvaluated = currentQuestion?.evaluation?.status === "EVALUATED";
  const isLocked = currentQuestion?.locked ?? false;
  const isTimedOut = currentQuestion.status === "TIMED_OUT";

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const isFlagged = currentQuestion?.flagged ?? false;

  const reviewEnabled = mode === "TEST" && !settings.timeLimitEnabled;

  let actions: GameplayAction[] = [];

  if (isCompleted) {
    actions = ["RESULTS"];
  } else if (isClassic) {
    if (isEvaluated || isLocked) {
      actions = isLastQuestion ? ["FINISH"] : ["NEXT"];
    } else if (isAnswered) {
      actions = ["SUBMIT"];
    } else {
      actions = ["SUBMIT_DISABLED"];
    }
  } else if (isTest) {
    if (isLastQuestion) {
      actions = ["FINISH"];
    } else {
      if (reviewEnabled) {
        actions = isAnswered ? ["NEXT"] : ["PASS"];
      } else {
        actions = isAnswered || isTimedOut ? ["NEXT"] : ["NEXT_DISABLED"];
      }
    }
  }

  return {
    reviewEnabled,

    questions,
    mode,

    currentQuestionId: currentQuestion?.id ?? null,
    answer: currentQuestion?.answer ?? null,

    isFirstQuestion,
    isLastQuestion,
    isAnswered,
    isEvaluated,
    isFlagged,
    isLocked,
    isCompleted,

    isClassic,
    isTest,

    actions,

    keyboardShortcutsEnabled,
  };
}

export function useReviewQuestions() {
  const questions = useRuntimeStore((state) => state.questions);

  return useMemo(() => {
    const allQuestions = questions;

    const answeredQuestions = allQuestions.filter(
      (q) => q.status === "ANSWERED",
    );

    const unansweredQuestions = allQuestions.filter(
      (q) => q.status === "UNANSWERED" || q.status === "TIMED_OUT",
    );

    const markedQuestions = allQuestions.filter((q) => q.flagged);

    return {
      allQuestions,
      answeredQuestions,
      unansweredQuestions,
      markedQuestions,
      totalCount: allQuestions.length,
      answeredCount: answeredQuestions.length,
      unansweredCount: unansweredQuestions.length,
      markedCount: markedQuestions.length,
    };
  }, [questions]);
}

export function useResults() {
  const { questions, settings, quizSnapshot, mode } = useRuntimeStore(
    useShallow((state) => ({
      questions: state.questions,
      settings: state.settings,
      quizSnapshot: state.quizSnapshot,
      mode: state.mode,
    })),
  );

  return useMemo(() => {
    const allQuestions = questions;

    const correctQuestions = allQuestions.filter(
      (q) => q.evaluation?.outcome === "CORRECT",
    );

    const partiallyCorrectQuestions = allQuestions.filter(
      (q) => q.evaluation?.outcome === "PARTIALLY_CORRECT",
    );

    const incorrectQuestions = allQuestions.filter(
      (q) => q.evaluation?.outcome === "INCORRECT",
    );

    const unansweredQuestions = allQuestions.filter(
      (q) => q.status === "UNANSWERED" || q.status === "TIMED_OUT",
    );

    const answeredQuestions = allQuestions.filter(
      (q) => q.status === "ANSWERED",
    );

    const timedOutQuestions = allQuestions.filter(
      (q) => q.status === "TIMED_OUT",
    );

    const evaluatedQuestions = allQuestions.filter(
      (q) => q.evaluation?.status === "EVALUATED",
    );

    const totalCount = allQuestions.length;
    const correctCount = correctQuestions.length;
    const partiallyCorrectCount = partiallyCorrectQuestions.length;
    const incorrectCount = incorrectQuestions.length;
    const answeredCount = answeredQuestions.length;
    const unansweredCount = unansweredQuestions.length;
    const timedOutCount = timedOutQuestions.length;
    const evaluatedCount = evaluatedQuestions.length;

    const earnedPoints = allQuestions.reduce(
      (total, q) => total + (q.earnedPoints ?? 0),
      0,
    );

    const maxPoints = allQuestions.reduce(
      (total, q) => total + (q.maxPoints ?? 0),
      0,
    );

    const percentage =
      maxPoints > 0 ? Math.round((earnedPoints / maxPoints) * 100) : 0;

    const accuracy =
      evaluatedCount > 0
        ? Math.round(
            ((correctCount + partiallyCorrectCount * 0.5) / evaluatedCount) *
              100,
          )
        : 0;

    const timeSpentSeconds = allQuestions.reduce(
      (total, q) => total + (q.timeSpentSeconds ?? 0),
      0,
    );

    const formattedDuration = (() => {
      const minutes = Math.floor(timeSpentSeconds / 60);
      const seconds = timeSpentSeconds % 60;

      if (minutes === 0) return `${seconds}s`;

      return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
    })();

    const performance =
      percentage >= 90
        ? {
            label: "Outstanding!",
            description: "Excellent work! You've mastered this quiz.",
            color: "emerald" as const,
          }
        : percentage >= 75
          ? {
              label: "Great job!",
              description: "You're doing really well. Keep it up!",
              color: "emerald" as const,
            }
          : percentage >= 50
            ? {
                label: "Good effort!",
                description: "You're making progress. Keep practicing!",
                color: "amber" as const,
              }
            : {
                label: "Keep learning!",
                description: "Every attempt is a chance to improve.",
                color: "rose" as const,
              };

    const isTest = mode === "TEST";
    const isClassic = mode === "CLASSIC";
    const timerEnabled = settings.timeLimitEnabled;

    return {
      quizSnapshot,
      settings,

      allQuestions,
      answeredQuestions,
      unansweredQuestions,
      correctQuestions,
      partiallyCorrectQuestions,
      incorrectQuestions,
      timedOutQuestions,
      evaluatedQuestions,

      totalCount,
      answeredCount,
      unansweredCount,
      correctCount,
      partiallyCorrectCount,
      incorrectCount,
      timedOutCount,
      evaluatedCount,

      earnedPoints,
      maxPoints,
      percentage,
      accuracy,

      timeSpentSeconds,
      formattedDuration,

      performance,

      isTest,
      isClassic,
      timerEnabled,
    };
  }, [questions, mode, settings, quizSnapshot]);
}

export const useRuntimePersistence = () =>
  useRuntimeStore((state) => state.persistence);

export const useRuntimePersistenceActions = () =>
  useRuntimeStore((state) => ({
    markDirty: state.markDirty,
    setSaveStatus: state.setSaveStatus,
    setPersistenceError: state.setPersistenceError,
    setLastAttemptAt: state.setLastAttemptAt,
    markSaved: state.markSaved,
  }));

export const useRuntimePhase = () => useRuntimeStore((state) => state.phase);

export const useRuntimeActions = () =>
  useRuntimeStore(
    useShallow((state) => ({
      initializeAttempt: state.initializeAttempt,
      hydrateAttempt: state.hydrateAttempt,

      setStatus: state.setStatus,
      setPhase: state.setPhase,
      setCurrentView: state.setCurrentView,
      startAttempt: state.startAttempt,
      resumeAttempt: state.resumeAttempt,
      completeAttempt: state.completeAttempt,

      setCurrentQuestion: state.setCurrentQuestion,
      goToNextQuestion: state.goToNextQuestion,
      goToPreviousQuestion: state.goToPreviousQuestion,
      toggleQuestionFlag: state.toggleQuestionFlag,
      lockQuestion: state.lockQuestion,
      unlockQuestion: state.unlockQuestion,

      setAnswer: state.setAnswer,
      clearAnswer: state.clearAnswer,
      submitPracticeAnswer: state.submitPracticeAnswer,
      submitTestAnswer: state.submitTestAnswer,

      timeoutQuestion: state.timeoutQuestion,

      markFeedbackAsSeen: state.markFeedbackAsSeen,

      reset: state.reset,

      setKeyboardShortcutsEnabled: state.setKeyboardShortcutsEnabled,
    })),
  );
