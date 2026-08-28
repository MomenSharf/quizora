import { createId } from "@paralleldrive/cuid2";

import type { MatchQuestion } from "../../validation/question/match";

import { createBaseQuestion, createDefaultConfig } from "./create-default-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
export function createMatchQuestion(): MatchQuestion {
  return {
   ...createBaseQuestion(),

    type: QuestionType.MATCH,

    content: {
      pairs: [
        {
          id: createId(),
          left: {
            text: "",
            image: undefined,
          },
          right: {
            text: "",
            image: undefined,
          },
        },
        {
          id: createId(),
          left: {
            text: "",
            image: undefined,
          },
          right: {
            text: "",
            image: undefined,
          },
        },
      ],
    },

  config: {
  ...createDefaultConfig(),

  showMedia: true,
  mediaRatio: "AUTO",

  shuffleLeft: true,
  shuffleRight: false,

  layout: "LINES",

  showExplanation: true,
},
  };
}
