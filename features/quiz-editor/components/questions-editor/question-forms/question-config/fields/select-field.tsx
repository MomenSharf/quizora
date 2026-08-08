import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
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
  value: string;
}

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
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
  const { field } = useController({
    control,
    name,
  });

  return (
    <div className="flex min-h-9 items-center justify-between gap-3">
      <div
        className={`flex min-w-0 items-center gap-1.5 ${
          disabled ? "opacity-50" : ""
        }`}
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

      {/* Select */}
      <Select
        value={field.value ?? ""}
        onValueChange={field.onChange}
        disabled={disabled}
      >
        <SelectTrigger className="h-8 w-32 shrink-0 px-2.5 text-xs ">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
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

