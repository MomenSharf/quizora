
"use client";

import { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

type QuestionTitleProps = {
  title: string;
  questionNumber?: number;
};

export default function QuestionTitle({
  title,
  questionNumber,
}: QuestionTitleProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const measure = () => {
      setIsOverflowing(element.scrollHeight > 192);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, [title]);

  return (
    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
      {questionNumber !== undefined && (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold tabular-nums text-primary sm:size-10">
          {questionNumber}
        </div>
      )}

      <div className="relative min-w-0 flex-1">
        <div
          className={[
            "relative overflow-hidden transition-[max-height] duration-300 ease-in-out",
            expanded ? "max-h-none" : "max-h-48",
          ].join(" ")}
        >
          <div
            ref={contentRef}
            className={[
              "prose prose-sm dark:prose-invert max-w-none",
              "break-words text-lg font-bold leading-snug tracking-tight sm:text-xl lg:text-2xl",
              "[&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0",
              "[&_h1]:my-2 [&_h2]:my-2 [&_h3]:my-2",
              "[&_ul]:my-2 [&_ol]:my-2 [&_li]:my-1",
              "[&_a]:text-primary [&_a]:underline",
              "[&_img]:my-1 [&_img]:inline-block [&_img]:max-h-12 [&_img]:rounded-md",
            ].join(" ")}
            dangerouslySetInnerHTML={{ __html: title }}
          />

          {isOverflowing && !expanded && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-background via-background/80 to-transparent" />
          )}
        </div>

        {isOverflowing && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-label={expanded ? "Collapse question" : "Expand question"}
            aria-expanded={expanded}
            className={[
              "absolute right-0 z-10 flex size-8 items-center justify-center rounded-full",
              "border border-border/60 bg-background/90 text-muted-foreground shadow-sm backdrop-blur-sm",
              "transition-colors hover:bg-muted hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              expanded ? "bottom-0" : "bottom-0",
            ].join(" ")}
          >
            {expanded ? (
              <IconChevronUp size={17} stroke={2} />
            ) : (
              <IconChevronDown size={17} stroke={2} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
