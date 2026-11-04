"use client";

import { useShallow } from "zustand/react/shallow";

import { useRuntimeStore } from "./runtime-store";
import { GameplayAction } from "../types/runtime-types";
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
      currentView: state.currentView,
      startedAt: state.startedAt,
      lastActivityAt: state.lastActivityAt,
      pausedAt: state.pausedAt,
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
      currentView: state.currentView
    })),
  );
}

export function useRuntimeActionBar() {
  const { currentQuestionIndex, questions, status, mode } = useRuntimeStore(
    useShallow((state) => ({
      currentQuestionIndex: state.currentQuestionIndex,
      questions: state.questions,
      status: state.status,
      mode: state.mode,
    })),
  );

  const currentQuestion = questions[currentQuestionIndex];

  const isCompleted = status === "COMPLETED";
  const isAnswered = !!currentQuestion?.answer;
  const isEvaluated = currentQuestion?.evaluation?.status === "EVALUATED";
  const isLocked = !!currentQuestion?.locked;

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const isReviewMode = mode === "REVIEW";
  const isTimerMode = mode === "TIMED";

  let actions: GameplayAction[] = [];

  if (isCompleted) {
    actions = ["RESULTS"];
  } else if (isReviewMode) {
    if (isEvaluated) {
      actions = isLastQuestion ? ["FINISH"] : ["NEXT"];
    } else if (isAnswered) {
      actions = [
        "SUBMIT",
        ...(isLastQuestion ? (["FINISH"] as const) : (["NEXT"] as const)),
      ];
    } else {
      actions = isLastQuestion ? ["FINISH"] : ["PASS"];
    }
  } else {
    if (isLocked || isEvaluated) {
      actions = isLastQuestion ? ["FINISH"] : ["NEXT"];
    } else if (isAnswered) {
      actions = ["SUBMIT"];
    } else {
      actions = [];
    }
  }

  return {
    mode,
    currentQuestionId: currentQuestion?.id ?? null,
    isFirstQuestion,
    isLastQuestion,
    isAnswered,
    isEvaluated,
    isFlagged: currentQuestion?.flagged ?? false,
    isLocked,
    isCompleted,
    isTimerMode,
    isReviewMode,
    answer: currentQuestion?.answer ?? null,
    actions,
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

export const useRuntimePhase = () => useRuntimeStore((state) => state.phase);

export const useRuntimeActions = () =>
  useRuntimeStore(
    useShallow((state) => ({
      initializeAttempt: state.initializeAttempt,
      hydrateAttempt: state.hydrateAttempt,
      clearAttempt: state.clearAttempt,

      setStatus: state.setStatus,
      setPhase: state.setPhase,
      setCurrentView: state.setCurrentView,
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

      timeoutQuestion: state.timeoutQuestion,

      markFeedbackAsSeen: state.markFeedbackAsSeen,

      setError: state.setError,
      clearError: state.clearError,

      reset: state.reset,
    })),
  );
