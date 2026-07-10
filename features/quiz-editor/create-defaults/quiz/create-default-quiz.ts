import { createId } from "@paralleldrive/cuid2";

import { QuizEditor } from "../../validation/quiz";
import { createSingleSelectQuestion } from "../questions/single-select-question";
import { createMultipleSelectQuestion } from "../questions/multiple-select-question";
import { createTrueFalseQuestion } from "../questions/true-false-question";
import { createOrderingQuestion } from "../questions/ordering-question";
import { createMatchQuestion } from "../questions/match-question";
import { createTypeAnswerQuestion } from "../questions/type-answer-question";
import { createFillBlankQuestion } from "../questions/fill-blank-question";
import { createRangeQuestion } from "../questions/range-question";
import { createLocationQuestion } from "../questions/location-question";
import { createGuessQuestion } from "../questions/guess-question";
import { createFlashcardsQuestion } from "../questions/flashcards-question";
import { createTapFindQuestion } from "../questions/tap-find-question";
// import { createDropdownQuestion } from "../questions/dropdown-question";
export function createDefaultQuiz(): QuizEditor {
  return {
    id: createId(),

    slug: undefined,

    status: "DRAFT",

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

    questions: [
      createSingleSelectQuestion(),
      createMultipleSelectQuestion(),
      createTrueFalseQuestion(),
      createOrderingQuestion(),
      createMatchQuestion(),
      createTypeAnswerQuestion(),
      createFillBlankQuestion(),
      createRangeQuestion(),
      createLocationQuestion(),
      createGuessQuestion(),
      createFlashcardsQuestion(),
      createTapFindQuestion(),
      // createDropdownQuestion(),
    ],
  };
}
