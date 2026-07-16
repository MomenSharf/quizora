"use client";

import { useSelectedQuestion } from "@/features/quiz-editor/hooks/use-selected-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import QuestionTypeSelector from "../question-type-selector";
import { SingleSelectForm } from "./forms/single-select-form";
import { Question } from "@/features/quiz-editor/validation/question";
import { MultipleSelectForm } from "./forms/multiple-select-form";
import { OrdeingrForm } from "./forms/ordering-form";
import { useIsTypeSelectorOpen } from "@/features/quiz-editor/store";

export interface QuestionFormProps {
  question: Question;
  questionIndex: number;
}

export function QuestionFormRouter() {
  const FORM_MAP: Partial<Record<QuestionType, React.FC<QuestionFormProps>>> = {
    SINGLE_SELECT: SingleSelectForm,
    MULTIPLE_SELECT: MultipleSelectForm,
    // TRUE_FALSE: TrueFalseForm,
    // FILL_BLANK: FillBlankForm,
    ORDERING: OrdeingrForm,
    // MATCH: MatchForm,
    // DROPDOWN: DropdownForm,
    // GUESS: GuessForm,
    // PINPOINT: PinpointForm,
    // LOCATION: LocationForm,
  };

  const { question, questionIndex } = useSelectedQuestion();
  const isTypeSelectorOpen = useIsTypeSelectorOpen();

  if (isTypeSelectorOpen) {
    return <QuestionTypeSelector  />;
  }

  if (questionIndex === -1 || !question) {
    return null;
  }

  const type = question?.type;

  const Form = FORM_MAP[type];

  if (!Form) {
    return null
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Form question={question} questionIndex={questionIndex} />
    </div>
  );
}
