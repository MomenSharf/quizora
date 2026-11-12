
import { IconCheck } from "@tabler/icons-react";

export interface FillBlankQuestionData {
  segments: {
    id: string;
    text?: string;
    acceptedAnswers?: string[];
  }[];
}

export function FillBlankQuestion({
  data,
  showAnswers,
}: {
  data: FillBlankQuestionData;
  showAnswers: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm leading-8">
      {data.segments.map((segment) => (
        <span key={segment.id}>
          {segment.text ? (
            segment.text
          ) : (
            <span className="inline-flex min-w-24 items-center justify-center gap-1 rounded-md border border-dashed bg-muted/30 px-3 py-1">
              {showAnswers ? (
                <>
                  <IconCheck className="size-3.5 text-emerald-600" />
                  <span className="text-emerald-600">
                    {segment.acceptedAnswers?.[0] || "Answer"}
                  </span>
                </>
              ) : (
                <span className="text-muted-foreground">________</span>
              )}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
