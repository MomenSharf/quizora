"use client";

import { Badge } from "@/components/ui/badge";
import { QUESTION_TYPES } from "@/features/quiz-editor/constants/question-types";
import QuestionTypeCard from "./question-type-card";

type Props = {
  onSelect?: (typeId: string) => void;
};

export default function QuestionTypeSelector({ onSelect }: Props) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Choose a question type
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Pick the format that best fits your question. Each type provides a
            different way for learners to interact and respond.
          </p>
        </div>

        <Badge variant="outline" className="text-muted-foreground">
          <span className="size-2 rounded-full bg-emerald-500" />
          {QUESTION_TYPES.length} question types
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
        {" "}
        {QUESTION_TYPES.map((type) => {
          return <QuestionTypeCard key={type.id} type={type} />;
        })}
      </div>
    </div>
  );
}
