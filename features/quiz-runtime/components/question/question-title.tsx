type QuestionTitleProps = {
  title: string;
  questionNumber?: number;
};

export default function QuestionTitle({
  title,
  questionNumber,
}: QuestionTitleProps) {
  return (
    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
      {questionNumber !== undefined && (
        <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-sm font-bold tabular-nums text-primary sm:size-10">
          <span>{questionNumber}</span>
        </div>
      )}

      <div
        className={[
          "prose prose-sm dark:prose-invert max-w-none min-w-0 flex-1",
          "break-words text-lg font-bold leading-snug tracking-tight sm:text-xl lg:text-2xl",
          "[&_p]:my-0 [&_p]:leading-snug",
          "[&_h1]:my-0 [&_h2]:my-0 [&_h3]:my-0",
          "[&_ul]:my-1 [&_ol]:my-1",
          "[&_a]:text-primary [&_a]:underline",
          "[&_img]:my-1 [&_img]:inline-block [&_img]:max-h-12 [&_img]:rounded-md",
        ].join(" ")}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </div>
  );
}
