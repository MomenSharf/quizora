"use client";

import { useSelectedQuestion } from "@/features/quiz-editor/hooks/use-selected-question";
import { useIsTypeSelectorOpen } from "@/features/quiz-editor/store";
import { QuestionType } from "@/lib/db/generated/prisma/enums";

import QuestionTypeSelector from "../question-type-selector";

import { SingleSelectConfig } from "./question-config/types/single-select-config";

import { SingleSelectForm } from "./forms/single-select-form";
import { MultipleSelectForm } from "./forms/multiple-select-form";
import { OrdeingrForm } from "./forms/ordering-form";
import { TrueFalseForm } from "./forms/true-false-form";
import { DropdownForm } from "./forms/dropdown-form";
import { TypeAnswerForm } from "./forms/type-answer-form";
import { FillinTheBlankForm } from "./forms/fill-in-the-blank-form";
import { MatchingForm } from "./forms/matching-form";
import { RangeForm } from "./forms/range-form";
import { TapFindForm } from "./forms/tap-find-form";

export interface QuestionFormProps {
  questionIndex: number;
}

type QuestionFormComponent = React.ComponentType<QuestionFormProps>;

export function QuestionFormRouter() {
  const { question, questionIndex } = useSelectedQuestion();
  const isTypeSelectorOpen = useIsTypeSelectorOpen();

  if (isTypeSelectorOpen) {
    return <QuestionTypeSelector />;
  }

  if (questionIndex === -1 || !question) {
    return null;
  }

  const FORM_MAP: Partial<
    Record<QuestionType, QuestionFormComponent>
  > = {
    SINGLE_SELECT: SingleSelectForm,
    MULTIPLE_SELECT: MultipleSelectForm,
    TRUE_FALSE: TrueFalseForm,
    DROPDOWN: DropdownForm,
    ORDERING: OrdeingrForm,
    TYPE_ANSWER: TypeAnswerForm,
    FILL_BLANK: FillinTheBlankForm,
    MATCH: MatchingForm,
    RANGE: RangeForm,
    TAP_FIND: TapFindForm,
  };

  const CONFIG_MAP: Partial<Record<QuestionType, React.ReactNode>> = {
    SINGLE_SELECT: (
      <SingleSelectConfig questionIndex={questionIndex} />
    ),
  };

  const Form = FORM_MAP[question.type];
  const Config = CONFIG_MAP[question.type];

  if (!Form) {
    return null;
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-3 xl:flex-row">
      <main className="min-w-0 flex-1 xl:flex xl:justify-center">
        <div className="w-full xl:max-w-5xl">
          <Form questionIndex={questionIndex} />
        </div>
      </main>

      <div className="w-full xl:hidden">
        {Config}
      </div>

      <aside className="hidden min-h-0 w-80 shrink-0 overflow-hidden xl:block">
        {Config}
      </aside>
    </div>
  );
}