import { IconHelpCircle } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SectionFieldProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  action?: React.ReactNode;
}

const SectionField = ({
  label,
  description,
  children,
  className,
  required,
  optional,
  action,
  ...props
}: SectionFieldProps) => {
  return (
    <div
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2">
          <label className="truncate text-sm font-medium text-foreground">
            {label}
          </label>

          {optional && !required && (
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Optional
            </span>
          )}

          {description && (
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-5 shrink-0 rounded-md p-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <IconHelpCircle className="size-3.5" />
                  <span className="sr-only">Field description</span>
                </Button>
              </TooltipTrigger>

              <TooltipContent side="top" className="max-w-xs">
                {description}
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {action && (
          <div className="flex shrink-0 items-center gap-2">
            {action}
          </div>
        )}
      </div>

      {children}
    </div>
  );
};

export default SectionField;