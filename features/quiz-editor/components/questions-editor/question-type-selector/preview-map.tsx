"use client";

import type { QuestionType } from "@/features/quiz-editor/validation/question/base";

import SingleSelectPreview from "./previews/single-select-preview";
import MultipleSelectPreview from "./previews/multiple-select-preview";
import OrderingPreview from "./previews/ordering-preview";
import MatchPreview from "./previews/match-preview";
import TypeAnswerPreview from "./previews/text-answer-preview";
import FillBlankPreview from "./previews/fill-blank-preview";
import LocationPreview from "./previews/location-preview";
import GuessPreview from "./previews/guess-preview";
import RangePreview from "./previews/range-preview";
import TapFindPreview from "./previews/tap-find-preview";
import FlashcardPreview from "./previews/flashcard-preview";

export const createPreviewMap = <
  T extends Record<string, React.FC>
>(map: T) => map;

export const PREVIEW_MAP = createPreviewMap({
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
});