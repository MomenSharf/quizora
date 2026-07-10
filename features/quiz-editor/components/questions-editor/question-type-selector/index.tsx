"use client";

import { Badge } from "@/components/ui/badge";
import { QUESTION_TYPES } from "@/features/quiz-editor/constants/question-types";
import QuestionTypeHoverCard from "./question-type-hover-card";


export default function QuestionTypeSelector({ questionId }: { questionId: string }) {
  return (
    <div className="space-y-8">
     <div className="flex items-center justify-between gap-4">
  <div className="space-y-1">
    <h2 className="text-xl font-semibold tracking-tight">
      Choose a question type
    </h2>
    <p className="text-sm text-muted-foreground">
      Select how learners will answer your question.
    </p>
  </div>

  <Badge variant="secondary" className="gap-2 rounded-full px-3 py-1">
    <span className="size-2 rounded-full bg-emerald-500" />
    {QUESTION_TYPES.length} Types
  </Badge>
</div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
        {" "}
        {QUESTION_TYPES.map((type) => {
          return <QuestionTypeHoverCard key={type.id} type={type}  />;
        })}
      </div>
    </div>
  );
}
