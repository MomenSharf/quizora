import { CircleHelp } from "lucide-react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        "flex min-h-9 items-center justify-between gap-3",
        disabled && "opacity-50"
      )}
    >
      <div className="flex min-w-0 items-center gap-1.5">
        <span className="truncate text-sm font-medium">{label}</span>

        {description && (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`About ${label}`}
                  disabled={disabled}
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center",
                    "rounded-full text-muted-foreground/60",
                    "transition-colors",
                    "hover:bg-muted hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
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

      <Switch
        checked={Boolean(field.value)}
        onCheckedChange={field.onChange}
        disabled={disabled}
        className="shrink-0"
      />
    </div>
  );
}
