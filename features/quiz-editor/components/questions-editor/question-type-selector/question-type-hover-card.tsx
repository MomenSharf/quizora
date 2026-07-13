"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { QuestionTypeUI } from "@/features/quiz-editor/constants/question-types";
import { PREVIEW_MAP } from "./preview-map";
import QuestionTypeCard from "./question-type-card";

export default function QuestionTypeHoverCard({
  type,
}: {
  type: QuestionTypeUI;
}) {
     const Preview = PREVIEW_MAP[type.id]
  
  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger asChild
       
      >
        <div>
          <QuestionTypeCard type={type} />
        </div>
      </HoverCardTrigger>

      <HoverCardContent
        side="right"
        align="start"
        sideOffset={14}
        className="w-64 overflow-hidden rounded-2xl"
        
      >

       <Preview />
      </HoverCardContent>
    </HoverCard>
  );
}
