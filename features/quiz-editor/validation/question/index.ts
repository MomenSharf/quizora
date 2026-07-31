import { z } from "zod";

import { DropdownQuestionSchema } from "./dropdown";
import { FillBlankQuestionSchema } from "./fill-blank";
import { FlashcardsQuestionSchema } from "./flashcards";
import { GuessQuestionSchema } from "./guess";
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
  OrderingQuestionSchema,
  MatchQuestionSchema,
  TypeAnswerQuestionSchema,
  FillBlankQuestionSchema,
  FlashcardsQuestionSchema,
  RangeQuestionSchema,
  GuessQuestionSchema,
  TapFindQuestionSchema,
  DropdownQuestionSchema,
]);

export const QuestionArraySchema = z.array(QuestionSchema);

export type Question = z.infer<typeof QuestionSchema>;

export type Questions = z.infer<typeof QuestionArraySchema>;

export type QuestionConfig = Question['config']


export * from "./base";
export * from "./dropdown";
export * from "./fill-blank";
export * from "./flashcards";
export * from "./guess";
export * from "./match";
export * from "./multiple-select";
export * from "./ordering";
export * from "./range";
export * from "./single-select";
export * from "./tap-find";
export * from "./true-false";
export * from "./type-answer";
