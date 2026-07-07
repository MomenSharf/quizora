import { createId } from "@paralleldrive/cuid2";
import { QuestionType } from "../../validation/question/base";
import { Question } from "../../validation/question";
import { createSingleSelectQuestion } from "./single-select-question";
import { createMultipleSelectQuestion } from "./multiple-select-question";
import { createTrueFalseQuestion } from "./true-false-question";
import { createOrderingQuestion } from "./ordering-question";
import { createMatchQuestion } from "./match-question";
import { createTypeAnswerQuestion } from "./type-answer-question";
import { createFillBlankQuestion } from "./fill-blank-question";
import { createFlashcardsQuestion } from "./flashcards-question";
import { createRangeQuestion } from "./range-question";
import { createLocationQuestion } from "./location-question";
import { createGuessQuestion } from "./guess-question";
import { createTapFindQuestion } from "./tap-find-question";



export function createQuestion(type: QuestionType): Question {
  switch (type) {
    case "SINGLE_SELECT":
      return createSingleSelectQuestion();

    case "MULTIPLE_SELECT":
      return createMultipleSelectQuestion();

    case "TRUE_FALSE":
      return createTrueFalseQuestion();

    case "ORDERING":
      return createOrderingQuestion();

    case "MATCH":
      return createMatchQuestion();

    case "TYPE_ANSWER":
      return createTypeAnswerQuestion();

    case "FILL_BLANK":
      return createFillBlankQuestion();

    case "FLASHCARDS":
      return createFlashcardsQuestion();

    case "RANGE":
      return createRangeQuestion();

    case "LOCATION":
      return createLocationQuestion();

    case "GUESS":
      return createGuessQuestion();

    case "TAP_FIND":
      return createTapFindQuestion();
    
      // TODO: Add dropdown question
      // case "DROPDOWN":
      //   return createDropdownQuestion();

    default:
      return createSingleSelectQuestion();
  }
}

export function createBaseQuestion() {
  return {
    id: createId(),

    title: "",

    description: "",

    explanation: "",

    hint: "",

    required: true,

    points: 1,

    imageUrl: undefined,

    tags: [],

    difficulty: "MEDIUM" as const,

    media: {},
  };
}
