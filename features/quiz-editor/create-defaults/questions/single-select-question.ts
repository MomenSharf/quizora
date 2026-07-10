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
    title: "Question 1",
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

      correctOptionId: option1,
    },

    config: {
      randomizeOptions: false,
      layout: "VERTICAL",
      showOptionLetters: true,
    },
  };
}
