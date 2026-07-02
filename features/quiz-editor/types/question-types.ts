import type { LucideIcon } from "lucide-react";

export type QuestionTypeId =
  | "single_select"
  | "multiple_select"
  | "order"
  | "match"
  | "text_answer"
  | "fill_blank"
  | "location"
  | "pinpoint"
  | "guess"
  | "range"
  | "tap_find"
  | "flashcard";

export interface QuestionTypeUI {
  id: QuestionTypeId;

  label: string;
  shortLabel: string;

  description: string;

  icon: LucideIcon;

  color: string;
  backgroundColor: string;

  badge?: string;

  isNew?: boolean;
  isPopular?: boolean;
  isComingSoon?: boolean;

  disabled?: boolean;

  bestFor?: string;
}
