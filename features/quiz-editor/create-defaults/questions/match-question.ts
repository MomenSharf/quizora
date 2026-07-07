import { createId } from "@paralleldrive/cuid2";

import type { MatchQuestion } from "../../validation/question/match";

import { createBaseQuestion } from "./create-default-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
export function createMatchQuestion(): MatchQuestion {
  return {
   ...createBaseQuestion(),

    type: QuestionType.MATCH,

    data: {
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

    settings: {
      randomizeLeft: false,
      randomizeRight: true,
      layout: "LINES",
      showImages: true,
      allowRetry: true,
    },
  };
}
