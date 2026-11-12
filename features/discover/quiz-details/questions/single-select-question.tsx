
import Image from "next/image";
import { IconCheck, IconCircle, IconInfoCircle } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

export interface SingleSelectQuestionData {
  options: {
    id: string;
    text: string;
    image?: {
      url: string;
      alt?: string | null;
    } | null;
    isCorrect: boolean;
  }[];
  explanation?: string | null;
  explanationImage?: {
    url: string;
    alt?: string | null;
  } | null;
}

interface SingleSelectQuestionProps {
  data: SingleSelectQuestionData;
  showAnswers: boolean;
}

export function SingleSelectQuestion({
  data,
  showAnswers,
}: SingleSelectQuestionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {data.options.map((option, index) => {
          const isCorrect = option.isCorrect;

          return (
            <div
              key={option.id}
              className={cn(
                "flex items-start gap-3 rounded-lg border p-3 transition-colors",
                showAnswers && isCorrect
                  ? "border-emerald-500/40 bg-emerald-500/5"
                  : "border-border bg-card",
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-md border text-xs font-medium",
                  showAnswers && isCorrect
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {String.fromCharCode(65 + index)}
              </span>

              <div className="min-w-0 flex-1 space-y-2">
                <p className="text-sm leading-6">{option.text}</p>

                {option.image && (
                  <div className="relative aspect-video max-w-sm overflow-hidden rounded-lg border">
                    <Image
                      src={option.image.url}
                      alt={option.image.alt || "Answer option"}
                      fill
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              {showAnswers && isCorrect ? (
                <IconCheck className="size-5 shrink-0 text-emerald-600" />
              ) : (
                <IconCircle className="size-5 shrink-0 text-muted-foreground/40" />
              )}
            </div>
          );
        })}
      </div>

      {showAnswers && data.explanation && (
        <div className="space-y-3 rounded-xl border border-primary/15 bg-primary/[0.03] p-4">
          <div className="flex items-center gap-2">
            <IconInfoCircle className="size-4 text-primary" />
            <h4 className="text-sm font-semibold">Explanation</h4>
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            {data.explanation}
          </p>

          {data.explanationImage && (
            <div className="relative aspect-video max-w-md overflow-hidden rounded-lg border bg-background">
              <Image
                src={data.explanationImage.url}
                alt={data.explanationImage.alt || "Explanation"}
                fill
                sizes="(max-width: 640px) 100vw, 448px"
                className="object-contain"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
