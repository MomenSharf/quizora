"use client";
import { useEffect, useRef } from "react";
import { QuestionFormRouter } from "./question-forms/question-form-router";
import { useIsTypeSelectorOpen, useSelectedQuestionId } from "../../store";
import { scrollElement } from "@/lib/utils/dom";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex flex-col gap p-1 sm:p-2"
      >
        <QuestionFormRouter />
      </motion.div>
    </div>
  );
};

export default QuestionContent;
