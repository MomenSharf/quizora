
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import { SingleSelectQuestion } from "../../validation/question";
import { createBaseQuestion, createDefaultOption } from "./create-default-question";


export function createSingleSelectQuestion(): SingleSelectQuestion {
  const option1 = createDefaultOption("");
  const option2 = createDefaultOption("");

  return {
    ...createBaseQuestion(),

    type: QuestionType.SINGLE_SELECT,


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