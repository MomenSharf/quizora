"use client";

import {
  ArrowDownToLine,
  ArrowUpToLine,
  Copy,
  MoreHorizontal,
  RotateCcw,
  Target,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { createId } from "@paralleldrive/cuid2";
import { useFieldArray } from "react-hook-form";
import { createDefaultQuestion } from "../../create-defaults/questions/create-default-question";
import { useQuizForm } from "../../hooks/use-quiz-form";
import { useEditorActions } from "../../store";
import { Question } from "../../validation/question";

interface QuestionActionsDropdownProps {
  onSelect?: () => void;
  onDuplicate?: () => void;
  onMoveToTop?: () => void;
  onMoveToBottom?: () => void;
  onReset?: () => void;
  onDelete?: () => void;
}

export function QuestionActionsDropdown({ question }: { question: Question }) {
  const { selectQuestion } = useEditorActions();

  const { control , setValue } = useQuizForm();

  const { append, fields, remove } = useFieldArray({
    control,
    name: `questions`,
  });

  const questionIndex = fields.findIndex((q) => q.id === question.id);
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log(fields);
  console.log(question.id); // this is different from questionIndex
  console.log(questionIndex); // this is the same as question.id

  const onSelect = () => {
    selectQuestion(question.id);
  };

  const onDuplicate = () => {
    const newQuestion = structuredClone(question);
    newQuestion.id = createId();
    newQuestion.title = `${question.title} (Copy)`;
    append(newQuestion);

    setTimeout(() => {
      selectQuestion(newQuestion.id);
    }, 100);
  };

  const onReset = () => {
   setValue(`questions.${questionIndex}`, createDefaultQuestion(question.type));
  };
  const onDelete = () => {
    remove(questionIndex);

    const nextQuestion = fields[questionIndex + 1] ?? fields[questionIndex - 1];

    selectQuestion(nextQuestion?.id ?? null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon-sm"
          variant="ghost"
          className="rounded-lg text-muted-foreground hover:text-foreground"
        >
          <MoreHorizontal className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
        <DropdownMenuItem
          onClick={onSelect}
          className="cursor-pointer rounded-md"
        >
          <Target className="mr-2 size-4" />
          Select
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onDuplicate}
          className="cursor-pointer rounded-md"
        >
          <Copy className="mr-2 size-4" />
          Duplicate
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          // onClick={onMoveToTop}
          className="cursor-pointer rounded-md"
        >
          <ArrowUpToLine className="mr-2 size-4" />
          Move to top
        </DropdownMenuItem>

        <DropdownMenuItem
          // onClick={onMoveToBottom}
          className="cursor-pointer rounded-md"
        >
          <ArrowDownToLine className="mr-2 size-4" />
          Move to bottom
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onReset}
          className="cursor-pointer rounded-md"
        >
          <RotateCcw className="mr-2 size-4" />
          Reset question
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onDelete}
          className="cursor-pointer rounded-md text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 size-4" />
          Delete question
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
