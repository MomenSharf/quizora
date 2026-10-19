import { create } from "zustand";

import {
  defaultRuntimeFeedback,
  defaultRuntimeLoading,
  defaultRuntimePersistence,
  defaultRuntimeQuestionState,
  defaultRuntimeState,
  defaultRuntimeSubmission,
  type RuntimeAnswerState,
  type RuntimeLoadingState,
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
      quizTitle: attempt.quizTitle,
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
      answers: Object.fromEntries(
        attempt.questions.map((question) => [
          question.id,
          {
            questionId: question.id,
            answer: question.answer,
            evaluation: question.evaluation,
            status: question.status,
            isDirty: false,
            lastModifiedAt: question.answeredAt,
          },
        ]),
      ),
      progress: attempt.progress,
      questionState: {
        ...defaultRuntimeQuestionState,
        currentIndex: attempt.progress.currentQuestionIndex,
        visitedQuestionIds: attempt.questions[
          attempt.progress.currentQuestionIndex
        ]
          ? [attempt.questions[attempt.progress.currentQuestionIndex].id]
          : [],
      },
      timer: attempt.timer,
      feedback: defaultRuntimeFeedback,
      submission: {
        ...defaultRuntimeSubmission,
        submittedAt: attempt.completedAt,
      },
      persistence: {
        ...defaultRuntimePersistence,
        saveState: attempt.saveStatus ?? "IDLE",
        dirty: false,
      },
      loading: defaultRuntimeLoading,
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
      phase: "FINISHED",
      completedAt,
      lastActivityAt: completedAt,
      timer: {
        ...state.timer,
        isQuestionTimerRunning: false,
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
      phase: "FINISHED",
      lastActivityAt: Date.now(),
      timer: {
        ...state.timer,
        isQuestionTimerRunning: false,
        isAttemptTimerRunning: false,
      },
    })),

  updateLastActivity: (timestamp) => set({ lastActivityAt: timestamp }),

  setQuestions: (questions: RuntimeQuestion[]) =>
    set((state) => ({
      questions,
      progress: {
        ...state.progress,
        totalQuestions: questions.length,
        totalPoints: questions.reduce(
          (total, question) => total + (question.evaluation?.maxPoints ?? 0),
          0,
        ),
      },
    })),

  setCurrentQuestion: (index) => {
    const { questions } = get();

    if (index < 0 || index >= questions.length) return;

    const question = questions[index];

    set((state) => ({
      questionState: {
        ...state.questionState,
        currentIndex: index,
        visitedQuestionIds: state.questionState.visitedQuestionIds.includes(
          question.id,
        )
          ? state.questionState.visitedQuestionIds
          : [...state.questionState.visitedQuestionIds, question.id],
      },
      progress: {
        ...state.progress,
        currentQuestionIndex: index,
      },
      feedback:
        state.feedback.questionId === question.id
          ? state.feedback
          : defaultRuntimeFeedback,
      phase: "QUESTION",
    }));
  },

  goToNextQuestion: () => {
    const { questionState, questions } = get();
    get().setCurrentQuestion(questionState.currentIndex + 1);
    if (questionState.currentIndex >= questions.length - 1) return;
  },

  goToPreviousQuestion: () => {
    get().setCurrentQuestion(get().questionState.currentIndex - 1);
  },

  goToQuestion: (index) => get().setCurrentQuestion(index),

  markQuestionVisited: (questionId) =>
    set((state) => ({
      questionState: {
        ...state.questionState,
        visitedQuestionIds: state.questionState.visitedQuestionIds.includes(
          questionId,
        )
          ? state.questionState.visitedQuestionIds
          : [...state.questionState.visitedQuestionIds, questionId],
      },
    })),

  toggleQuestionFlag: (questionId) =>
    set((state) => ({
      questionState: {
        ...state.questionState,
        flaggedQuestionIds: state.questionState.flaggedQuestionIds.includes(
          questionId,
        )
          ? state.questionState.flaggedQuestionIds.filter(
              (id) => id !== questionId,
            )
          : [...state.questionState.flaggedQuestionIds, questionId],
      },
    })),

  lockQuestion: (questionId) =>
    set((state) => ({
      questionState: {
        ...state.questionState,
        lockedQuestionIds: state.questionState.lockedQuestionIds.includes(
          questionId,
        )
          ? state.questionState.lockedQuestionIds
          : [...state.questionState.lockedQuestionIds, questionId],
      },
    })),

  unlockQuestion: (questionId) =>
    set((state) => ({
      questionState: {
        ...state.questionState,
        lockedQuestionIds: state.questionState.lockedQuestionIds.filter(
          (id) => id !== questionId,
        ),
      },
    })),

  setAnswer: (questionId: string, answer: Answer) =>
    set((state) => {
      return {
        answers: {
          ...state.answers,
          [questionId]: {
            questionId,
            answer,
            evaluation: null,
            status: "ANSWERED",
            isDirty: true,
            lastModifiedAt: Date.now(),
          },
        },
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
      answers: {
        ...state.answers,
        [questionId]: {
          questionId,
          answer: null,
          evaluation: null,
          status: "UNANSWERED",
          isDirty: true,
          lastModifiedAt: Date.now(),
        },
      },
      persistence: {
        ...state.persistence,
        dirty: true,
        saveState: "PENDING",
      },
    })),

  setAnswerEvaluation: (questionId, evaluation) =>
    set((state) => {
      const existing = state.answers[questionId];

      if (!existing) return state;

      return {
        answers: {
          ...state.answers,
          [questionId]: {
            ...existing,
            evaluation,
          },
        },
      };
    }),

  setAnswerState: (
    questionId: string,
    answerState: Partial<RuntimeAnswerState>,
  ) =>
    set((state) => {
      const existing = state.answers[questionId];

      if (!existing) return state;

      return {
        answers: {
          ...state.answers,
          [questionId]: {
            ...existing,
            ...answerState,
          },
        },
      };
    }),

