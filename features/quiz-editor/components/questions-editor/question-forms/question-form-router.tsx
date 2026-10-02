"use client";

import { AnimatePresence, motion } from "framer-motion";

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

import { DropdownConfig } from "./question-config/types/drowpdown-config";
import { FillBlankConfig } from "./question-config/types/fill-blank-config";
import { MatchConfig } from "./question-config/types/match-config";
import { MultipleSelectConfig } from "./question-config/types/multiple-select-config";
import { OrderingConfig } from "./question-config/types/ordering-config";
import { RangeConfig } from "./question-config/types/range-config";
import { TapFindConfig } from "./question-config/types/tap-find-config";
import { TypeAnswerConfig } from "./question-config/types/type-answer";
import { TrueFalseConfig } from "./question-config/types/true-false-config";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { useWatch } from "react-hook-form";

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
};

export function QuestionFormRouter() {
  const { question, questionIndex , hasQuestions } = useSelectedQuestion();
  const isTypeSelectorOpen = useIsTypeSelectorOpen();
;

  if (isTypeSelectorOpen || !hasQuestions) {
    return <QuestionTypeSelector />;
  }

  if (questionIndex === -1 || !question) {
    return null;
  }

  const Form = FORM_MAP[question.type];

  if (!Form) {
    return null;
  }

  const Config = (
    <>
      {question.type === "SINGLE_SELECT" && (
        <SingleSelectConfig questionIndex={questionIndex} />
      )}

      {question.type === "DROPDOWN" && (
        <DropdownConfig questionIndex={questionIndex} />
      )}

      {question.type === "FILL_BLANK" && (
        <FillBlankConfig questionIndex={questionIndex} />
      )}

      {question.type === "MATCH" && (
        <MatchConfig questionIndex={questionIndex} />
      )}

      {question.type === "MULTIPLE_SELECT" && (
        <MultipleSelectConfig questionIndex={questionIndex} />
      )}

      {question.type === "ORDERING" && (
        <OrderingConfig questionIndex={questionIndex} />
      )}

      {question.type === "RANGE" && (
        <RangeConfig questionIndex={questionIndex} />
      )}

      {question.type === "TAP_FIND" && (
        <TapFindConfig questionIndex={questionIndex} />
      )}

      {question.type === "TYPE_ANSWER" && (
        <TypeAnswerConfig questionIndex={questionIndex} />
      )}

      {question.type === "TRUE_FALSE" && (
        <TrueFalseConfig questionIndex={questionIndex} />
      )}
    </>
  );

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-3 xl:flex-row">
      <main className="min-w-0 flex-1 xl:flex xl:justify-center">
        <div className="w-full xl:max-w-5xl">
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
      </main>

      <div className="w-full xl:hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={question.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {Config}
          </motion.div>
        </AnimatePresence>
      </div>

      <aside className="hidden min-h-0 w-80 shrink-0 overflow-hidden xl:block">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={question.id}
            initial={{ opacity: 0,}}
            animate={{ opacity: 1,  }}
            exit={{ opacity: 0, }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {Config}
          </motion.div>
        </AnimatePresence>
      </aside>
    </div>
  );
}
