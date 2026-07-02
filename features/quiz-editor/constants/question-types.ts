import {
  IconArrowsExchange,
  IconArrowsLeftRight,
  IconCards,
  IconChecks,
  IconCircleCheck,
  IconHandClick,
  IconListNumbers,
  IconMap,
  IconPencil,
  IconTargetArrow,
  IconTextPlus,
  TablerIcon
} from "@tabler/icons-react";

import { QuestionType } from "../validation/question/base";
import { LucideIcon } from "lucide-react";

export type QuestionTypeUI = {
  id: QuestionType;
  label: string;
  shortLabel: string;
  description: string;
  bestFor: string;
  icon: LucideIcon | TablerIcon;
  color: string;
  backgroundColor: string;
  isPopular?: boolean;
  isNew?: boolean;
  badge?: string;
};
export const QUESTION_TYPES = [
  {
    id: "SINGLE_SELECT",
    label: "Single Select",
    shortLabel: "Single",
    description: "Choose one correct answer.",
    bestFor: "Quick knowledge checks and quizzes with one correct option.",
    icon: IconCircleCheck,
    color: "#3B82F6",
    backgroundColor: "#EFF6FF",
    isPopular: true,
  },

  {
    id: "MULTIPLE_SELECT",
    label: "Multiple Select",
    shortLabel: "Multiple",
    description: "Choose multiple correct answers.",
    bestFor:
      "Testing deeper understanding where more than one answer is correct.",
    icon: IconChecks,
    color: "#8B5CF6",
    backgroundColor: "#F5F3FF",
    isPopular: true,
  },

  {
    id: "ORDERING",
    label: "Order It",
    shortLabel: "Order",
    description: "Arrange items into the correct order.",
    bestFor: "Process-based learning like steps, timelines, and sequences.",
    icon: IconListNumbers,
    color: "#F59E0B",
    backgroundColor: "#FFFBEB",
  },

  {
    id: "MATCH",
    label: "Match It",
    shortLabel: "Match",
    description: "Connect matching pairs together.",
    bestFor: "Associations like terms ↔ definitions or items ↔ categories.",
    icon: IconArrowsExchange,
    color: "#06B6D4",
    backgroundColor: "#ECFEFF",
  },

  {
    id: "TYPE_ANSWER",
    label: "Type Answer",
    shortLabel: "Text",
    description: "Answer by typing the correct text.",
    bestFor: "Recall-based questions requiring exact or near-exact answers.",
    icon: IconPencil,
    color: "#10B981",
    backgroundColor: "#ECFDF5",
  },

  {
    id: "FILL_BLANK",
    label: "Fill in the Blank",
    shortLabel: "Blank",
    description: "Complete the missing words.",
    bestFor:
      "Testing vocabulary, grammar, or missing key concepts in a sentence.",
    icon: IconTextPlus,
    color: "#14B8A6",
    backgroundColor: "#F0FDFA",
  },

  {
    id: "LOCATION",
    label: "Location",
    shortLabel: "Location",
    description: "Select the correct location on a map.",
    bestFor: "Geography-based questions and spatial understanding tasks.",
    icon: IconMap,
    color: "#EF4444",
    backgroundColor: "#FEF2F2",
    badge: "Map",
  },

  {
    id: "GUESS",
    label: "Guess It",
    shortLabel: "Guess",
    description: "Find the answer using clues.",
    bestFor: "Inference-based learning and clue-driven problem solving.",
    icon: IconTargetArrow,
    color: "#6366F1",
    backgroundColor: "#EEF2FF",
    isNew: true,
  },

  {
    id: "RANGE",
    label: "Range",
    shortLabel: "Range",
    description: "Select a value or interval within a range.",
    bestFor: "Estimations, numeric scales, and slider-based questions.",
    icon: IconArrowsLeftRight,
    color: "#F97316",
    backgroundColor: "#FFF7ED",
  },

  {
    id: "FLASHCARDS",
    label: "Flashcards",
    shortLabel: "Cards",
    description: "Flip to reveal answer or explanation.",
    bestFor: "Memorization and spaced repetition learning.",
    icon: IconCards,
    color: "#EC4899",
    backgroundColor: "#FDF2F8",
  },

  {
    id: "TAP_FIND",
    label: "Tap & Find",
    shortLabel: "Tap",
    description: "Tap on the correct object or area in an image.",
    bestFor:
      "Visual identification and hotspot-based learning on images or maps.",
    icon: IconHandClick,
    color: "#0EA5E9",
    backgroundColor: "#F0F9FF",
    isNew: true,
  },
] satisfies readonly QuestionTypeUI[];