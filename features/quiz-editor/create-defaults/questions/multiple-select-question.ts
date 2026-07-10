import { createId } from "@paralleldrive/cuid2";

import type { MultipleSelectQuestion } from "../../validation/question/multiple-select";
import { createBaseQuestion } from "./create-default-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";

export function createMultipleSelectQuestion(): MultipleSelectQuestion {
  const option1 = createId();
  const option2 = createId();

  return {
   ...createBaseQuestion(),

    type: QuestionType.MULTIPLE_SELECT,

    title: "Multiple Select",

    content: {
      options: [
        {
          id: option1,
          text: "",
          image: undefined,
          explanation: "",
        },
        {
          id: option2,
          text: "",
          image: undefined,
          explanation: "",
        },
      ],

      correctOptionIds: [option1],
    },

    config: {
      randomizeOptions: false,
      layout: "VERTICAL",
      showOptionLetters: true,
      minSelections: 0,
      maxSelections: 0,
      allowPartialCredit: true,
    },
  };
}
