import { QUESTION_TYPE_MAP } from "@/features/quiz-editor/constants/question-types";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import { IconClock } from "@tabler/icons-react";

type QuestionMetaProps = {
  type: QuestionType;
  timeLeft?: number;
};

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export default function QuestionMeta({
  type,
  timeLeft = 30,
}: QuestionMetaProps) {
  const questionType = QUESTION_TYPE_MAP[type];

  if (!questionType) return null;

  const Icon = questionType.icon;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      {/* Question Type */}
      <div
        className="inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 transition-colors"
        style={{
          color: questionType.color,
          backgroundColor: `color-mix(in srgb, ${questionType.color} 10%, transparent)`,
          borderColor: `color-mix(in srgb, ${questionType.color} 25%, transparent)`,
        }}
      >
        <Icon size={15} stroke={'1.8'} />
        <span className="text-xs font-medium">
          {questionType.shortLabel}
        </span>
      </div>

      {/* Timer */}
      <div className="inline-flex h-8 items-center gap-2 rounded-full border border-border/50 bg-muted/60 px-3 transition-colors">
        <IconClock
          size={15}
          className="text-muted-foreground"
        />

        <span className="font-mono text-xs font-medium tabular-nums text-foreground">
          {formatTime(timeLeft)}
        </span>

        <span className="size-1.5 rounded-full bg-emerald-500" />
      </div>
    </div>
  );
}