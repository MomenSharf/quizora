"use client";

import type { RuntimeQuestion } from "../../types/runtime-types";
import SingleSelectContent from "./question-content/single-select";

export type QuestionContentRouterProps = {
  runtimeQuestion: RuntimeQuestion;
};

export default function QuestionContentRouter(
  props: QuestionContentRouterProps,
) {
  switch (props.runtimeQuestion.question.type) {
    case "SINGLE_SELECT":
      return <SingleSelectContent {...props} />;

    case "MULTIPLE_SELECT":
    case "TRUE_FALSE":
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
