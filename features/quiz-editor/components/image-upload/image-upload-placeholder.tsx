import { QuestionType } from "@/lib/db/generated/prisma/enums";
import { IconPhotoPlus, IconUpload } from "@tabler/icons-react";
import { QUESTION_TYPE_COLORS } from "../../constants/question-types";

type ImageUploadPlaceholderProps = {
  questionIndex?: number;
  type: QuestionType;
  onClick?: () => void;
  disabled?: boolean;
};

export function ImageUploadPlaceholder({
  type,
  onClick,
  disabled,
}: ImageUploadPlaceholderProps) {
  const color = QUESTION_TYPE_COLORS[type];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={
        {
          "--accent": color,
        } as React.CSSProperties
      }
      className="group relative flex min-h-52 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-background px-6 py-8 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-(--accent)/40 hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            `radial-gradient(circle at top, ${color}18 0%, transparent 70%)`,
        }}
      />

      <div
        className="relative flex size-14 items-center justify-center rounded-xl border transition-all duration-200 group-hover:scale-105"
        style={{
          backgroundColor: `${color}10`,
          borderColor: `${color}25`,
          color,
        }}
      >
        <IconPhotoPlus className="size-7 transition-transform duration-200 group-hover:scale-110" />
      </div>

      <div className="relative mt-4 space-y-1">
        <h3 className="text-sm font-semibold">Upload image</h3>

        <p className="text-xs text-muted-foreground">
          Drag & drop or click to browse
        </p>
      </div>

      <div
        className="relative mt-5 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200"
        style={{
          backgroundColor: `${color}10`,
          color,
        }}
      >
        <IconUpload className="size-3.5" />
        Choose Image
      </div>

      <div className="relative mt-4 flex items-center gap-2 text-[11px]">
        <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">
          PNG
        </span>
        <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">
          JPG
        </span>
        <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">
          WEBP
        </span>

        <span
          className="rounded-full px-2 py-1 font-medium"
          style={{
            backgroundColor: `${color}12`,
            color,
          }}
        >
          Max 5 MB
        </span>
      </div>
    </button>
  );
}