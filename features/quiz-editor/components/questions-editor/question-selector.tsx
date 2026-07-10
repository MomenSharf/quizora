"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { IconDots, IconPlus } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { QuestionTypeIcon } from "./question-type-selector/question-type-icon";
import { useQuizForm } from "../../hooks/use-quiz-form";
import { useWatch } from "react-hook-form";
import { QuizEditorInput } from "../../validation/quiz";

function Sortable({
  index,
  question,
}: {
  index: number;
  question: NonNullable<QuizEditorInput["questions"]>[number];
}) {
  const [element, setElement] = useState<Element | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);
  const { isDragging } = useSortable({
    id: question.id,
    index,
    element,
    handle: handleRef,
  });

  return (
    <li
      ref={setElement}
      className="w-full"
      data-shadow={isDragging || undefined}
    >
      <Button
        variant="ghost"
        className={cn(
          "w-full h-12 px-1.5 cursor-grab transition-all duration-150",
          {
            "cursor-grabbing scale-[1.02] shadow-2xl ring-2 ring-primary opacity-90 rotate-[0.5deg] z-50":
              isDragging,
          },
        )}
        size="lg"
        ref={handleRef}
        tabIndex={0}
      >
        <QuestionTypeIcon
          type={"SINGLE_SELECT"}
          className="size-8 rounded-md"
          iconClassName="size-5"
        />

        <p className="flex-1 text-start truncate">{question.title}</p>
        <div
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <IconDots className="text-muted-foreground" />
        </div>
      </Button>
    </li>
  );
}

const QuestionSelector = () => {
  const { control, setValue  } = useQuizForm();

  const questions = useWatch({
    control,
    name: "questions",
  });

  return (
    <div className="hidden rounded-lg rounded-tl-xl md:flex flex-col gap-3  w-full md:w-56  md:min-w-56 lg:w-72 lg:min-w-60 overflow-y-auto scrollbar-thin p-3 bg-background border-b sm:border">
      <div className="flex justify-between items-center gap-1">
        <h3 className="font-semibold text-muted-foreground text-xs">
          QUESTIONS
        </h3>
        <Badge variant="outline">10</Badge>
      </div>
      <DragDropProvider
        onDragEnd={(event) => {
          if (!questions) return;

          const nextQuestions = move(questions, event);

          setValue("questions", nextQuestions, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: false,
          });
        }}
      >
        <ul className="flex flex-col gap-0.5 items-center list-none">
          {questions &&
            questions.map((question, index) => (
              <Sortable key={question.id} index={index} question={question} />
            ))}
        </ul>
      </DragDropProvider>
      <Button>
        <IconPlus />
        Add Question
      </Button>
    </div>
  );
};

export default QuestionSelector;
