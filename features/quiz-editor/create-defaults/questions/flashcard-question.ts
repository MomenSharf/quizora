import { createId } from "@paralleldrive/cuid2";

import {
  createBaseQuestion,
  createDefaultConfig,
} from "./create-default-question";
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

    config: {
      ...createDefaultConfig(),
      flipDirection: "HORIZONTAL",
      startSide: "FRONT",
      allowFlip: true,
      autoFlip: false,
      autoFlipDelay: 3000,
    },
  };
}
