import { IconPhotoPlus, IconUpload } from "@tabler/icons-react";

type ImageUploadPlaceholderProps = {
  onClick?: () => void;
  disabled?: boolean;
};

export function ImageUploadPlaceholder({
  onClick,
  disabled,
}: ImageUploadPlaceholderProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="group relative flex min-h-80 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-linear-to-br from-background via-background to-muted/30 p-8 text-center transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 disabled:pointer-events-none disabled:opacity-50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex size-20 items-center justify-center rounded-2xl border bg-background shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-primary/30">
        <IconPhotoPlus className="size-10 text-primary" />
      </div>

      <div className="relative mt-6 space-y-2">
        <h3 className="text-lg font-semibold tracking-tight">
          Upload Cover Image
        </h3>

        <p className="max-w-sm text-sm text-muted-foreground">
          Drag & drop an image here or click to browse your files.
        </p>
      </div>

      <div className="relative mt-6 inline-flex items-center gap-2 rounded-xl border bg-background px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 group-hover:border-primary/40 group-hover:shadow">
        <IconUpload className="size-4 text-primary" />
        Choose Image
      </div>

      <div className="relative mt-6 flex flex-wrap items-center justify-center gap-2">
        {["PNG", "JPG", "WEBP", "GIF"].map((type) => (
          <span
            key={type}
            className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
          >
            {type}
          </span>
        ))}

        <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          Max 5 MB
        </span>
      </div>
    </button>
  );
}