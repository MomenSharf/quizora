"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { createId } from "@paralleldrive/cuid2";
import {
  IconChevronDown,
  IconGripVertical,
  IconPlus,
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import {
  QUESTION_TYPE_COLORS,
  QUESTION_TYPE_LABELS,
} from "../../constants/question-types";
import { createDefaultQuestion } from "../../create-defaults/questions/create-default-question";
import { useQuizForm } from "../../hooks/use-quiz-form";
import { useSelectedQuestion } from "../../hooks/use-selected-question";
import {
  useEditorActions,
  useIsQuestionSelectorOpen,
  useSelectedQuestionId,
} from "../../store";
import { Question } from "../../validation/question";
import { ActionsDropdown } from "./actions-dropdown";
import { QuestionTypeIcon } from "./question-type-selector/question-type-icon";
import { hasFieldError } from "../../lib/has-field-error";

import { AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { motion } from "framer-motion";

function Sortable({
  index,
  question,
  handleClick,
  isSelected,
  moveUp,
  moveDown,
  canMoveUp,
  canMoveDown,
  hasError,
}: {
  index: number;
  question: Question;
  handleClick: () => void;
  isSelected: boolean;
  moveUp: () => void;
  moveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  hasError: boolean;
}) {
  const [element, setElement] = useState<Element | null>(null);

  const handleRef = useRef<HTMLDivElement | null>(null);

  const { isDragging } = useSortable({
    id: question.id,
    index,
    element,
    handle: handleRef,
  });

  const { control, setValue, resetField, formState: { dirtyFields } } = useQuizForm();
  const { selectQuestion } = useEditorActions();

  const questions = useWatch({
    control,
    name: "questions",
  });

  const { question: selectedQuestion } = useSelectedQuestion();

  const questionIndex = questions.findIndex((q) => q.id === question.id);

  const canReset = !!dirtyFields.questions?.[questionIndex];

  const onSelect = () => {
    selectQuestion(question.id);
  };

  const onDuplicate = () => {
    const newQuestion = structuredClone(question);

    newQuestion.id = createId();
    newQuestion.title = `${question.title} (Copy)`;

    setValue("questions", [...questions, newQuestion]);

    setTimeout(() => {
      selectQuestion(newQuestion.id);
    }, 10);
  };

  const onReset = () => resetField(`questions.${questionIndex}`);

  const onDelete = () => {
    if (questionIndex === -1) return;

    const nextQuestions = questions.filter((q) => q.id !== question.id);

    setValue("questions", nextQuestions);

    const nextSelected =
      nextQuestions[questionIndex] ?? nextQuestions[questionIndex - 1];

    setTimeout(() => {
      if (question.id === selectedQuestion?.id) {
        selectQuestion(nextSelected?.id ?? null);
      }
    }, 10);
  };

  const color = QUESTION_TYPE_COLORS[question.type];

  return (
    <li
      ref={setElement}
      className="w-full"
      data-shadow={isDragging || undefined}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "group relative flex h-12 w-full cursor-pointer items-center rounded-md px-1.5 transition-all duration-150",
          {
            "z-50 scale-[1.02] opacity-90 shadow-2xl ring-2": isDragging,
            "shadow-sm": isSelected,
          },
        )}
        style={
          {
            ...(isSelected && {
              borderColor: `${color}66`,
              backgroundColor: `${color}14`,
              color,
            }),
            ...(isDragging && {
              borderColor: color,
              "--tw-ring-color": `${color}88`,
            }),
          } as React.CSSProperties
        }
      >
        <div
          ref={handleRef}
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon-xs",
            }),
          )}
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          style={{
            touchAction: "none",
          }}
        >
          <IconGripVertical className="text-muted-foreground" />
        </div>

        <QuestionTypeIcon
          type={question.type}
          className="size-8 rounded-md"
          iconClassName="size-5"
        />

        <p className="flex-1 truncate text-start">
          {question.title?.replace(/<[^>]*>/g, "").trim()
            ? question.title.replace(/<[^>]*>/g, "").trim()
            : QUESTION_TYPE_LABELS[question.type]}
        </p>

        {hasError && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className="mr-1 flex size-7 shrink-0 items-center justify-center rounded-md text-destructive"
                onClick={(e) => e.stopPropagation()}
              >
                <AlertCircle className="size-4" />
              </span>
            </TooltipTrigger>

            <TooltipContent side="right">
              <p>This question has validation issues</p>
            </TooltipContent>
          </Tooltip>
        )}

        <ActionsDropdown
          onDuplicate={onDuplicate}
          onDelete={onDelete}
          canDelete
          onReset={onReset}
          canReset={canReset}
          onSelect={onSelect}
          canMoveDown={canMoveDown}
          canMoveUp={canMoveUp}
          moveDown={moveDown}
          moveUp={moveUp}
        />
      </div>
    </li>
  );
}

