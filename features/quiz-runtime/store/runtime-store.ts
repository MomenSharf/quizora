import { create } from "zustand";

import {
  defaultRuntimePersistence,
  defaultRuntimeState,
  type RuntimeStore,
} from "./runtime-store.types";

import { evaluateQuestion } from "@/lib/utils/evaluate-question";
import type { Answer } from "../types/answer-types";
import type {
  AttemptSettings,
  QuizAttemptRuntime,
  RuntimeEnvironment,
  RuntimePhase,
  RuntimeProgress,
  RuntimeQuestionStatus,
  RuntimeStatus,
} from "../types/runtime-types";

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
      startedAt: attempt.startedAt,
      lastActivityAt: attempt.lastActivityAt,
      pausedAt: attempt.pausedAt,
      completedAt: attempt.completedAt,
      expiresAt: attempt.expiresAt,
      questions: attempt.questions,
      currentQuestionIndex: attempt.currentQuestionIndex,

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

  setSettings: (settings: AttemptSettings) =>
    set({
      settings,
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
      currentQuestionIndex: 0,
      questions: state.questions.map((question, index) => {
        if (index !== 0) return question;

        const timeLimit = state.settings?.timeLimitSeconds;
        const isTimed =
          state.mode === "TIMED" &&
          typeof timeLimit === "number" &&
          timeLimit > 0;

        return {
          ...question,
          visited: true,
          startedAt,
          deadlineAt: isTimed ? startedAt + timeLimit * 1000 : null,
          isQuestionTimerRunning: isTimed,
        };
      }),
    })),

  pauseAttempt: (pausedAt) =>
    set({
      status: "PAUSED",
      phase: "PAUSED",
      pausedAt,
      lastActivityAt: pausedAt,
      questions: get().questions.map((question) => ({
        ...question,
        isQuestionTimerRunning: false,
      })),
    }),

  resumeAttempt: (resumedAt) =>
    set((state) => ({
      status: "IN_PROGRESS",
      phase: "QUESTION",
      pausedAt: null,
      lastActivityAt: resumedAt,
      questions: state.questions.map((question) => {
        if (!question.startedAt || question.locked) {
          return question;
        }

        const isTimed = state.mode === "TIMED";

        return {
          ...question,
          isQuestionTimerRunning:
            isTimed &&
            question.deadlineAt !== null &&
            question.deadlineAt > resumedAt,
        };
      }),
    })),

  completeAttempt: (completedAt) =>
    set((state) => ({
      status: "COMPLETED",
      phase: "RESULT",
      completedAt,
      lastActivityAt: completedAt,
      questions: state.questions.map((question) => ({
        ...question,
        isQuestionTimerRunning: false,
      })),
    })),

  abandonAttempt: () =>
    set((state) => ({
      status: "ABANDONED",
      phase: "RESULT",
      lastActivityAt: Date.now(),
      questions: state.questions.map((question) => ({
        ...question,
        isQuestionTimerRunning: false,
      })),
    })),

  updateLastActivity: (timestamp) => set({ lastActivityAt: timestamp }),

  setCurrentQuestion: (index) => {
    set((state) => {
      if (index < 0 || index >= state.questions.length) {
        return state;
      }

      const now = Date.now();
      const timeLimit = state.settings?.timeLimitSeconds;

      const isTimed =
        state.mode === "TIMED" &&
        typeof timeLimit === "number" &&
        timeLimit > 0;

      return {
        currentQuestionIndex: index,
        phase: "QUESTION",
        questions: state.questions.map((question, questionIndex) => {
          if (questionIndex !== index) return question;

          // Already visited: resume using the original deadline.
          if (question.startedAt !== null) {
            const timerRunning =
              isTimed &&
              question.status === "UNANSWERED" &&
              !question.locked &&
              question.deadlineAt !== null &&
              now < question.deadlineAt;

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
            startedAt: now,
            deadlineAt: isTimed ? now + timeLimit * 1000 : null,
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
        questions: state.questions.map((question) => {
          return question.id === questionId
            ? {
                ...question,
                answer,
                evaluation: null,
                status: "ANSWERED",
                isDirty: true,
                lastModifiedAt: Date.now(),
              }
            : question;
        }),
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

  submitPracticeAnswer: (questionId) =>
    set((state) => ({
      questions: state.questions.map((question) => {
        if (question.id !== questionId) return question;

        const evaluation = evaluateQuestion(question);

        return {
          ...question,
          locked: true,
          evaluation,
          isFeedbackSeen: false,
        };
      }),
    })),

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
        ? Math.floor((question.deadlineAt - question.startedAt) / 1000)
        : question.timeSpentSeconds;

      return {
        lastActivityAt: timedOutAt,
        questions: state.questions.map((item) =>
          item.id === questionId
            ? {
                ...item,
                status: "TIMED_OUT",
                locked: true,
                isQuestionTimerRunning: false,
                timeSpentSeconds: Math.max(item.timeSpentSeconds, timeSpent),
                evaluation: {
                  status: "EVALUATED",
                  outcome: "TIMEOUT",
                  isCorrect: false,
                  earnedPoints: 0,
                  maxPoints: item.maxPoints,
                  accuracy: 0,
                  feedback: null,
                  explanation: item.question.explanation ?? null,
                  explanationImage: item.question.explanationImage ?? null,
                  parts: [],
                  evaluatedAt: timedOutAt,
                  visibility: {
                    showCorrectAnswer: true,
                    showExplanation: true,
                    showFeedback: false,
                    showEarnedPoints: true,
                  },
                },
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

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  reset: () => set(defaultRuntimeState),
}));
