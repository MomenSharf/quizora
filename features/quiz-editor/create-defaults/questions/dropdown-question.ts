
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import { DropdownQuestion } from "../../validation/question/dropdown";
import { createBaseQuestion, createDefaultConfig, createDefaultOption } from "./create-default-question";


export function createDropdownQuestion(): DropdownQuestion {
  const option1 = createDefaultOption("");
  const option2 = createDefaultOption("");

  return {
    ...createBaseQuestion(),

    type: QuestionType.DROPDOWN,


    content: {
      label: "Dropdown",
      options: [option1, option2],
      correctOptionId: option1.id,
    },

    config: {
       ...createDefaultConfig(),
      clearable: true,
      placeholder: "Select an option...",
      showOptionLetters: true,
      shuffleOptions: false,
      showOptionMedia: true,
      searchable: true,
      showMedia: true,
      mediaRatio: "AUTO",
      optionMediaRatio: "AUTO",
      showExplanation: true,
    },
  };
}