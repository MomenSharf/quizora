import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

interface SwitchFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  disabled?: boolean;
}

export function SwitchField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
}: SwitchFieldProps<T>) {
  const { field } = useController({
    control,
    name,
  });

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-xl border bg-card p-4 transition-colors",
        !disabled && "hover:border-primary/30"
      )}
    >
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-medium">{label}</p>

        {description && (
          <p className="text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <Switch
        checked={!!field.value}
        onCheckedChange={field.onChange}
        disabled={disabled}
      />
    </div>
  );
}