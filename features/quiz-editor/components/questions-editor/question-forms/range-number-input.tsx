import { Input } from "@/components/ui/input";
import { ReactNode } from "react";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

type RangeNumberInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  label: string;
  icon?: ReactNode;
  description?: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  min?: number;
  max?: number;
};

export function RangeNumberInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  label,
  icon,
  description,
  field,
  min,
  max,
}: RangeNumberInputProps<TFieldValues, TName>) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        {icon && (
          <span className="flex size-6 items-center justify-center rounded-md border-primary/18 text-primary">
            {icon}
          </span>
        )}

        <span className="text-primary">{label}</span>
      </label>

      <Input
        type="number"
        value={field.value ?? ""}
        min={min}
        max={max}
        onChange={(e) =>
          field.onChange(
            e.target.value === "" ? undefined : Number(e.target.value),
          )
        }
        className="h-9 rounded-lg bg-background text-center text-sm font-semibold transition-all border-primary/30"
      />

      {description && (
        <p className="text-[11px] text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
