import { createId } from "@paralleldrive/cuid2";

import { createBaseQuestion } from "./create-default-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import { FlashcardQuestion } from "../../validation/question/flashcard";

export function createflashcardQuestion(): FlashcardQuestion {
  return {
    ...createBaseQuestion(),

    type: QuestionType.FLASHCARD,

    content: {
      id: createId(),

      front: {
        title: "",
        content: "",
        image: undefined,
      },

      back: {
        title: "",
        content: "",
        image: undefined,
      },
    },
  };
}
