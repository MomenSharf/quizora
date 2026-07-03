"use client";

import { useTheme } from "next-themes";

import { QUESTION_TYPES, QuestionTypeUI } from "@/features/quiz-editor/constants/question-types";
import { cn } from "@/lib/utils";
import { QuestionType } from "@/lib/db/generated/prisma/enums";

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
        "flex size-12 items-center justify-center rounded-2xl transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110",
        className
      )}
      style={{
        color,
        backgroundColor: resolvedTheme === "dark" ? `${color}33` : `${color}18`,
      }}
    >
      <Icon className={cn("size-4", iconClassName)} />
    </div>
  );
}