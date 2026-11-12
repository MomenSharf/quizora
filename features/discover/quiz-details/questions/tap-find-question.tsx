
import Image from "next/image";
import { IconTarget, IconCheck } from "@tabler/icons-react";

export interface TapFindQuestionData {
  image: {
    url: string;
    alt?: string | null;
  };
  targets: {
    id: string;
    x: number;
    y: number;
    label?: string;
  }[];
}

export function TapFindQuestion({
  data,
  showAnswers,
}: {
  data: TapFindQuestionData;
  showAnswers: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="relative aspect-video overflow-hidden rounded-xl border bg-muted">
        <Image
          src={data.image.url}
          alt={data.image.alt || "Find the correct location"}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-contain"
        />

        {showAnswers &&
          data.targets.map((target, index) => (
            <div
              key={target.id}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1"
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
            >
              <span className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white shadow-lg">
                <IconCheck className="size-4" />
              </span>
              {target.label && (
                <span className="rounded-md bg-black/75 px-2 py-1 text-xs text-white">
                  {target.label}
                </span>
              )}
            </div>
          ))}
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <IconTarget className="size-4" />
        {showAnswers
          ? `${data.targets.length} correct target locations`
          : "Find the target locations in the image"}
      </div>
    </div>
  );
}
