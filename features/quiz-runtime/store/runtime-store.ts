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
  RuntimePhase,
  RuntimeQuestionStatus,
  RuntimeStatus,
  RuntimeView,
} from "../types/runtime-types";

const isTimerEnabled = (settings: AttemptSettings | null) =>
  !!(
    settings &&
    settings.timeLimitEnabled &&
    Number.isFinite(settings.timeLimitSeconds) &&
    settings.timeLimitSeconds > 0
  );

const defaulTtimeLimit = 300;

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
        saveStatus: attempt.saveStatus ?? "IDLE",
        dirty: false,
      },
    }),

  hydrateAttempt: (attempt: QuizAttemptRuntime) =>
    get().initializeAttempt(attempt),

  setStatus: (status: RuntimeStatus) => set({ status }),

  setPhase: (phase: RuntimePhase) => set({ phase }),

  setCurrentView: (view: RuntimeView) => set({ currentView: view }),

  startAttempt: (startedAt) =>
    set((state) => ({
      status: "IN_PROGRESS",
      phase: "QUESTION",
      currentView: "QUESTION",
      startedAt,
      lastActivityAt: startedAt,
      completedAt: null,
      currentQuestionIndex: 0,
      questions: state.questions.map((question, index) => {
        if (index !== 0) return question;

        const isTimed = isTimerEnabled(state.settings);
        const timeLimit = state.settings?.timeLimitSeconds ?? defaulTtimeLimit;
        const deadlineAt = isTimed
          ? new Date(startedAt.getTime() + timeLimit * 1000)
          : null;

        return {
          ...question,
          visited: true,
          startedAt,
          deadlineAt,
          isQuestionTimerRunning: isTimed,
        };
      }),
    })),

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
      const isTimed = isTimerEnabled(state.settings);
      const timeLimit = state.settings?.timeLimitSeconds ?? defaulTtimeLimit;
      const deadlineAt = isTimed ? new Date(now + timeLimit * 1000) : null;

      return {
        currentQuestionIndex: index,
        phase: "QUESTION",
        currentView: "QUESTION",
        questions: state.questions.map((question, questionIndex) => {
          if (questionIndex !== index) return question;

          if (question.startedAt !== null) {
            const timerRunning =
              isTimed &&
              question.status === "UNANSWERED" &&
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
    })),

  unlockQuestion: (questionId) =>
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === questionId ? { ...question, locked: false } : question,
      ),
    })),

  setAnswer: (questionId: string, answer: Answer) =>
    set((state) => {
      const isTimed = isTimerEnabled(state.settings);
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
    })),

  submitPracticeAnswer: (questionId) =>
    set((state) => {
      const isTimed = isTimerEnabled(state.settings);
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
            evaluatedAt: now,
            timeSpentSeconds,
            isQuestionTimerRunning: false,
            isFeedbackSeen: false,
          };
        }),
        lastActivityAt: now,
      };
    }),

  submitTestAnswer: (questionId) =>
    set((state) => {
      const isTimed = isTimerEnabled(state.settings);
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
            timeSpentSeconds,
            locked: true,
            isQuestionTimerRunning: false,
          };
        }),
        lastActivityAt: now,
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
                evaluatedAt: timedOutAt,
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

  reset: () => set(defaultRuntimeState),
}));
