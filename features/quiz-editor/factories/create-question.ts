import { createId } from "@paralleldrive/cuid2";

import type {
  Question,
  SingleSelectQuestion,
  MultipleSelectQuestion,
  TrueFalseQuestion,
  MatchQuestion,
  OrderingQuestion,
  FillBlankQuestion,
  FlashcardsQuestion,
  GuessQuestion,
  LocationQuestion,
  RangeQuestion,
  TapFindQuestion,
  // TypeAnswerQuestion,
} from "@/features/quiz-editor/validation/question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";


const createOption = (text: string) => ({
  id: createId(),
  text,
  imageUrl: undefined,
});

export function createQuestion(
  type: QuestionType,
): Question {
  const id = createId();

  const base = {
    id,
    title: "",
    description: "",
    explanation: "",
    hint: "",
    points: 1,
    imageUrl: undefined,
    tags: [],
    difficulty: "MEDIUM" as const,
  };

  switch (type) {
    case "SINGLE_SELECT": {
      const option1 = createOption("Option 1");
      const option2 = createOption("Option 2");

      return {
        ...base,
        type,

        data: {
          options: [option1, option2],
          correctOptionId: option1.id,
        },

        settings: {
          randomizeOptions: false,
          layout: "VERTICAL",
          showOptionLetters: true,
        },
      } satisfies SingleSelectQuestion;
    }

    case "MULTIPLE_SELECT": {
      const option1 = createOption("Option 1");
      const option2 = createOption("Option 2");

      return {
        ...base,
        type,

        data: {
          options: [option1, option2],
          correctOptionIds: [],
        },

        settings: {
          randomizeOptions: false,
          layout: "VERTICAL",
          showOptionLetters: true,
        },
      } satisfies MultipleSelectQuestion;
    }

    case "TRUE_FALSE":
      return {
        ...base,
        type,

        data: {
          answer: true,
        },

        settings: {},
      } satisfies TrueFalseQuestion;

    case "TYPE_ANSWER":
      return {
        ...base,
        type,

        data: {
          answers: [""],
        },

        settings: {},
      } satisfies TypeAnswerQuestion;

    case "FILL_BLANK":
      return {
        ...base,
        type,

        data: {
          text: "",
          blanks: [],
        },

        settings: {},
      } satisfies FillBlankQuestion;

    case "MATCH":
      return {
        ...base,
        type,

        data: {
          pairs: [
            {
              id: createId(),
              left: "",
              right: "",
            },
          ],
        },

        settings: {},
      } satisfies MatchQuestion;

    case "ORDERING":
      return {
        ...base,
        type,

        data: {
          items: [
            {
              id: createId(),
              text: "",
            },
            {
              id: createId(),
              text: "",
            },
            {
              id: createId(),
              text: "",
            },
          ],
        },

        settings: {},
      } satisfies OrderingQuestion;

    case "FLASHCARD":
      return {
        ...base,
        type,

        data: {
          cards: [],
        },

        settings: {},
      } satisfies FlashcardsQuestion;

    case "LOCATION":
      return {
        ...base,
        type,

        data: {
          imageUrl: "",
          markers: [],
        },

        settings: {},
      } satisfies LocationQuestion;

    case "GUESS":
      return {
        ...base,
        type,

        data: {
          answer: "",
        },

        settings: {},
      } satisfies GuessQuestion;

    case "RANGE":
      return {
        ...base,
        type,

        data: {
          min: 0,
          max: 100,
          answer: 50,
        },

        settings: {},
      } satisfies RangeQuestion;

    case "TAB_FIND":
      return {
        ...base,
        type,

        data: {
          imageUrl: "",
          targets: [],
        },

        settings: {},
      } satisfies TapFindQuestion;
  }
}