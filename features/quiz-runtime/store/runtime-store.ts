import { create } from "zustand";

import {
  defaultRuntimeFeedback,
  defaultRuntimePersistence,
  defaultRuntimeState,
  defaultRuntimeSubmission,
  type RuntimeStore,
} from "./runtime-store.types";

import type { Answer } from "../types/answer-types";
import type {
  AttemptSettings,
  QuizAttemptRuntime,
  RuntimeEnvironment,
  RuntimePhase,
  RuntimeProgress,
  RuntimeQuestion,
  RuntimeQuestionStatus,
  RuntimeSaveStatus,
  RuntimeStatus,
  RuntimeTimerState,
  SessionMode,
} from "../types/runtime-types";

export const useRuntimeStore = create<RuntimeStore>()((set, get) => ({
  ...defaultRuntimeState,

  initializeAttempt: (attempt: QuizAttemptRuntime) =>
    set({
      attemptId: attempt.id,
      quizId: attempt.quizId,
      quizSnapshot: attempt.quizSnapshot,
      environment: attempt.environment,
      mode: attempt.settings.mode,
      settings: attempt.settings,
      status: attempt.status,
      phase: attempt.phase,
      startedAt: attempt.startedAt,
      lastActivityAt: attempt.lastActivityAt,
      pausedAt: attempt.pausedAt,
      completedAt: attempt.completedAt,
      expiresAt: attempt.expiresAt,
      questions: attempt.questions,
      progress: attempt.progress,

      timer: attempt.timer,
      feedback: defaultRuntimeFeedback,
      submission: {
        ...defaultRuntimeSubmission,
        submittedAt: attempt.completedAt,
      },
      persistence: {
        ...defaultRuntimePersistence,
        saveStatus: attempt.saveStatus ?? "IDLE",
        dirty: false,
      },
      error: null,
    }),

  hydrateAttempt: (attempt: QuizAttemptRuntime) =>
    get().initializeAttempt(attempt),

  clearAttempt: () => set(defaultRuntimeState),

  setEnvironment: (environment: RuntimeEnvironment) => set({ environment }),

  setMode: (mode: SessionMode) => set({ mode }),

  setSettings: (settings: AttemptSettings) =>
    set({
      settings,
      mode: settings.mode,
    }),

  setStatus: (status: RuntimeStatus) => set({ status }),

  setPhase: (phase: RuntimePhase) => set({ phase }),

  startAttempt: (startedAt) =>
    set((state) => ({
      status: "IN_PROGRESS",
      phase: "QUESTION",
      startedAt,
      lastActivityAt: startedAt,
      pausedAt: null,
      completedAt: null,
      timer: {
        ...state.timer,
        isAttemptTimerRunning: state.settings?.totalTimerEnabled ?? false,
      },
    })),

  pauseAttempt: (pausedAt) =>
    set((state) => ({
      status: "PAUSED",
      phase: "PAUSED",
      pausedAt,
      lastActivityAt: pausedAt,
      timer: {
        ...state.timer,
        isQuestionTimerRunning: false,
        isAttemptTimerRunning: false,
      },
    })),

  resumeAttempt: (resumedAt) =>
    set((state) => ({
      status: "IN_PROGRESS",
      phase: "QUESTION",
      pausedAt: null,
      lastActivityAt: resumedAt,
      timer: {
        ...state.timer,
        isQuestionTimerRunning: state.timer.questionDeadlineAt !== null,
        isAttemptTimerRunning: state.timer.attemptDeadlineAt !== null,
      },
    })),

  completeAttempt: (completedAt) =>
    set((state) => ({
      status: "COMPLETED",
      phase: "RESULT",
      completedAt,
      lastActivityAt: completedAt,
      timer: {
        ...state.timer,
        isQuestionTimazaaerRunning: false,
        isAttemptTimerRunning: false,
      },
      submission: {
        ...state.submission,
        isSubmitting: false,
        submittedAt: completedAt,
      },
    })),

  abandonAttempt: () =>
    set((state) => ({
      status: "ABANDONED",
      phase: "RESULT",
      lastActivityAt: Date.now(),
      timer: {
        ...state.timer,
        isQuestionTimerRunning: false,
        isAttemptTimerRunning: false,
      },
    })),

  updateLastActivity: (timestamp) => set({ lastActivityAt: timestamp }),

  setCurrentQuestion: (index) => {
    set((state) => ({
      progress: {
        ...state.progress,
        currentQuestionIndex: index,
      },
      phase: "QUESTION",
    }));
  },

  goToNextQuestion: () => {
    get().setCurrentQuestion(get().progress.currentQuestionIndex + 1);
  },

  goToPreviousQuestion: () => {
    get().setCurrentQuestion(get().progress.currentQuestionIndex - 1);
  },

  goToQuestion: (index) => get().setCurrentQuestion(index),

  toggleQuestionFlag: (questionId) =>
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === questionId
          ? { ...question, flagged: !question.flagged }
          : question,
      ),
    })),

  lockQuestion: (questionId) =>
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === questionId ? { ...question, locked: true } : question,
      ),
    })),

  unlockQuestion: (questionId) =>
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === questionId ? { ...question, locked: false } : question,
      ),
    })),

  setAnswer: (questionId: string, answer: Answer) =>
    set((state) => {
      return {
        questions: state.questions.map((question) =>
          question.id === questionId
            ? {
                ...question,
                answer,
                evaluation: null,
                status: "ANSWERED",
                isDirty: true,
                lastModifiedAt: Date.now(),
              }
            : question,
        ),
        persistence: {
          ...state.persistence,
          dirty: true,
          saveState: "PENDING",
          error: null,
        },
        lastActivityAt: Date.now(),
      };
    }),

  clearAnswer: (questionId) =>
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              answer: null,
              evaluation: null,
              status: "UNANSWERED",
              isDirty: true,
              lastModifiedAt: Date.now(),
            }
          : question,
      ),
      persistence: {
        ...state.persistence,
        dirty: true,
        saveState: "PENDING",
      },
    })),

  setAnswerEvaluation: (questionId, evaluation) =>
    set((state) => {
      return {
        questions: state.questions.map((question) =>
          question.id === questionId
            ? {
                ...question,
                evaluation,
              }
            : question,
        ),
      };
    }),

  setQuestionStatus: (questionId: string, status: RuntimeQuestionStatus) =>
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === questionId ? { ...question, status } : question,
      ),
    })),

  setProgress: (progress: Partial<RuntimeProgress>) =>
    set((state) => ({
      progress: {
        ...state.progress,
        ...progress,
      },
    })),

  recalculateProgress: () =>
    set((state) => {
      const questions = state.questions;

      const answeredQuestions = questions.filter(
        (question) => question.status === "ANSWERED",
      ).length;

      const correctAnswers = questions.filter(
        (question) => question.evaluation?.isCorrect === true,
      ).length;

      const skippedQuestions = questions.filter(
        (question) => question.status === "SKIPPED",
      ).length;

      const totalPoints = questions.reduce(
        (sum, question) => sum + question.maxPoints,
        0,
      );

      const score = questions.reduce(
        (sum, question) => sum + (question.evaluation?.earnedPoints ?? 0),
        0,
      );

      return {
        questions,
        progress: {
          ...state.progress,
          answeredQuestions,
          correctAnswers,
          skippedQuestions,
          score,
          totalPoints,
          totalQuestions: questions.length,
        },
      };
    }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  reset: () => set(defaultRuntimeState),
}));
