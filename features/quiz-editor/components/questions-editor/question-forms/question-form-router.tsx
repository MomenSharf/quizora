"use client";

import { useSelectedQuestion } from "@/features/quiz-editor/hooks/use-selected-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import QuestionTypeSelector from "../question-type-selector";
import { SingleSelectForm } from "./forms/single-select-form";
import { Question } from "@/features/quiz-editor/validation/question";



export interface QuestionFormProps {
  question: Question;
  questionIndex: number;
}

export function QuestionFormRouter() {
  const FORM_MAP: Partial<Record<QuestionType, React.FC<QuestionFormProps>>> = {
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

  const {question, questionIndex} = useSelectedQuestion();

  if (questionIndex === -1 || !question ) {
    return null;
  }

  const type = question?.type;

  const Form = FORM_MAP[type];

  if (!Form) {
    return <QuestionTypeSelector questionId={question.id} />;
  }

  return (
    <div
      className="mx-auto w-full max-w-3xl"
    >
      <Form question={question} questionIndex={questionIndex}/>
    </div>
  );
}
