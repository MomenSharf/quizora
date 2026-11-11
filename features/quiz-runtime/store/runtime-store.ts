import { create } from "zustand";

import {
  defaultRuntimePersistence,
  defaultRuntimeState,
  type RuntimeStore,
} from "./runtime-store.types";

import { evaluateQuestion } from "@/lib/utils/evaluate-question";
import type { Answer } from "../types/answer-types";
import type {
  QuizAttemptRuntime,
  RuntimePhase,
  RuntimeQuestionStatus,
  RuntimeStatus,
  RuntimeView,
} from "../types/runtime-types";

const defaultTimeLimit = 300;

export const useRuntimeStore = create<RuntimeStore>()((set, get) => ({
  ...defaultRuntimeState,

  initializeAttempt: (attempt: QuizAttemptRuntime) =>
    set({
      attemptId: attempt.id,
      quizId: attempt.quizId,
      quizSnapshot: attempt.quizSnapshot,
      mode: attempt.mode,
      environment: attempt.environment,
      settings: attempt.settings,
      status: attempt.status,
      phase: attempt.phase,
      currentView: attempt.currentView,
      startedAt: attempt.startedAt,
      lastActivityAt: attempt.lastActivityAt,
      completedAt: attempt.completedAt,
      expiresAt: attempt.expiresAt,
      questions: attempt.questions,
      currentQuestionIndex: attempt.currentQuestionIndex,

      persistence: {
        ...defaultRuntimePersistence,
        enabled: attempt.environment === "PRODUCTION",
      },
    }),

  hydrateAttempt: (attempt: QuizAttemptRuntime) =>
    get().initializeAttempt(attempt),

  setStatus: (status: RuntimeStatus) => set({ status }),

  setPhase: (phase: RuntimePhase) => set({ phase }),

  setCurrentView: (view: RuntimeView) => set({ currentView: view }),

  startAttempt: (startedAt) =>
    set((state) => {
      const isTimed = !!state.settings?.timeLimitEnabled;

      return {
        status: "IN_PROGRESS",
        phase: "QUESTION",
        currentView: "QUESTION",
        startedAt,
        lastActivityAt: startedAt,
        completedAt: null,
        currentQuestionIndex: 0,
        persistence: {
          ...state.persistence,
          dirty: true,
        },

        questions: state.questions.map((question, index) => {
          const isFirst = index === 0;

          return {
            ...question,

            status: "UNANSWERED",
            answer: null,
            evaluation: null,
            earnedPoints: 0,

            flagged: false,
            locked: false,
            visited: isFirst,

            startedAt: isFirst ? startedAt : null,
            deadlineAt:
              isFirst && isTimed && question.timeLimitSeconds
                ? new Date(
                    startedAt.getTime() + question.timeLimitSeconds * 1000,
                  )
                : null,

            isQuestionTimerRunning: isFirst && isTimed,
            timeSpentSeconds: 0,

            answeredAt: null,
            evaluatedAt: null,

            hasSeenFeedback: false,
          };
        }),
      };
    }),
  resumeAttempt: (resumedAt) =>
    set((state) => {
      return {
        status: "IN_PROGRESS",
        phase: "QUESTION",
        currentView: "QUESTION",
        lastActivityAt: resumedAt,
        persistence: {
          ...state.persistence,
          dirty: true,
        },

        questions: state.questions.map((question, index) => {
          if (index !== state.currentQuestionIndex) return question;

          if (
            !state.settings?.timeLimitEnabled ||
            question.locked ||
            !question.deadlineAt
          ) {
            return question;
          }

          const isExpired = resumedAt >= question.deadlineAt;

          return {
            ...question,
            isQuestionTimerRunning: !isExpired,
          };
        }),
      };
    }),

  completeAttempt: (completedAt) =>
    set((state) => ({
      status: "COMPLETED",
      phase: "RESULT",
      currentView: "RESULTS",
      completedAt,
      lastActivityAt: completedAt,
      questions: state.questions.map((question) => ({
        ...question,
        isQuestionTimerRunning: false,
      })),
    })),

  setCurrentQuestion: (index) => {
    set((state) => {
      if (index < 0 || index >= state.questions.length) {
        return state;
      }

      const now = Date.now();
      const isTimed = !!state.settings?.timeLimitEnabled;

      return {
        currentQuestionIndex: index,
        phase: "QUESTION",
        currentView: "QUESTION",
        persistence: {
          ...state.persistence,
          dirty: true,
        },
        questions: state.questions.map((question, questionIndex) => {
          if (questionIndex !== index) return question;
          const timeLimit = question.timeLimitSeconds
            ? question.timeLimitSeconds
            : defaultTimeLimit;
          const deadlineAt = isTimed ? new Date(now + timeLimit * 1000) : null;

          if (question.startedAt !== null) {
            const timerRunning =
              isTimed &&
              !question.locked &&
              question.deadlineAt !== null &&
              now < question.deadlineAt.getTime();

            return {
              ...question,
              visited: true,
              isQuestionTimerRunning: timerRunning,
            };
          }

          // First visit: initialize the question timer.
          return {
            ...question,
            visited: true,
            startedAt: new Date(now),
            deadlineAt,
            isQuestionTimerRunning: isTimed,
          };
        }),
      };
    });
  },

  goToNextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= questions.length) return;

    get().setCurrentQuestion(nextIndex);
  },

  goToPreviousQuestion: () => {
    get().setCurrentQuestion(get().currentQuestionIndex - 1);
  },

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
      persistence: {
        ...state.persistence,
        dirty: true,
      },
    })),

  unlockQuestion: (questionId) =>
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === questionId ? { ...question, locked: false } : question,
      ),
      persistence: {
        ...state.persistence,
        dirty: true,
      },
    })),

  setAnswer: (questionId: string, answer: Answer) =>
    set((state) => {
      return {
        questions: state.questions.map((question) => {
          return question.id === questionId
            ? {
                ...question,
                answer,
                evaluation: null,
                status: "ANSWERED",
                answeredAt: new Date(),
              }
            : question;
        }),

        lastActivityAt: new Date(),
        persistence: {
          ...state.persistence,
          dirty: true,
        },
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
              answeredAt: null,
            }
          : question,
      ),
      persistence: {
        ...state.persistence,
        dirty: true,
      },
    })),

  submitPracticeAnswer: (questionId) =>
    set((state) => {
      const isTimed = !!state.settings?.timeLimitEnabled;
      const now = new Date();

      return {
        questions: state.questions.map((question) => {
          if (question.id !== questionId) return question;

          const evaluation = evaluateQuestion(question);

          const timeSpentSeconds =
            isTimed && question.startedAt
              ? Math.floor(
                  (now.getTime() - question.startedAt.getTime()) / 1000,
                )
              : question.timeSpentSeconds;

          return {
            ...question,
            status: "ANSWERED",
            locked: true,
            evaluation,
            earnedPoints: evaluation.earnedPoints,
            evaluatedAt: now,
            timeSpentSeconds,
            isQuestionTimerRunning: false,
            isFeedbackSeen: false,
          };
        }),
        lastActivityAt: now,
        persistence: {
          ...state.persistence,
          dirty: true,
        },
      };
    }),

  submitTestAnswer: (questionId) =>
    set((state) => {
      const isTimed = !!state.settings?.timeLimitEnabled;
      const now = new Date();

      return {
        questions: state.questions.map((question) => {
          if (question.id !== questionId) return question;

          const timeSpentSeconds =
            isTimed && question.startedAt
              ? Math.floor(
                  (now.getTime() - question.startedAt.getTime()) / 1000,
                )
              : question.timeSpentSeconds;

          return {
            ...question,
            status: "ANSWERED",
            answeredAt: now,
            earnedPoints: 0,
            timeSpentSeconds,
            locked: true,
            isQuestionTimerRunning: false,
          };
        }),
        lastActivityAt: now,
        persistence: {
          ...state.persistence,
          dirty: true,
        },
      };
    }),

  markFeedbackAsSeen: (questionId: string) =>
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === questionId
          ? { ...question, hasSeenFeedback: true }
          : question,
      ),
    })),

  timeoutQuestion: (questionId, timedOutAt) =>
    set((state) => {
      const question = state.questions.find((item) => item.id === questionId);

      if (
        !question ||
        question.locked ||
        question.status !== "UNANSWERED" ||
        !question.isQuestionTimerRunning ||
        question.deadlineAt === null ||
        timedOutAt < question.deadlineAt
      ) {
        return state;
      }

      const timeSpent = question.startedAt
        ? Math.floor(
            ((question.answeredAt ?? new Date()).getTime() -
              question.startedAt.getTime()) /
              1000,
          )
        : question.timeSpentSeconds;

      const isClassic = state.mode === "CLASSIC";

      return {
        lastActivityAt: timedOutAt,
        persistence: {
          ...state.persistence,
          dirty: true,
        },
        questions: state.questions.map((item) =>
          item.id === questionId
            ? {
                ...item,
                status: "TIMED_OUT",
                locked: true,
                isQuestionTimerRunning: false,
                timeSpentSeconds:
                  item.timeSpentSeconds && timeSpent
                    ? Math.max(item.timeSpentSeconds, timeSpent)
                    : null,
                evaluatedAt: isClassic ? timedOutAt : null,
                evaluation: isClassic
                  ? {
                      status: "EVALUATED",
                      outcome: "TIMEOUT",
                      isCorrect: false,
                      earnedPoints: 0,
                      maxPoints: item.maxPoints,
                      accuracy: 0,
                      feedback: null,
                      explanation: item.question.explanation ?? null,
                      explanationImage: item.question.explanationImage ?? null,
                    }
                  : null,
              }
            : item,
        ),
      };
    }),

  setQuestionStatus: (questionId: string, status: RuntimeQuestionStatus) =>
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === questionId ? { ...question, status } : question,
      ),
    })),

  reset: () => set(defaultRuntimeState),

  setKeyboardShortcutsEnabled: (enabled: boolean) =>
    set((state) => ({
      settings: state.settings
        ? { ...state.settings, keyboardShortcutsEnabled: enabled }
        : state.settings,
    })),

  // --------------------------------------------------
  // Persistence
  // --------------------------------------------------

  markDirty: () =>
    set((state) => ({
      persistence: {
        ...state.persistence,
        dirty: true,
        revision: state.persistence.revision + 1,
      },
    })),

  setSaveStatus: (saveStatus) =>
    set((state) => ({
      persistence: {
        ...state.persistence,
        saveStatus,
      },
    })),

  setPersistenceError: (error) =>
    set((state) => ({
      persistence: {
        ...state.persistence,
        error,
      },
    })),

  setLastAttemptAt: (timestamp = Date.now()) =>
    set((state) => ({
      persistence: {
        ...state.persistence,
        lastAttemptAt: timestamp,
      },
    })),

  markSaved: (savedRevision) =>
    set((state) => ({
      persistence: {
        ...state.persistence,
        saveStatus: "SAVED",
        lastSavedAt: Date.now(),
        savedRevision,
        dirty: state.persistence.revision > savedRevision,
        error: null,
      },
    })),
}));
