"use client";


import { useActivePanel } from "../store";
import { IssuesPanel } from "./issues/issues-panel";
import QuestionLayout from "./questions-editor/question-layout";
import SettingsPanel from "./settings-editor/settings-panel";

export default function PageRouter() {
  const activePanel = useActivePanel();

  return (
    // <AnimatePresence mode="wait">
    //   <motion.div
    //     initial={{ opacity: 0 }}
    //     animate={{ opacity: 1 }}
    //     exit={{ opacity: 0 }}
    //     transition={{
    //       duration: 0.15,
    //     }}
    //   >
    <div className="h-full w-full">{renderPanel(activePanel)}</div>
    //   </motion.div>
    // </AnimatePresence>
  );
}

function renderPanel(activePanel: ReturnType<typeof useActivePanel>) {
  switch (activePanel) {
    case "questions":
      return <QuestionLayout />;

    case "settings":
      return <SettingsPanel />;

    case "publish":
      return "Publish";

    case "issues":
      return <IssuesPanel />;

    default:
      return null;
  }
}
