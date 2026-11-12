
import Image from "next/image";
import { IconCheck, IconSquare, IconInfoCircle } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

export interface MultipleSelectQuestionData {
  options: {
    id: string;
    text: string;
    image?: { url: string; alt?: string | null } | null;
    isCorrect: boolean;
  }[];
  explanation?: string | null;
}

export function MultipleSelectQuestion({
  data,
  showAnswers,
}: {
  data: MultipleSelectQuestionData;
  showAnswers: boolean;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Select all that apply
      </p>

      {data.options.map((option, index) => (
        <div
          key={option.id}
          className={cn(
            "flex items-start gap-3 rounded-lg border p-3",
            showAnswers && option.isCorrect
              ? "border-emerald-500/40 bg-emerald-500/5"
              : "bg-card",
          )}
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-medium">
            {String.fromCharCode(65 + index)}
          </span>

          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-sm">{option.text}</p>
            {option.image && (
              <div className="relative aspect-video max-w-sm overflow-hidden rounded-lg border">
                <Image src={option.image.url} alt={option.image.alt || "Option"} fill className="object-contain" sizes="400px" />
              </div>
            )}
          </div>

          {showAnswers && option.isCorrect ? (
            <IconCheck className="size-5 text-emerald-600" />
          ) : (
            <IconSquare className="size-5 text-muted-foreground/40" />
          )}
        </div>
      ))}

      {showAnswers && data.explanation && (
        <div className="rounded-lg border border-primary/15 bg-primary/[0.03] p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <IconInfoCircle className="size-4 text-primary" />
            Explanation
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{data.explanation}</p>
        </div>
      )}
    </div>
  );
}
