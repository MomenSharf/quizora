"use client";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { createId } from "@paralleldrive/cuid2";
import { IconArrowBarToDown, IconArrowBarToUp, IconCopy, IconDots, IconFocus, IconRotateClockwise, IconTrash } from "@tabler/icons-react";
import { useWatch } from "react-hook-form";
import { createDefaultQuestion } from "../../create-defaults/questions/create-default-question";
import { useQuizForm } from "../../hooks/use-quiz-form";
import { useSelectedQuestion } from "../../hooks/use-selected-question";
import { useEditorActions } from "../../store";
import { Question } from "../../validation/question";

export function QuestionActionsDropdown({
  question,
  moveUp,
  moveDown,
  canMoveUp,
  canMoveDown,
}: {
  question: Question;
  moveUp: () => void;
  moveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const { question: selectedQuestion } = useSelectedQuestion();

  const { selectQuestion } = useEditorActions();

  const { control, setValue } = useQuizForm();

  const questions = useWatch({
    control,
    name: "questions",
  });

  const questionIndex = questions.findIndex((q) => q.id === question.id);

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
    }, 50);
  };

  const onReset = () => {
    if (questionIndex === -1) return;

    const nextQuestions = [...questions];

    nextQuestions[questionIndex] = {
      ...createDefaultQuestion(question.type),
      id: question.id,
    };

    setValue("questions", nextQuestions);
  };

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
    }, 50);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon-sm"
          variant="ghost"
          className="rounded-lg text-muted-foreground hover:text-foreground"
        >
          <IconDots className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
        <DropdownMenuItem
          onClick={onSelect}
          className="cursor-pointer rounded-md"
        >
          <IconFocus  className="mr-2 size-4" />
          Select
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onDuplicate}
          className="cursor-pointer rounded-md"
        >
          <IconCopy className="mr-2 size-4" />
          Duplicate
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={moveUp}
          className="cursor-pointer rounded-md"
          disabled={!canMoveUp}
        >
          <IconArrowBarToUp  className="mr-2 size-4" />
          Move to top
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={moveDown}
          className="cursor-pointer rounded-md"
          disabled={!canMoveDown}
        >
          <IconArrowBarToDown className="mr-2 size-4" />
          Move to bottom
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onReset}
          className="cursor-pointer rounded-md"
        >
          <IconRotateClockwise className="mr-2 size-4" />
          Reset question
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onDelete}
          className="cursor-pointer rounded-md text-destructive focus:text-primary-foreground focus:bg-destructive group:"
        >
          <IconTrash className="mr-2 size-4 group-focus:text-destructive" />
          Delete question
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
