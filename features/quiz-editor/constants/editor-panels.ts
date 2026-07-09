import {
  IconAdjustments,
  IconBook2,
  IconBrush,
  IconChecklist,
  IconHierarchy2,
  IconTrophy,
  TablerIcon,
} from "@tabler/icons-react";
import { EditorPanel } from "../store";

export const EDITOR_PANELS: {
  title: string;
  url: string;
  icon: TablerIcon;
  value: EditorPanel;
}[] = [
  {
    title: "Cover",
    url: "/cover",
    icon: IconBook2,
    value: "cover",
  },
  {
    title: "Questions",
    url: "/questions",
    icon: IconChecklist,
    value: "questions",
  },
  {
    title: "Branching Logic",
    url: "/branching-logic",
    icon: IconHierarchy2,
    value: "logic",
  },
  {
    title: "Results",
    url: "/results",
    icon: IconTrophy,
    value: "results",
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
