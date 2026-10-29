"use client";

import type { Question } from "@/features/quiz-editor/validation/question";
import SingleSelectContent from "./question-content/single-select";
import { RuntimeQuestion } from "../../types/runtime-types";

export type QuestionContentRouterProps = {
  runtimeQuestion: RuntimeQuestion;
  isLocked: boolean;
  isSubmitted: boolean;
};

export default function QuestionContentRouter({
  runtimeQuestion,
  isLocked,
  isSubmitted,
}: QuestionContentRouterProps) {
  return (
    <div className="h-full w-full">
      {renderQuestionContent({ runtimeQuestion, isLocked, isSubmitted })}
    </div>
  );
}

function renderQuestionContent(props: QuestionContentRouterProps) {
  switch (props.runtimeQuestion.question.type) {
    case "SINGLE_SELECT":
      return <SingleSelectContent {...props} />;

    case "MULTIPLE_SELECT":
      return null;

    case "TRUE_FALSE":
      return null;

    case "ORDERING":
      return null;

    case "MATCH":
      return null;

    case "TYPE_ANSWER":
      return null;

    case "FILL_BLANK":
      return null;

    case "FLASHCARD":
      return null;

    case "RANGE":
      return null;

    case "GUESS":
      return null;

    case "TAP_FIND":
      return null;

    case "DROPDOWN":
      return null;

    default:
      return null;
  }
}
