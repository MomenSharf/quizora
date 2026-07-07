import { QuestionType } from "@/lib/db/generated/prisma/enums";
import type { TrueFalseQuestion } from "../../validation/question/true-false";
import { createBaseQuestion } from "./create-default-question";

export function createTrueFalseQuestion(): TrueFalseQuestion {
  return {
...createBaseQuestion(),

    type: QuestionType.TRUE_FALSE,
    data: {
      correctAnswer: true,
    },

    settings: {
      trueLabel: "True",
      falseLabel: "False",
      randomizeOrder: false,
    },
  };
}
