"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
//  This is correct
// import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { useSortable } from "@dnd-kit/react/sortable";
import { IconDots, IconGripVertical, IconPlus } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import { useQuizForm } from "../../hooks/use-quiz-form";
import { useEditorStore } from "../../store";
import { QuizEditor } from "../../validation/quiz";
import { QuestionTypeIcon } from "./question-type-selector/question-type-icon";

function Sortable({
  index,
  question,
  handleClick,
}: {
  index: number;
  question: QuizEditor["questions"][number];
  handleClick: () => void;
}) {
  const [element, setElement] = useState<Element | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
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
          "w-full h-12 px-1.5 cursor-pointer transition-all duration-150",
          {
            "scale-[1.02] shadow-2xl ring-2 ring-primary opacity-90 z-50":
              isDragging,
          },
        )}
        size="lg"
        tabIndex={0}
        onClick={handleClick}
      >
        <div
          ref={handleRef}
          className={cn(buttonVariants({ variant: "ghost", size: "icon-xs" }))}
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <IconGripVertical className="text-muted-foreground" />
        </div>
        <QuestionTypeIcon
          type={question.type}
          className="size-8 rounded-md"
          iconClassName="size-5"
        />

        <p className="flex-1 text-start truncate">{question.title}</p>
        <div
          className={cn(buttonVariants({ variant: "ghost", size: "icon-xs" }))}
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

// TODO: Add question selector to mobile view
const QuestionSelector = () => {
  const { control, setValue } = useQuizForm();
  const { selectQuestion } = useEditorStore();

  const questions = useWatch({
    control,
    name: "questions",
  });

  const handleClick = (questionId: string) => {
    selectQuestion(questionId);
  };

  return (
  <div className="hidden md:flex flex-col gap-3 w-full md:w-72 md:min-w-72 md:max-w-72 xl:w-80 xl:min-w-80 xl:max-w-80 rounded-lg rounded-tl-xl bg-background border-b sm:border p-3 overflow-hidden">
    <div className="flex justify-between items-center gap-1">
      <h3 className="font-semibold text-muted-foreground text-xs">
        QUESTIONS
      </h3>
      <Badge variant="outline">{questions?.length ?? 0}</Badge>
    </div>

    <div className="flex-1 overflow-y-auto scrollbar-thin pr-1">
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
        <ul className="flex flex-col gap-0.5 list-none">
          {questions?.map((question, index) => (
            <Sortable
              key={question.id}
              index={index}
              question={question}
              handleClick={() => handleClick(question.id)}
            />
          ))}
        </ul>
      </DragDropProvider>
    </div>

    <Button className="shrink-0">
      <IconPlus />
      Add Question
    </Button>
  </div>
);
};

export default QuestionSelector;
