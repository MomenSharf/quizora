"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { useSelectedQuestion } from "@/features/quiz-editor/hooks/use-selected-question";
import { useIsTypeSelectorOpen } from "@/features/quiz-editor/store";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import { cn } from "@/lib/utils";

import QuestionTypeSelector from "../question-type-selector";

import { ConfigPanel } from "./question-config/config-panel";
import { SingleSelectConfig } from "./question-config/types/single-select-config";

// import { MultipleSelectConfig } from "./question-config/types/multiple-select-config";
// import { OrderingConfig } from "./question-config/types/ordering-config";
// import { TrueFalseConfig } from "./question-config/types/true-false-config";
// import { DropdownConfig } from "./question-config/types/dropdown-config";
// import { TypeAnswerConfig } from "./question-config/types/type-answer-config";
// import { FillBlankConfig } from "./question-config/types/fill-blank-config";
// import { MatchingConfig } from "./question-config/types/matching-config";
// import { RangeConfig } from "./question-config/types/range-config";
// import { TapFindConfig } from "./question-config/types/tap-find-config";
// import { GuessConfig } from "./question-config/types/guess-config";

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
// import { GessForm } from "./forms/guess-form";

export interface QuestionFormProps {
  questionIndex: number;
  toggleConfig: () => void;
}

type QuestionFormComponent = React.ComponentType<QuestionFormProps>;

export function QuestionFormRouter() {
  const [isConfigOpen, setIsConfigOpen] = useState(true);

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
    // GUESS: GessForm,
  };

  const CONFIG_MAP: Partial<
    Record<QuestionType, React.ReactNode>
  > = {
    SINGLE_SELECT: (
      <SingleSelectConfig questionIndex={questionIndex} />
    ),

    // MULTIPLE_SELECT: (
    //   <MultipleSelectConfig questionIndex={questionIndex} />
    // ),

    // TRUE_FALSE: (
    //   <TrueFalseConfig questionIndex={questionIndex} />
    // ),

    // DROPDOWN: (
    //   <DropdownConfig questionIndex={questionIndex} />
    // ),

    // ORDERING: (
    //   <OrderingConfig questionIndex={questionIndex} />
    // ),

    // TYPE_ANSWER: (
    //   <TypeAnswerConfig questionIndex={questionIndex} />
    // ),

    // FILL_BLANK: (
    //   <FillBlankConfig questionIndex={questionIndex} />
    // ),

    // MATCH: (
    //   <MatchingConfig questionIndex={questionIndex} />
    // ),

    // RANGE: (
    //   <RangeConfig questionIndex={questionIndex} />
    // ),

    // TAP_FIND: (
    //   <TapFindConfig questionIndex={questionIndex} />
    // ),

    // GUESS: (
    //   <GuessConfig questionIndex={questionIndex} />
    // ),
  };

  const Form = FORM_MAP[question.type];
  const Config = CONFIG_MAP[question.type];

  if (!Form) {
    return null;
  }

  const toggleConfig = () => {
    setIsConfigOpen((previous) => !previous);
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col xl:flex-row gap-3">
      {/* Question editor */}
      <motion.main
        layout
        transition={{
          layout: {
            type: "spring",
            stiffness: 280,
            damping: 30,
          },
        }}
        className={cn(
          "min-w-0 flex-1",
          "transition-[padding] duration-300",
          isConfigOpen
            ? "xl:pr-0"
            : "xl:flex xl:justify-center"
        )}
      >
        <motion.div
          key={question.id}
          layout
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          className={cn(
            "w-full",
            !isConfigOpen && "xl:max-w-5xl"
          )}
        >
          <Form
            questionIndex={questionIndex}
            toggleConfig={toggleConfig}
          />
        </motion.div>
      </motion.main>

      {/* Mobile / Tablet */}
      <div className="w-full xl:hidden">
        <ConfigPanel open>
          {Config}
        </ConfigPanel>
      </div>

      {/* XL+ Inspector */}
      <AnimatePresence initial={false}>
        {isConfigOpen && (
          <motion.aside
            initial={{
              width: 0,
              opacity: 0,
            }}
            animate={{
              width: 320,
              opacity: 1,
            }}
            exit={{
              width: 0,
              opacity: 0,
            }}
            transition={{
              width: {
                type: "spring",
                stiffness: 280,
                damping: 30,
              },
              opacity: {
                duration: 0.15,
              },
            }}
            className="hidden min-h-0 shrink-0 overflow-hidden xl:block"
          >
            <ConfigPanel open>
              {Config}
            </ConfigPanel>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}