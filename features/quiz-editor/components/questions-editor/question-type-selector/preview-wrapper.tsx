"use client";

import { QuestionTypeUI } from "@/features/quiz-editor/types/question-types";
import { Lightbulb } from "lucide-react";
import { QuestionTypeIcon } from "./question-type-icon";

export default function PreviewWrapper({
  type,
  children,
}: {
  type: QuestionTypeUI;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-card">
      <div className="border-b p-3">
        <div className="flex items-center gap-3">
          <QuestionTypeIcon icon={type.icon} color={type.color} className="size-10 rounded-md" iconClassName="size-5" />

          <div>
            <h3 className="font-semibold">{type.label}</h3>

            <p className="text-sm text-muted-foreground">{type.description}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-3">
        <div>{children}</div>

        <div className="rounded-xl border bg-muted/40 p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-500" />

            <div>
              <p className="text-sm font-medium">Best for</p>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {type.bestFor}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
