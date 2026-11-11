"use client";

import type { RuntimeQuestion } from "../../types/runtime-types";
import ChoiceContent from "./question-content/choice-content";
import MultipleSelectContent from "./question-content/multiple-select";
import SingleSelectContent from "./question-content/single-select";
import TrueFalseContent from "./question-content/true-false";

export type QuestionContentRouterProps = {
  runtimeQuestion: RuntimeQuestion;
  isLocked: boolean;
  isSubmitted: boolean;
  isTimeout: boolean;
  shouldAnimateFeedback: boolean;
};

export default function QuestionContentRouter(
  props: QuestionContentRouterProps,
) {
  switch (props.runtimeQuestion.question.type) {
    case "SINGLE_SELECT":
    case "MULTIPLE_SELECT":
    case "TRUE_FALSE":
      return <ChoiceContent {...props} />;
    case "ORDERING":
    case "MATCH":
    case "TYPE_ANSWER":
    case "FILL_BLANK":
    case "FLASHCARD":
    case "RANGE":
    case "GUESS":
    case "TAP_FIND":
    case "DROPDOWN":
      return null;

    default:
      return null;
  }
}
