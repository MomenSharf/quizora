"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useActivePanel } from "../store";
import QuestionLayout from "./questions-editor/question-layout";

export default function PageRouter() {
  const activePanel = useActivePanel();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activePanel}
initial={{ opacity: 0, x: 30 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -30 }}
transition={{
  duration: 0.25,
  ease: "easeOut",
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
