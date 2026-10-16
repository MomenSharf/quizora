import { SessionMode } from "../types/runtime-types";

export const MODE_DEFAULTS = {
  PRACTICE: {
    version: 1,
    mode: "PRACTICE",
    navigation: "FREE",
    allowSkip: true,
    allowQuestionRetry: true,
    allowAnswerChange: true,
    questionTimerEnabled: false,
    defaultQuestionTimeLimit: null,
    totalTimerEnabled: false,
    totalTimeLimitSeconds: null,
    resultVisibility: "IMMEDIATE",
    scoreVisibility: "AFTER_QUESTION",
    showExplanations: true,
    shuffleQuestions: false,
    shuffleAnswers: false,
  },

  TEST: {
    version: 1,
    mode: "TEST",
    navigation: "SEQUENTIAL",
    allowSkip: true,
    allowQuestionRetry: false,
    allowAnswerChange: true,
    questionTimerEnabled: false,
    defaultQuestionTimeLimit: null,
    totalTimerEnabled: false,
    totalTimeLimitSeconds: null,
    resultVisibility: "AFTER_SUBMISSION",
    scoreVisibility: "AFTER_SUBMISSION",
    showExplanations: false,
    shuffleQuestions: false,
    shuffleAnswers: false,
  },
} as const;

