// lib/quiz/create-default-quiz.ts

import { createId } from "@paralleldrive/cuid2";

import { createSingleSelectQuestion } from "../questions/single-select-question";
import { QuizEditor } from "../../validation/quiz";

export function createDefaultQuiz(): QuizEditor {
  return {
    id: createId(),
    slug: createId(),
    title: "Untitled Quiz",
    description: "",
    thumbnail: undefined,
    tags: ["general"],
    language: "en",
    category: undefined,

    visibility: "PRIVATE",

    questions: [createSingleSelectQuestion()],
  };
}
