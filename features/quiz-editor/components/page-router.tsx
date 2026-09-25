"use client";

import { useActivePanel } from "../store";
import { IssuesPanel } from "./issues/issues-panel";
import QuestionLayout from "./questions-editor/question-layout";
import SettingsPanel from "./settings-editor/settings-panel";

export default function PageRouter() {
  const activePanel = useActivePanel();

  return <div className="h-full w-full">{renderPanel(activePanel)}</div>;
}

function renderPanel(activePanel: ReturnType<typeof useActivePanel>) {
  switch (activePanel) {
    case "questions":
      return <QuestionLayout />;

    case "settings":
      return <SettingsPanel />;

    case "issues":
      return <IssuesPanel />;

    default:
      return null;
  }
}
