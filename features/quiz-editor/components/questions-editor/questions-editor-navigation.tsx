"use client";

import { useRef, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { move } from "@dnd-kit/helpers";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  IconDots,
  IconDragDrop2,
  IconMenu4,
  IconPick,
} from "@tabler/icons-react";
import { GripVertical } from "lucide-react";

function Sortable({
  id,
  index,
  question,
}: {
  id: number;
  index: number;
  question: { id: number; prompt: string; type: string };
}) {
  const [element, setElement] = useState<Element | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);
  const { isDragging } = useSortable({ id, index, element, handle: handleRef });

  return (
    <li
      ref={setElement}
      className="w-full"
      data-shadow={isDragging || undefined}
    >
      <Button
        variant="ghost"
        className={cn("w-full h-12 px-1.5 cursor-grab transition-all duration-150", {
          "cursor-grabbing scale-[1.02] shadow-2xl ring-2 ring-primary opacity-90 rotate-[0.5deg] z-50":
            isDragging,
        })}
        size="lg"
        ref={handleRef}
        tabIndex={0}
      >
        <IconPick className="text-muted-foreground size-5 mr-1" />

        <p className="flex-1 text-start truncate">
          {question.prompt}
        </p>
        <div
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          tabIndex={0}
        >
          <IconDots className="text-muted-foreground" />
        </div>
      </Button>
    </li>
  );
}

const QuestionEditorNavigation = () => {
  const [questions, setQuestions] = useState([
    { id: 1, prompt: "Question 1", type: "multiple_choice" },
    // { id: 2, prompt: "Question 2", type: "checkbox" },
    // { id: 3, prompt: "Question 3", type: "short_text" },
    // { id: 4, prompt: "Question 4", type: "long_text" },
    // { id: 5, prompt: "Question 5", type: "true_false" },
    // { id: 6, prompt: "Question 6", type: "rating" },
    // { id: 7, prompt: "Question 7", type: "multiple_choice" },
    // { id: 8, prompt: "Question 8", type: "checkbox" },
    // { id: 9, prompt: "Question 9", type: "short_text" },
    // { id: 10, prompt: "Question 10", type: "long_text" },
  ]);

  return (
    <div className="flex flex-col gap-1 sm:gap-2 w-full sm:w-3xs overflow-y-auto scrollbar-thin py-2 bg-sidebar border-b sm:border-r">
      <h3 className="font-semibold text-muted-foreground text-sm px-2">QUESTIONS</h3>
      <DragDropProvider
        onDragEnd={(event) => {
          setQuestions((questions) => move(questions, event));
        }}
      >
        <ul className="flex flex-col gap-0.5 items-center list-none">
          {questions.map((question, index) => (
            <Sortable
              key={question.id}
              id={question.id}
              index={index}
              question={question}
            />
          ))}
        </ul>
      </DragDropProvider>
    </div>
  );
};

export default QuestionEditorNavigation;
