import { TagsInput } from "./tags-input";
import { Controller } from "react-hook-form";
import { useQuizForm } from "../../hooks/use-quiz-form";
import { IconTags } from "@tabler/icons-react";

function FieldLabel({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2.5 flex items-center gap-2 text-sm font-medium">
      <Icon className="size-4 text-muted-foreground" />
      <span>{children}</span>
    </div>
  );
}

export default function QuizTags() {
  const { control } = useQuizForm();

  return (
    <Controller
      name="tags"
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <FieldLabel icon={IconTags}>Tags</FieldLabel>

          <TagsInput
            value={field.value ?? []}
            onChange={field.onChange}
            placeholder="Type a tag and press Enter..."
            maxTags={10}
          />

          <div className="mt-1.5 flex items-center justify-between">
            {fieldState.error ? (
              <p className="text-xs text-destructive">
                {fieldState.error.message}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Press Enter after each tag
              </p>
            )}

            <span className="text-xs text-muted-foreground">
              {field.value?.length ?? 0}/10
            </span>
          </div>
        </div>
      )}
    />
  );
}
