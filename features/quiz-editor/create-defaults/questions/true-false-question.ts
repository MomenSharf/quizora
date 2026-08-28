import { QuestionType } from "@/lib/db/generated/prisma/enums";
import type { TrueFalseQuestion } from "../../validation/question/true-false";
import { createBaseQuestion, createDefaultConfig } from "./create-default-question";

export function createTrueFalseQuestion(): TrueFalseQuestion {
  return {
...createBaseQuestion(),

    type: QuestionType.TRUE_FALSE,

    content: {
      correctAnswer: true,
    },

   config: {
  ...createDefaultConfig(),

  trueLabel: "True",
  falseLabel: "False",

  shuffleOptions: false,

  showMedia: true,
  mediaRatio: "AUTO",

  showExplanation: true,
},
  };
}
