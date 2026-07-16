import { createId } from "@paralleldrive/cuid2";

import type { FillBlankQuestion } from "../../validation/question/fill-blank";

import { createBaseQuestion } from "./create-default-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
export function createFillBlankQuestion(): FillBlankQuestion {
  const blankId = createId();

  return {
    ...createBaseQuestion(),
    title: "Fill in the Blank",

    type: QuestionType.FILL_BLANK,

    content: {
      blocks: [
        {
          id: createId(),
          type: "TEXT",
          text: "",
        },
        {
          id: createId(),
          type: "BLANK",
          blankId: blankId,
        },
      ],

      blanks: [
        {
          id: blankId,

          answers: [
            {
              id: createId(),
              value: "",
            },
          ],

          placeholder: "Type here",
        },
      ],
    },

    config: {
      caseSensitive: false,
      trimWhitespace: true,
      ignoreExtraSpaces: true,
      allowAnyOrder: false,
      autoResizeInputs: true,
    },
  };
}
