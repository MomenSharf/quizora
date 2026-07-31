import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import {
  CircleHelp,
  Minus,
  Plus,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NumberFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;

  min?: number;
  max?: number;
  step?: number;

  placeholder?: string;
  disabled?: boolean;
  inline?: boolean;
}

export function NumberField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  min,
  max,
  step = 1,
  placeholder,
  disabled,
  inline = false,
}: NumberFieldProps<T>) {
  const { field } = useController({
    control,
    name,
  });

  const value =
    typeof field.value === "number"
      ? field.value
      : Number(field.value) || 0;

  const setValue = (next: number) => {
    let newValue = next;

    if (min !== undefined) newValue = Math.max(min, newValue);
    if (max !== undefined) newValue = Math.min(max, newValue);

    field.onChange(newValue);
  };

  return (
    <div
      className={cn(
        inline
          ? "flex items-center justify-between gap-6"
          : "space-y-2"
      )}
    >
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">{label}</label>

        {description && (
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <CircleHelp className="size-4" />
                </button>
              </TooltipTrigger>

              <TooltipContent className="max-w-xs">
                <p className="text-sm leading-relaxed">
                  {description}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div
        className={cn(
          "flex items-center overflow-hidden rounded-xl border bg-background shadow-xs transition-colors focus-within:border-ring",
          inline ? "w-56 shrink-0" : "w-full"
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={disabled || (min !== undefined && value <= min)}
          onClick={() => setValue(value - step)}
          className="h-10 w-10 rounded-none border-r"
        >
          <Minus className="size-4" />
        </Button>

        <Input
          type="number"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          onChange={(e) =>
            field.onChange(
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          className="h-10 border-0 text-center shadow-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={disabled || (max !== undefined && value >= max)}
          onClick={() => setValue(value + step)}
          className="h-10 w-10 rounded-none border-l"
        >
          <Plus className="size-4" />
        </Button>
      </div>
    </div>
  );
}