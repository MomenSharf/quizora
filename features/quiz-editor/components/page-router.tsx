"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useActivePanel } from "../store";
import QuestionLayout from "./questions-editor/question-layout";

export default function PageRouter() {
  const activePanel = useActivePanel();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.15,
        }}
        className="h-full w-full"
      >
        {renderPanel(activePanel)}
      </motion.div>
    </AnimatePresence>
  );
}

function renderPanel(activePanel: ReturnType<typeof useActivePanel>) {
  switch (activePanel) {
    case "cover":
      return "Cover";

    case "questions":
      return <QuestionLayout />;

    case "design":
      return "Design";

    case "logic":
      return "Logic";

    case "results":
      return "Results";

    case "publish":
      return "Publish";

    default:
      return null;
  }
}
