import { createId } from "@paralleldrive/cuid2";

import type { GuessQuestion } from "../../validation/question/guess";

import { createBaseQuestion } from "./create-default-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
export function createGuessQuestion(): GuessQuestion {
  return {
    ...createBaseQuestion(),

    type: QuestionType.GUESS,

    content: {
      image: "",
      text: "",

      mode: 'TEXT',

      hints: [
        {
          id: createId(),
          value: "",
        },
      ],

      answers: [
        {
          id: createId(),
          value: "",
        },
      ],
    },

    config: {
      caseSensitive: false,
      trimWhitespace: true,
      ignoreExtraSpaces: true,
      revealAnswerAfterSubmit: true,
      maxAttempts: 0,
      showHint: true,
      zoomable: true,
    },
  };
}
