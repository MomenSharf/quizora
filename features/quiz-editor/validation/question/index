import { z } from "zod";

// import { DropdownQuestionSchema } from "./dropdown";
import { FillBlankQuestionSchema } from "./fill-blank";
import { FlashcardsQuestionSchema } from "./flashcards";
import { GuessQuestionSchema } from "./guess";
import { LocationQuestionSchema } from "./location";
import { MatchQuestionSchema } from "./match";
import { MultipleSelectQuestionSchema } from "./multiple-select";
import { OrderingQuestionSchema } from "./ordering";
import { RangeQuestionSchema } from "./range";
import { SingleSelectQuestionSchema } from "./single-select";
import { TapFindQuestionSchema } from "./tap-find";
import { TrueFalseQuestionSchema } from "./true-false";
import { TypeAnswerQuestionSchema } from "./type-answer";

export const QuestionSchema = z.discriminatedUnion("type", [
  SingleSelectQuestionSchema,
  MultipleSelectQuestionSchema,
  TrueFalseQuestionSchema,
  // DropdownQuestionSchema,
  OrderingQuestionSchema,
  MatchQuestionSchema,
  TypeAnswerQuestionSchema,
  FillBlankQuestionSchema,
  FlashcardsQuestionSchema,
  RangeQuestionSchema,
  LocationQuestionSchema,
  GuessQuestionSchema,
  TapFindQuestionSchema,
]);

export type Question = z.infer<typeof QuestionSchema>;

export * from "./base";
export * from "./multiple-select";
export * from "./single-select";
export * from "./true-false";
// export * from "./dropdown";
export * from "./match";
export * from "./ordering";
// export * from "./type-answer";
export * from "./fill-blank";
export * from "./flashcards";
export * from "./guess";
export * from "./location";
export * from "./range";
export * from "./tap-find";
