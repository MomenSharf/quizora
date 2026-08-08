
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { CircleHelp, Minus, Plus } from "lucide-react";

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
  inline = true,
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

    if (min !== undefined) {
      newValue = Math.max(min, newValue);
    }

    if (max !== undefined) {
      newValue = Math.min(max, newValue);
    }

    field.onChange(newValue);
  };

  const decrementDisabled =
    disabled || (min !== undefined && value <= min);

  const incrementDisabled =
    disabled || (max !== undefined && value >= max);

  return (
    <div
      className={cn(
        inline
          ? "flex min-h-9 items-center justify-between gap-3"
          : "space-y-2"
      )}
    >
      {/* Label */}
      <div
        className={cn(
          "flex min-w-0 items-center gap-1.5",
          disabled && "opacity-50"
        )}
      >
        <span className="truncate text-sm font-medium">{label}</span>

        {description && (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`About ${label}`}
                  disabled={disabled}
                  className="flex size-4 shrink-0 items-center justify-center rounded-full text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <CircleHelp className="size-3" />
                </button>
              </TooltipTrigger>

              <TooltipContent
                side="top"
                align="start"
                className="max-w-64 text-xs leading-relaxed"
              >
                {description}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Number control */}
      <div
        className={cn(
          "flex h-8 shrink-0 items-center overflow-hidden rounded-md border bg-background",
          "transition-colors focus-within:border-ring focus-within:ring-1 focus-within:ring-ring/20",
          disabled && "opacity-50",
          inline ? "w-36" : "w-full"
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={decrementDisabled}
          onClick={() => setValue(value - step)}
          className="size-8 shrink-0 rounded-none border-r text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Minus className="size-3.5" />
        </Button>

        <Input
          type="number"
          value={field.value ?? ""}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          onChange={(event) => {
            const rawValue = event.target.value;

            field.onChange(
              rawValue === "" ? "" : Number(rawValue)
            );
          }}
          className={cn(
            "h-8 min-w-0 flex-1 border-0 px-1 text-center text-xs font-medium shadow-none",
            "focus-visible:ring-0",
            "[appearance:textfield]",
            "[&::-webkit-inner-spin-button]:appearance-none",
            "[&::-webkit-outer-spin-button]:appearance-none"
          )}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={incrementDisabled}
          onClick={() => setValue(value + step)}
          className="size-8 shrink-0 rounded-none border-l text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Plus className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}

