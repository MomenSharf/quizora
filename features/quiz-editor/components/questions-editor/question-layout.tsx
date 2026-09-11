"use client";

import { motion } from "framer-motion";

import QuestionContent from "./question-content";
import QuestionSelector from "./question-selector";

const QuestionLayout = () => {
  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className="shrink-0"
      >
        <QuestionSelector />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.25,
          delay: 0.05,
          ease: "easeOut",
        }}
        className="min-w-0 flex-1"
      >
        <QuestionContent />
      </motion.div>
    </div>
  );
};

export default QuestionLayout;