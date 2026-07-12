"use client";

import { useTheme } from "next-themes";

import { QUESTION_TYPES, QuestionTypeUI } from "@/features/quiz-editor/constants/question-types";
import { cn } from "@/lib/utils";

type Props = {
  type: QuestionTypeUI['id'];
  className?: string;
  iconClassName?: string;
};

export function QuestionTypeIcon({
  type,
  className,
  iconClassName,
}: Props) {
  const { resolvedTheme } = useTheme();

  const questionType = QUESTION_TYPES.find((item) => item.id === type);

  if (!questionType) return null;

  const Icon = questionType.icon;
  const color = questionType.color;

  return (
    <div
       className={cn(
    "flex size-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110",
    className
  )}
  style={{
    color,
    backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)`,
  }}
    >
      <Icon className={cn("size-6", iconClassName)} />
    </div>
  );
}