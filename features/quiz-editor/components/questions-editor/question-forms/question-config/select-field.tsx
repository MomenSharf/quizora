"use client";

import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { ReactNode } from "react";
import { CircleHelp } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SelectOption {
  label: string;
  value: number;
}

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: ReactNode;
  description?: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  options,
  placeholder = "Select...",
  disabled,
}: SelectFieldProps<T>) {
  const { field } = useController({ control, name });
    
  return (
    <div className="flex w-full min-w-0 flex-col gap-1.5">
      <div
        className={`flex min-w-0 items-center gap-1.5 ${
          disabled ? "opacity-50" : ""
        }`}
      >
        <label className="truncate text-xs font-semibold text-foreground">
          {label}
        </label>

        {description && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="shrink-0 text-muted-foreground/60 transition-colors hover:text-foreground"
                  aria-label={`${label} information`}
                >
                  <CircleHelp className="size-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-52 text-xs">
                {description}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <Select
        value={field.value == null ? undefined : String(field.value)}
        onValueChange={(value) => field.onChange(Number(value))}
        disabled={disabled}
      >
        <SelectTrigger className="h-9 w-full min-w-0 rounded-lg border-border/70 bg-background px-3 text-xs shadow-none transition-colors hover:border-border focus:ring-2 focus:ring-ring/20">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent position="popper" className="max-h-64">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={String(option.value)}
              className="text-xs"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}