markAnswerSaved: (questionId) =>
  set((state) => {
    const answers = {
      ...state.answers,
      [questionId]: {
        ...state.answers[questionId],
        isDirty: false,
      },
    };

    const dirty = Object.values(answers).some(
      (answer) => answer.isDirty,
    );

    return {
      answers,
      persistence: {
        ...state.persistence,
        dirty,
        saveState: dirty ? "PENDING" : "SAVED",
        lastSavedAt: dirty ? state.persistence.lastSavedAt : Date.now(),
        error: null,
      },
    };
  }),

  setQuestionStatus: (questionId: string, status: RuntimeQuestionStatus) =>
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === questionId ? { ...question, status } : question,
      ),
      answers: state.answers[questionId]
        ? {
            ...state.answers,
            [questionId]: {
              ...state.answers[questionId],
              status,
            },
          }
        : state.answers,
    })),

  setQuestionTimeSpent: (questionId, timeSpentSeconds) =>
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              timeSpentSeconds: Math.max(0, timeSpentSeconds),
            }
          : question,
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
      const questions = state.questions.map((question) => {
        const answerState = state.answers[question.id];

        return answerState
          ? {
              ...question,
              answer: answerState.answer,
              evaluation: answerState.evaluation,
              status: answerState.status,
            }
          : question;
      });

      const answers = state.answers;

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

      const score = Object.values(answers).reduce(
        (sum, answerState) => sum + (answerState.evaluation?.earnedPoints ?? 0),
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

  setTimer: (timer: Partial<RuntimeTimerState>) =>
    set((state) => ({
      timer: {
        ...state.timer,
        ...timer,
      },
    })),

  startQuestionTimer: (startedAt, deadlineAt) =>
    set((state) => ({
      timer: {
        ...state.timer,
        questionStartedAt: startedAt,
        questionDeadlineAt: deadlineAt,
        isQuestionTimerRunning: deadlineAt !== null,
      },
    })),

  stopQuestionTimer: () =>
    set((state) => ({
      timer: {
        ...state.timer,
        isQuestionTimerRunning: false,
      },
    })),

  setAttemptDeadline: (deadlineAt) =>
    set((state) => ({
      timer: {
        ...state.timer,
        attemptDeadlineAt: deadlineAt,
        isAttemptTimerRunning: deadlineAt !== null,
      },
    })),

  showFeedback: (questionId, evaluation) =>
    set({
      feedback: {
        questionId,
        evaluation,
        visible: true,
      },
      phase: "FEEDBACK",
    }),

  hideFeedback: () =>
    set((state) => ({
      feedback: {
        ...state.feedback,
        visible: false,
      },
    })),

  clearFeedback: () => set({ feedback: defaultRuntimeFeedback }),

  setSubmitting: (isSubmitting) =>
    set((state) => ({
      submission: {
        ...state.submission,
        isSubmitting,
      },
      phase: isSubmitting ? "SUBMITTING" : state.phase,
    })),

  setSubmitConfirmation: (isConfirmed) =>
    set((state) => ({
      submission: {
        ...state.submission,
        isConfirmed,
      },
    })),

  setUnansweredQuestions: (unansweredQuestionIds) =>
    set((state) => ({
      submission: {
        ...state.submission,
        unansweredQuestionIds,
      },
    })),

  setSubmittedAt: (submittedAt) =>
    set((state) => ({
      submission: {
        ...state.submission,
        submittedAt,
      },
    })),

  setSaveState: (saveState: RuntimeSaveStatus) =>
    set((state) => ({
      persistence: {
        ...state.persistence,
        saveState,
      },
    })),

  setSaveError: (error) =>
    set((state) => ({
      persistence: {
        ...state.persistence,
        error,
        saveState: error ? "ERROR" : state.persistence.saveState,
      },
    })),

  setDirty: (dirty) =>
    set((state) => ({
      persistence: {
        ...state.persistence,
        dirty,
        saveState: dirty ? "PENDING" : state.persistence.saveState,
      },
    })),

  setLastSavedAt: (lastSavedAt) =>
    set((state) => ({
      persistence: {
        ...state.persistence,
        lastSavedAt,
      },
    })),

  setLastAttemptAt: (lastAttemptAt) =>
    set((state) => ({
      persistence: {
        ...state.persistence,
        lastAttemptAt,
      },
    })),

  markAllAnswersSaved: () =>
    set((state) => ({
      answers: Object.fromEntries(
        Object.entries(state.answers).map(([questionId, answer]) => [
          questionId,
          { ...answer, isDirty: false },
        ]),
      ),
      persistence: {
        ...state.persistence,
        dirty: false,
        saveState: "SAVED",
        error: null,
      },
    })),

  setLoadingState: (loading: Partial<RuntimeLoadingState>) =>
    set((state) => ({
      loading: {
        ...state.loading,
        ...loading,
      },
    })),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  resetQuestionState: () =>
    set({
      questionState: defaultRuntimeQuestionState,
    }),

  resetSubmission: () =>
    set({
      submission: defaultRuntimeSubmission,
    }),

  reset: () => set(defaultRuntimeState),
}));
