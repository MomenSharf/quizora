"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useActivePanel } from "../store";
import QuestionLayout from "./questions-editor/question-layout";
import SettingsLayout from "./settings-editor/settings-layout";

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
    case "questions":
      return <QuestionLayout />;



    case "settings":
      return <SettingsLayout />;

    case "publish":
      return "Publish";

    default:
      return null;
  }
}
