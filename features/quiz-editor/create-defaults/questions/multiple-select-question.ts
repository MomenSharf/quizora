
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import type { MultipleSelectQuestion } from "../../validation/question/multiple-select";
import {
  createBaseQuestion,
  createDefaultConfig,
  createDefaultOption,
} from "./create-default-question";

export function createMultipleSelectQuestion(): MultipleSelectQuestion {
  const option1 = createDefaultOption("");
  const option2 = createDefaultOption("");

  return {
    ...createBaseQuestion(),

    type: QuestionType.MULTIPLE_SELECT,

    content: {
      options: [option1, option2],

      correctOptionIds: [option1.id],
    },

   config: {
  ...createDefaultConfig(),

  showMedia: true,
  mediaRatio: "AUTO",

  shuffleOptions: false,
  showOptionLetters: true,

  showOptionMedia: true,
  optionMediaRatio: "AUTO",

  minSelections: 1,
  maxSelections: 0,

  allowPartialCredit: false,

  showExplanation: true,

  layout: "VERTICAL",
},
  };
}
