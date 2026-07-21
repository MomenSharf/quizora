import { createId } from "@paralleldrive/cuid2";

import type { TypeAnswerQuestion } from "../../validation/question/type-answer";

import { createBaseQuestion } from "./create-default-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
export function createTypeAnswerQuestion(): TypeAnswerQuestion {
  return {
...createBaseQuestion(),

    type: QuestionType.TYPE_ANSWER,

    content: {
      answers: [
        {
          id: createId(),
          value: "",
        },
      ],

      placeholder: "Type your answer...",
    },

    config: {
      caseSensitive: false,
      trimWhitespace: true,
      ignoreExtraSpaces: true,
      acceptRegex: false,
      maxLength: 255,
      multiline: false,
      autoComplete: true,
    },
  };
}
