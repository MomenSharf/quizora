import {
  IconArrowsExchange,
  IconArrowsLeftRight,
  IconBinary,
  IconCards,
  IconChecks,
  IconCircleCheck,
  IconHandClick,
  IconListNumbers,
  IconMap,
  IconPencil,
  IconSelector,
  IconTargetArrow,
  IconTextPlus,
  TablerIcon
} from "@tabler/icons-react";

import { LucideIcon } from "lucide-react";
import { QuestionType } from "../validation/question/base";
import { createSingleSelectQuestion } from "../create-defaults/questions/single-select-question";
import { Question } from "../validation/question";
import { createMultipleSelectQuestion } from "../create-defaults/questions/multiple-select-question";
import { createTrueFalseQuestion } from "../create-defaults/questions/true-false-question";
import { createTypeAnswerQuestion } from "../create-defaults/questions/type-answer-question";
import { createFillBlankQuestion } from "../create-defaults/questions/fill-blank-question";
import { createOrderingQuestion } from "../create-defaults/questions/ordering-question";
import { createMatchQuestion } from "../create-defaults/questions/match-question";
import { createFlashcardsQuestion } from "../create-defaults/questions/flashcards-question";
import { createLocationQuestion } from "../create-defaults/questions/location-question";
import { createGuessQuestion } from "../create-defaults/questions/guess-question";
import { createTapFindQuestion } from "../create-defaults/questions/tap-find-question";
import { createRangeQuestion } from "../create-defaults/questions/range-question";
import { createDropdownQuestion } from "../create-defaults/questions/dropdown-question";

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
    id: "TRUE_FALSE",
    label: "True / False",
    shortLabel: "T/F",
    description: "Choose whether a statement is true or false.",
    bestFor: "Fast assessments, revision, and fact checking.",
    icon: IconBinary,
    color: "#22C55E",
    backgroundColor: "#F0FDF4",
    isPopular: true,
  },

  {
    id: "DROPDOWN",
    label: "Dropdown",
    shortLabel: "Dropdown",
    description: "Select the correct answer from a dropdown menu.",
    bestFor: "Compact quizzes and sentence completion.",
    icon: IconSelector,
    color: "#0F766E",
    backgroundColor: "#F0FDFA",
  }
  ,

  {
    id: "TYPE_ANSWER",
    label: "Type Answer",
    shortLabel: "Text",
    description: "Answer by typing the correct text.",
    bestFor: "Recall-based questions requiring exact or near-exact answers.",
    icon: IconPencil,
    color: "#10B981",
    backgroundColor: "#ECFDF5",
    isPopular: true,
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
    bestFor:
      "Associations like terms, definitions, categories, and translations.",
    icon: IconArrowsExchange,
    color: "#06B6D4",
    backgroundColor: "#ECFEFF",
  },

  {
    id: "FLASHCARDS",
    label: "Flashcards",
    shortLabel: "Cards",
    description: "Flip to reveal the answer or explanation.",
    bestFor: "Memorization, revision, and spaced repetition.",
    icon: IconCards,
    color: "#EC4899",
    backgroundColor: "#FDF2F8",
  },

  {
    id: "RANGE",
    label: "Range",
    shortLabel: "Range",
    description: "Select a value or interval within a range.",
    bestFor: "Estimations, ratings, percentages, and numeric scales.",
    icon: IconArrowsLeftRight,
    color: "#F97316",
    backgroundColor: "#FFF7ED",
  },

  {
    id: "LOCATION",
    label: "Location",
    shortLabel: "Location",
    description: "Select the correct location on a map.",
    bestFor: "Geography, anatomy, floor plans, and spatial learning.",
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
    bestFor: "Inference-based learning, puzzles, and classroom games.",
    icon: IconTargetArrow,
    color: "#6366F1",
    backgroundColor: "#EEF2FF",
  },

  {
    id: "TAP_FIND",
    label: "Tap & Find",
    shortLabel: "Tap",
    description: "Tap the correct object or area in an image.",
    bestFor: "Image hotspots, diagrams, maps, and visual identification.",
    icon: IconHandClick,
    color: "#0EA5E9",
    backgroundColor: "#F0F9FF",
    isNew: true,
  },
] satisfies readonly QuestionTypeUI[];

export const QUESTION_TYPE_LABELS = {
  SINGLE_SELECT: "Single Select",
  MULTIPLE_SELECT: "Multiple Select",
  TRUE_FALSE: "True / False",
  ORDERING: "Ordering",
  MATCH: "Match",
  TYPE_ANSWER: "Type Answer",
  FILL_BLANK: "Fill Blank",
  RANGE: "Range",
  LOCATION: "Location",
  GUESS: "Guess",
  FLASHCARDS: "Flashcards",
  TAP_FIND: "Tap & Find",
  DROPDOWN: "Dropdown",
} as const;
