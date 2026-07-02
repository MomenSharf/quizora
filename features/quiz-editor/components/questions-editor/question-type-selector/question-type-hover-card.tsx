"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { QuestionTypeUI } from "@/features/quiz-editor/types/question-types";
import QuestionTypeCard from "./question-type-card";
import PreviewRouter from "./preview-router";
import PreviewWrapper from "./preview-wrapper";
import { useState } from "react";

export default function QuestionTypeHoverCard({
  type,
}: {
  type: QuestionTypeUI;
}) {
  const [open, setOpen] = useState(false);
  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <div>
          <QuestionTypeCard type={type} open={open} setOpen={setOpen} />
        </div>
      </HoverCardTrigger>

      <HoverCardContent
        side="right"
        align="start"
        sideOffset={14}
        className="w-85 overflow-hidden rounded-2xl p-0"
      >
        <PreviewWrapper type={type}>
          <PreviewRouter type={type} />
        </PreviewWrapper>
      </HoverCardContent>
    </HoverCard>
  );
}
