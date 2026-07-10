'use client'

import { useActivePanel } from "../store";
import QuestionLayout from "./questions-editor/question-layout";

export default function PageRouter() {
  const activePanel = useActivePanel();
  switch (activePanel) {
    case "cover":
      return "Cover";
      case "questions":
        return <QuestionLayout />;
    case "design":
      return "Desing";
    case "logic":
      return "Logic";
    case "results":
      return "Results";
    case "publish":
      return "Publish";

    default:
      break;
  }
}
