import { createId } from "@paralleldrive/cuid2";

import type { TapFindQuestion } from "../../validation/question/tap-find";
import {
  createBaseQuestion,
  createDefaultConfig,
} from "./create-default-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";

export function createTapFindQuestion(): TapFindQuestion {
  return {
    ...createBaseQuestion(),

    type: QuestionType.TAP_FIND,

    content: {
      targets: [
        {
          id: createId(),

          label: "",

          shape: "RECT",

          x: 0.25,
          y: 0.25,
          width: 0.5,
          height: 0.5,
        },
      ],
    },

    config: {
      ...createDefaultConfig(),

      showExplanation: true,
    },
  };
}
