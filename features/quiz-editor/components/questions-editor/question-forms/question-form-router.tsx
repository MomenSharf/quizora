
"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useSelectedQuestion } from "@/features/quiz-editor/hooks/use-selected-question";
import { useIsTypeSelectorOpen } from "@/features/quiz-editor/store";

import { QuestionType } from "@/lib/db/generated/prisma/enums";

import QuestionTypeSelector from "../question-type-selector";

import { DropdownForm } from "./forms/dropdown-form";
import { FillinTheBlankForm } from "./forms/fill-in-the-blank-form";
import { MatchingForm } from "./forms/matching-form";
import { MultipleSelectForm } from "./forms/multiple-select-form";
import { OrdeingrForm } from "./forms/ordering-form";
import { RangeForm } from "./forms/range-form";
import { SingleSelectForm } from "./forms/single-select-form";
import { TapFindForm } from "./forms/tap-find-form";
import { TrueFalseForm } from "./forms/true-false-form";
import { TypeAnswerForm } from "./forms/type-answer-form";
import { FlashcardForm } from "./forms/flashcard-from";

export interface QuestionFormProps {
  questionIndex: number;
}

type QuestionFormComponent = React.ComponentType<QuestionFormProps>;

const FORM_MAP: Partial<Record<QuestionType, QuestionFormComponent>> = {
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
  FLASHCARD: FlashcardForm,
};

export function QuestionFormRouter() {
  const { question, questionIndex, hasQuestions } = useSelectedQuestion();
  const isTypeSelectorOpen = useIsTypeSelectorOpen();

  if (isTypeSelectorOpen || !hasQuestions) {
    return <QuestionTypeSelector />;
  }

  if (!question || questionIndex === -1) {
    return null;
  }

  const Form = FORM_MAP[question.type];

  if (!Form) {
    return null;
  }

  return (
    <div className="flex min-h-0 w-full flex-1 justify-center">
      <div className="w-full max-w-3xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={question.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            <Form questionIndex={questionIndex} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
