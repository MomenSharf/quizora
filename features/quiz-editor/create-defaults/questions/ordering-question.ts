import { createId } from "@paralleldrive/cuid2";

import type { OrderingQuestion } from "../../validation/question/ordering";

import { createBaseQuestion } from "./create-default-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
export function createOrderingQuestion(): OrderingQuestion {
  return {
...createBaseQuestion(),

    type: QuestionType.ORDERING,
    data: {
      items: [
        {
          id: createId(),
          text: "",
          image: undefined,
        },
        {
          id: createId(),
          text: "",
          image: undefined,
        },
      ],
    },

    settings: {
      randomizeItems: true,
      layout: "VERTICAL",
      showNumbers: true,
      allowRetry: true,
    },
  };
}
