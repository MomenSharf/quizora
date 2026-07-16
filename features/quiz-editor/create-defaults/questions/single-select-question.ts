import { createId } from "@paralleldrive/cuid2";

import { createBaseQuestion } from "./create-default-question";
import { SingleSelectQuestion } from "../../validation/question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";

export function createSingleSelectQuestion(): SingleSelectQuestion {
  const option1 = createId();
  const option2 = createId();

  return {
...createBaseQuestion(),

    type: QuestionType.SINGLE_SELECT,

    title: "Single Select",

    content: {
      options: [
        {
          id: option1,
          text: "option 1",
          image: undefined,
          explanation: "",
        },
        {
          id: option2,
          text: "option 2",
          image: undefined,
          explanation: "",
        },
      ],

      correctOptionid: option1
    },

    config: {
      randomizeOptions: false,
      layout: "VERTICAL",
      showOptionLetters: true,
    },
  };
}
