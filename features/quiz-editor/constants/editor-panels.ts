import {
  IconAdjustments,
  IconBrush,
  IconChecklist,
  IconHierarchy2,
  TablerIcon
} from "@tabler/icons-react";
import { EditorPanel } from "../store";

export const EDITOR_PANELS: {
  title: string;
  url: string;
  icon: TablerIcon;
  value: EditorPanel;
}[] = [

  {
    title: "Questions & Results",
    url: "/questions-results",
    icon: IconChecklist,
    value: "questions-results",
  },
  {
    title: "Branching Logic",
    url: "/branching-logic",
    icon: IconHierarchy2,
    value: "logic",
  },
  {
    title: "Design",
    url: "/design",
    icon: IconBrush,
    value: "design",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: IconAdjustments,
    value: "settings",
  },
];
