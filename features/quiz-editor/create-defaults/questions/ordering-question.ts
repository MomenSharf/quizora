import type { OrderingQuestion } from "../../validation/question/ordering";

import {
  createBaseQuestion,
  createDefaultOption,
} from "./create-default-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
export function createOrderingQuestion(): OrderingQuestion {
  const option1 = createDefaultOption("Option 1");
  const option2 = createDefaultOption("Option 2");
  return {
    ...createBaseQuestion(),

    type: QuestionType.ORDERING,

    title: "Order It",

    content: {
      options: [option1, option2],
    },

    config: {
      randomizeItems: true,
      layout: "VERTICAL",
      showNumbers: true,
      allowRetry: true,
    },
  };
}
