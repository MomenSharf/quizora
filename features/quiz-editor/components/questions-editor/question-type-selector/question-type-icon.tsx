"use client";


import { QUESTION_TYPE_COLORS, QUESTION_TYPE_ICONS, QuestionTypeUI } from "@/features/quiz-editor/constants/question-types";
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

  const color = QUESTION_TYPE_COLORS[type];
  const Icon = QUESTION_TYPE_ICONS[type];


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