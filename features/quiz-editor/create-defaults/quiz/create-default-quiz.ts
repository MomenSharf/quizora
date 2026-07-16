// lib/quiz/create-default-quiz.ts

import { createId } from "@paralleldrive/cuid2";

import { createSingleSelectQuestion } from "../questions/single-select-question";
import { QuizEditor } from "../../validation/quiz";

export function createDefaultQuiz() : QuizEditor {
  return {
    id: createId(),
    slug: createId(),
    status: "DRAFT" as const,
    version: 1,

    info: {
      title: "Untitled Quiz",
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

    questions: [createSingleSelectQuestion()],
  };
}