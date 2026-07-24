"use client";

import { useSelectedQuestion } from "@/features/quiz-editor/hooks/use-selected-question";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import QuestionTypeSelector from "../question-type-selector";
import { SingleSelectForm } from "./forms/single-select-form";
import { MultipleSelectForm } from "./forms/multiple-select-form";
import { OrdeingrForm } from "./forms/ordering-form";
import { useIsTypeSelectorOpen } from "@/features/quiz-editor/store";
import { TrueFalseForm } from "./forms/true-false-form";
import { DropdownForm } from "./forms/dropdown-form";
import { TypeAnswerForm } from "./forms/type-answer-form";
import { FillinTheBlankForm } from "./forms/fill-in-the-blank-form";
import { AnimatePresence, motion } from "framer-motion";
import { MatchingForm } from "./forms/matching-form";

export interface QuestionFormProps {
  questionIndex: number;
}

export function QuestionFormRouter() {
  const FORM_MAP: Partial<Record<QuestionType, React.FC<QuestionFormProps>>> = {
    SINGLE_SELECT: SingleSelectForm,
    MULTIPLE_SELECT: MultipleSelectForm,
    TRUE_FALSE: TrueFalseForm,
    DROPDOWN: DropdownForm,
    ORDERING: OrdeingrForm,
    TYPE_ANSWER: TypeAnswerForm,
    FILL_BLANK: FillinTheBlankForm,
    MATCH: MatchingForm,
    

  
  };

  const { question, questionIndex } = useSelectedQuestion();
  const isTypeSelectorOpen = useIsTypeSelectorOpen();

  if (isTypeSelectorOpen) {
    return <QuestionTypeSelector />;
  }

  if (questionIndex === -1 || !question) {
    return null;
  }

  const type = question?.type;

  const Form = FORM_MAP[type];

  if (!Form) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.15,
          }}
          className="h-full w-full"
        >
          <Form questionIndex={questionIndex} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
