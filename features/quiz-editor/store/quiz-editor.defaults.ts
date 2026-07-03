import { createId } from "@paralleldrive/cuid2";

import type {
  EditorState,
  QuizEditor,
} from "./quiz-editor.types";

import type {
  QuizAppearance,
  QuizInfo,
  QuizSettings,
} from "@/features/quiz-editor/validation/quiz";

export const DEFAULT_INFO: QuizInfo = {
  title: "",
  description: "",
  thumbnail: undefined,
  tags: [],
  language: "en",
  category: undefined,
};

export const DEFAULT_SETTINGS: QuizSettings = {
  visibility: "PRIVATE",

  shuffleQuestions: false,
  shuffleOptions: false,

  showCorrectAnswers: true,
  showScore: true,
  showExplanations: true,

  allowRetry: true,
  saveProgress: true,

  requireAllQuestions: false,

  passingScore: 60,

  attempts: 0,

  timeLimit: 0,
};

export const DEFAULT_APPEARANCE: QuizAppearance = {
  theme: "SYSTEM",

  primaryColor: "#6366F1",

  backgroundColor: "#FFFFFF",

  textColor: "#111827",

  logo: undefined,

  coverImage: undefined,

  font: "Inter",

  borderRadius: 12,

  showProgressBar: true,

  showQuestionNumber: true,
};

export const DEFAULT_EDITOR: EditorState = {
  selectedQuestionId: null,

  activePanel: "question",

  autosaveEnabled: true,

  saveState: "idle",

  lastSavedAt: null,
};

export function createDefaultQuiz(): QuizEditor {
  return {
    id: "",

    slug: null,

    status: "DRAFT",

    version: 1,

    info: structuredClone(DEFAULT_INFO),

    settings: structuredClone(DEFAULT_SETTINGS),

    appearance: structuredClone(DEFAULT_APPEARANCE),

    questions: {},

    questionOrder: [],
  };
}

export function createDefaultEditor(): EditorState {
  return structuredClone(DEFAULT_EDITOR);
}

export function createQuestionId() {
  return createId();
}