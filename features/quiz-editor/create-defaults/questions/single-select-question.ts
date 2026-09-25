
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import { SingleSelectQuestion } from "../../validation/question";
import { createBaseQuestion, createDefaultConfig, createDefaultOption } from "./create-default-question";


export function createSingleSelectQuestion(): SingleSelectQuestion {
  const option1 = createDefaultOption("");
  const option2 = createDefaultOption("");

  return {
    ...createBaseQuestion(),

    type: QuestionType.SINGLE_SELECT,

    content: {
      options: [option1, option2],
       correctOptionId: option1.id,
    },

    config: {
      ...createDefaultConfig(),
      showMedia: true,
      mediaRatio: "AUTO",
      showOptionMedia: true,
      optionMediaRatio: "AUTO",
      showExplanation: true,
      shuffleOptions: false,
      showOptionLetters: true,
      layout: "VERTICAL",
    },
  };
}