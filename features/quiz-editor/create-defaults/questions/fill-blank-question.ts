import { createId } from "@paralleldrive/cuid2";

import type { FillBlankQuestion } from "../../validation/question/fill-blank";

import {
  createBaseQuestion,
  createDefaultConfig,
} from "./create-default-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
export function createFillBlankQuestion(): FillBlankQuestion {
  return {
    ...createBaseQuestion(),

    type: QuestionType.FILL_BLANK,

    content: {
      blocks: [],

      blanks: [],
    },

    config: {
      ...createDefaultConfig(),

      showMedia: true,
      mediaRatio: "AUTO",

      caseSensitive: false,
      trimWhitespace: true,
      ignoreExtraSpaces: true,

      autoResizeInputs: true,

      showExplanation: true,
    },
  };
}