const QuestionSelector = () => {
  const { control, setValue, getFieldState } = useQuizForm();

  const selectedQuestionId = useSelectedQuestionId();
  const isQuestionSelectorOpen = useIsQuestionSelectorOpen();

  const { selectQuestion, setTypeSelectorOpen, setQuestionSelectorOpen } =
    useEditorActions();

  const questions = useWatch({
    control,
    name: "questions",
  });

  const moveQuestion = (from: number, to: number) => {
    if (!questions) return;
    if (to < 0 || to >= questions.length) return;

    const nextQuestions = [...questions];
    const [item] = nextQuestions.splice(from, 1);

    nextQuestions.splice(to, 0, item);

    setValue("questions", nextQuestions, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: false,
    });
  };

if (questions.length === 0) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex w-full flex-1 flex-col border-r bg-background md:w-72 md:min-w-72 md:max-w-72 xl:w-80 xl:min-w-80 xl:max-w-80"
    >
      <div className="flex items-center p-3">
        <h3 className="text-xs font-semibold text-muted-foreground">
          QUESTIONS
        </h3>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center p-4">
        <div className="flex w-full max-w-60 flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.25 }}
            className="mb-4 flex size-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary"
          >
            <IconPlus className="size-5" />
          </motion.div>

          <h4 className="text-sm font-semibold">No questions yet</h4>

          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Choose a question type from the panel to get started.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full md:w-72 md:min-w-72 md:max-w-72 xl:w-80 xl:min-w-80 xl:max-w-80 bg-background border-r flex flex-1 flex-col"
    >
      <div
        className="flex cursor-pointer items-center gap-1 p-3 max-md:hover:bg-muted/40 md:pointer-events-none"
        onClick={() => setQuestionSelectorOpen(!isQuestionSelectorOpen)}
      >
        <h3 className="mr-auto text-xs font-semibold text-muted-foreground">
          QUESTIONS
        </h3>

        <Badge variant="outline">{questions?.length ?? 0}</Badge>

        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-lg max-md:cursor-pointer md:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setQuestionSelectorOpen(!isQuestionSelectorOpen);
          }}
        >
          <IconChevronDown
            className={cn("size-4", isQuestionSelectorOpen && "rotate-180")}
          />
        </Button>
      </div>

      <div
        className={cn(
          "flex-1 overflow-hidden md:block",
          isQuestionSelectorOpen ? "block" : "hidden md:block",
        )}
      >
        <div className="flex h-full flex-col p-2 pt-0">
          <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto pb-2">
            <DragDropProvider
              onDragEnd={(event) => {
                if (!questions || event.canceled) return;

                const nextQuestions = move(questions, event);

                setValue("questions", nextQuestions, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: false,
                });
              }}
            >
              <ul className="flex list-none flex-col gap-0.5">
                {questions?.map((question, index) => {
                  const isSelected = selectedQuestionId === question.id;

                  const canMoveUp = index > 0;
                  const canMoveDown = index < questions.length - 1;

                  const hasError = hasFieldError(
                    getFieldState,
                    `questions.${index}`,
                  );

                  return (
                    <Sortable
                      key={question.id}
                      index={index}
                      question={question}
                      handleClick={() => {
                        selectQuestion(question.id);
                        setQuestionSelectorOpen(false);
                      }}
                      isSelected={isSelected}
                      moveUp={() => moveQuestion(index, index - 1)}
                      moveDown={() => moveQuestion(index, index + 1)}
                      canMoveUp={canMoveUp}
                      canMoveDown={canMoveDown}
                      hasError={hasError}
                    />
                  );
                })}
              </ul>
            </DragDropProvider>
          </div>

          <Button
            onClick={() => {
              selectQuestion(null);
              setTypeSelectorOpen(true);
            }}
            size="lg"
            className="group relative w-full cursor-pointer overflow-hidden rounded-xl border border-primary/20 bg-linear-to-r from-primary to-primary/90 px-5 py-6 font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

            <div className="relative flex items-center justify-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:rotate-90">
                <IconPlus className="size-4" />
              </div>

              <span>Add Question</span>
            </div>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionSelector;
