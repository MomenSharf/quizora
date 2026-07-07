import { QuestionType } from "@/lib/db/generated/prisma/enums";
import type { RangeQuestion } from "../../validation/question/range";

import { createBaseQuestion } from "./create-default-question";
export function createRangeQuestion(): RangeQuestion {
  return {
...createBaseQuestion(),

    type: QuestionType.RANGE,
    data: {
      min: 0,

      max: 100,

      step: 1,

      answer: {
        min: 40,
        max: 60,
      },

      unit: "",
    },

    settings: {
      showTicks: true,
      showLabels: true,
      showCurrentValue: true,
      showMinMaxLabels: true,
      orientation: "HORIZONTAL",
      snapToStep: true,
    },
  };
}
