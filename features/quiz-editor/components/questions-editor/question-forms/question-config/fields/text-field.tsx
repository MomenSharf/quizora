import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function TextField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  placeholder,
  disabled,
  className,
}: TextFieldProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <div className={cn("space-y-2.5", className)}>
      <div className="space-y-0.5">
        <label
          htmlFor={field.name}
          className="text-sm font-medium leading-none"
        >
          {label}
        </label>

        {description && (
          <p className="text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <Input
        {...field}
        id={field.name}
        value={field.value ?? ""}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        className={cn(
          "h-10 rounded-lg",
          "bg-background/60",
          "border-border/70",
          "transition-all duration-200",
          "placeholder:text-muted-foreground/50",
          "focus-visible:border-primary/50",
          "focus-visible:ring-4 focus-visible:ring-primary/10",
          error &&
            "border-destructive/60 focus-visible:border-destructive focus-visible:ring-destructive/10",
        )}
      />

      {error && (
        <p className="text-xs font-medium text-destructive">
          {error.message}
        </p>
      )}
    </div>
  );
}