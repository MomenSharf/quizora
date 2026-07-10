"use client";

import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import QuestionTypeSelector from "../question-type-selector";
import { SingleSelectForm } from "./forms/single-select-form";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import { useSelectedQuestion } from "@/features/quiz-editor/hooks/use-selected-question";



interface Props {
  questionId: string;
}

export function QuestionFormRouter({ questionId }: Props) {

const FORM_MAP: Partial<Record<QuestionType, React.FC<Props>>> = {
  SINGLE_SELECT: SingleSelectForm,
  // MULTIPLE_SELECT: MultipleSelectForm,
  // TRUE_FALSE: TrueFalseForm,
  // FILL_BLANK: FillBlankForm,
  // ORDER: OrderForm,
  // MATCH: MatchForm,
  // DROPDOWN: DropdownForm,
  // GUESS: GuessForm,
  // PINPOINT: PinpointForm,
  // LOCATION: LocationForm,
};

const {questionIndex, question} = useSelectedQuestion()
  if (questionIndex === -1) {
    return null;
  }

  const type = question?.type

  if (!type) {
    return (
      <QuestionTypeSelector
        questionId={questionId}
      />
    );
  }

  const Form = FORM_MAP[type];

  if (!Form) {
    return (
      <QuestionTypeSelector
        questionId={questionId}
      />
    );
  }

  return (
    <Form
      questionId={questionId}
    />
  );
}