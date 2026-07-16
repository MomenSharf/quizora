import { createId } from "@paralleldrive/cuid2";

import { createBaseQuestion, createDefaultOption } from "./create-default-question";
import { SingleSelectQuestion } from "../../validation/question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";


export function createSingleSelectQuestion(): SingleSelectQuestion {
  const option1 = createDefaultOption("Option 1");
  const option2 = createDefaultOption("Option 2");

  return {
    ...createBaseQuestion(),

    type: QuestionType.SINGLE_SELECT,

    title: "Single Select",

    content: {
      options: [option1, option2],
      correctOptionid: option1.id,
    },

    config: {
      randomizeOptions: false,
      layout: "VERTICAL",
      showOptionLetters: true,
    },
  };
}