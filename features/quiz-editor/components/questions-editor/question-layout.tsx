"use client";

import { motion } from "framer-motion";

import QuestionContent from "./question-content";
import QuestionSelector from "./question-selector";

const QuestionLayout = () => {
  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      <div className="shrink-0 flex">
        <QuestionSelector />
      </div>

      <div className="min-w-0 flex-1">
        <QuestionContent />
      </div>
    </div>
  );
};

export default QuestionLayout;
