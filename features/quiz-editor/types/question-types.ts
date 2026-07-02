import { QuestionType } from "@/lib/db/generated/prisma/enums";
import type { LucideIcon } from "lucide-react";


export interface QuestionTypeUI {
  id: QuestionType;

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
