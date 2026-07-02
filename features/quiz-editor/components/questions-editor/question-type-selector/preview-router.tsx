"use client";

import { QuestionTypeUI } from "@/features/quiz-editor/types/question-types";
import {
  FillBlankPreview,
  GuessPreview,
  LocationPreview,
  MatchPreview,
  MultipleSelectPreview,
  OrderPreview,
  RangePreview,
  // PinpointPreview,
  SingleSelectPreview,
  TapFindPreview,
  TextAnswerPreview,
} from "./previews";
import FlashcardPreview from "./previews/flashcard-preview";

type Props = {
  type: QuestionTypeUI;
};

export default function PreviewRouter({ type }: Props) {
  switch (type.id) {
    case "single_select":
      return <SingleSelectPreview />;

    case "multiple_select":
      return <MultipleSelectPreview />;

    case "order":
      return <OrderPreview />;

    case "match":
      return <MatchPreview />;

    case "text_answer":
      return <TextAnswerPreview />;

    case "fill_blank":
      return <FillBlankPreview />;

    case "location":
      return <LocationPreview />;

    case "guess":
      return <GuessPreview />;

    case "range":
      return <RangePreview />;

    case "tap_find":
      return <TapFindPreview />;

    case "flashcard":
      return <FlashcardPreview />;

    default:
      return null;
  }
}
