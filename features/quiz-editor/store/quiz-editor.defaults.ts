import { createId } from "@paralleldrive/cuid2";
import { produce } from "immer";

import type { EditorState, QuizEditor } from "./quiz-editor.types";
import { Quiz } from "../validation/quiz";
import { Question } from "../validation/question";

export const createDefaultQuiz = (): QuizEditor => ({
  id: "",
  slug: null,
  status: "DRAFT",
  version: 1,

  quiz: {
    info: {
      title: "",
      description: "",
      thumbnail: undefined,
      tags: [],
      language: "en",
      category: undefined,
    },

    settings: {
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
    },

    appearance: {
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
    },
  } satisfies Quiz,

  questions: {},

  questionOrder: [],
});

export const createDefaultEditor = (): EditorState => ({
  selectedQuestionId: null,

  activePanel: "questions",

  dirty: false,

  saving: false,

  autosaveEnabled: true,

  lastSavedAt: null,

  saveError: null,
});

export const cloneQuiz = (quiz: QuizEditor): QuizEditor =>
  produce(quiz, () => {});

export const cloneQuestion = <T extends Question>(question: T): T =>
  produce(question, () => {});

export const createQuestionId = () => createId();