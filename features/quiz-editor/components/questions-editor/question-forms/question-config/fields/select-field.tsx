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
    <div className="flex items-center justify-between gap-4 rounded-lg border p-3 hover:border-primary/30">
      <div className="flex min-w-0 items-center gap-2">
        <span className="text-sm font-medium">{label}</span>

        {description && (
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <CircleHelp className="size-4" />
                </button>
              </TooltipTrigger>

              <TooltipContent
                side="top"
                className="max-w-xs"
              >
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <Select
        value={field.value}
        onValueChange={field.onChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-44 shrink-0">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}