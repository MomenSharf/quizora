"use client";

import type { QuestionType } from "@/features/quiz-editor/validation/question/base";

import {
  MatchPreview,
  MultipleSelectPreview,
  OrderingPreview,
  SingleSelectPreview,
  TapFindPreview,
  TypeAnswerPreview,
  FillBlankPreview,
  LocationPreview,
  GuessPreview,
  RangePreview,
  TrueFalsePreview,
  FlashcardPreview,
  DropdownPreview,
} from "./previews";

export const PREVIEW_MAP: Record<QuestionType, React.ComponentType> = {
  SINGLE_SELECT: SingleSelectPreview,
  MULTIPLE_SELECT: MultipleSelectPreview,
  ORDERING: OrderingPreview,
  MATCH: MatchPreview,
  TYPE_ANSWER: TypeAnswerPreview,
  FILL_BLANK: FillBlankPreview,
  LOCATION: LocationPreview,
  GUESS: GuessPreview,
  RANGE: RangePreview,
  TAP_FIND: TapFindPreview,
  FLASHCARDS: FlashcardPreview,
  TRUE_FALSE: TrueFalsePreview,
  DROPDOWN: DropdownPreview,
};
