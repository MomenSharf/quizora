"use client";
import { useEffect, useRef } from "react";
import { QuestionFormRouter } from "./question-forms/question-form-router";
import { useIsTypeSelectorOpen, useSelectedQuestionId } from "../../store";
import { scrollElement } from "@/lib/utils/dom";

const QuestionContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedQuestionId = useSelectedQuestionId();
  const isTypeSelectorOpen = useIsTypeSelectorOpen();

  useEffect(() => {
    scrollElement(containerRef.current, "top");
  }, [selectedQuestionId, isTypeSelectorOpen]);
  return (
    <div
      ref={containerRef}
      className="scrollbar-thin flex flex-col h-full overflow-y-auto"
    >
      <div className="flex flex-col gap-2 p-2">
        <QuestionFormRouter />
      </div>
    </div>
  );
};

export default QuestionContent;
