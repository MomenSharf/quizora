import { createId } from "@paralleldrive/cuid2";

import type { TapFindQuestion } from "../../validation/question/tap-find";
import { createBaseQuestion } from "./create-default-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";

export function createTapFindQuestion(): TapFindQuestion {
  return {
    ...createBaseQuestion(),

    type: QuestionType.TAP_FIND,

    content: {
      image: "",

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
      showHints: false,
      showTargetOutline: false,
      allowMultipleClicks: false,
      tolerance: 5,
      zoomable: true,
      revealTargetsAfterSubmit: true,
    },
  };
}
