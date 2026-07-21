import type { OrderingQuestion } from "../../validation/question/ordering";

import {
  createBaseQuestion,
  createDefaultOption,
} from "./create-default-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
export function createOrderingQuestion(): OrderingQuestion {
  const option1 = createDefaultOption("");
  const option2 = createDefaultOption("");
  return {
    ...createBaseQuestion(),

    type: QuestionType.ORDERING,


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
