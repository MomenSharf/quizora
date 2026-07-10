import { createId } from "@paralleldrive/cuid2";

import type { FlashcardsQuestion } from "../../validation/question/flashcards";

import { createBaseQuestion } from "./create-default-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";

export function createFlashcardsQuestion(): FlashcardsQuestion {
  return {
    ...createBaseQuestion(),

    type: QuestionType.FLASHCARDS,

    title: "Flashcards",
    
    content: {
      cards: [
        {
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
      ],
    },

    config: {
      shuffleCards: false,
      flipDirection: "HORIZONTAL",
      startSide: "FRONT",
      allowFlip: true,
      loopCards: false,
      showProgress: true,
      autoFlip: false,
      autoFlipDelay: 3000,
    },
  };
}
