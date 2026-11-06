import type { FillBlankQuestion } from "../../validation/question/fill-blank";

import { QuestionType } from "@/lib/db/generated/prisma/enums";
import { createBaseQuestion } from "./create-default-question";
export function createFillBlankQuestion(): FillBlankQuestion {
  return {
    ...createBaseQuestion(),

    type: QuestionType.FILL_BLANK,

    content: {
      blocks: [],
      blanks: [],
    },
  };
}
