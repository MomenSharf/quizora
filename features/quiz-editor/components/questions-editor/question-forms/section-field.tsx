import { IconHelpCircle } from "@tabler/icons-react";

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

export default function SectionField({
  label,
  description,
  children,
  className,
  optional,
  action,
  ...props
}: SectionFieldProps) {
  return (
    <div
      className={cn("space-y-2", className)}
      {...props}
    >
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-sm font-medium">
          {label}
        </label>

        {optional && (
          <span className="text-xs text-muted-foreground">
            Optional
          </span>
        )}

        {description && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="inline-flex size-4 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <IconHelpCircle className="size-4" />
              </button>
            </TooltipTrigger>

            <TooltipContent>
              {description}
            </TooltipContent>
          </Tooltip>
        )}

        {action && <div className="ml-auto">{action}</div>}
      </div>

      {children}
    </div>
  );
}