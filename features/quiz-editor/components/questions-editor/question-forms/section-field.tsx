import * as React from "react";
import { IconHelpCircle } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface QuestionEditorFieldProps extends React.HTMLAttributes<HTMLDivElement> {
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
}: QuestionEditorFieldProps) => {
  return (
    <div className={cn("flex flex-col gap-2 w-full", className)} {...props}>
      <div className="flex items-center justify-between gap-4 min-h-7">
        <div className="flex items-center gap-2 min-w-0">
          <label className="text-sm font-medium leading-none tracking-tight text-foreground select-none">
            {label}
          </label>

          {optional && !required && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 select-none">
              • Optional
            </span>
          )}

          {description && (
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  className="size-5 ml-auto rounded-md text-muted-foreground/60 hover:bg-muted hover:text-foreground transition-colors duration-150"
                >
                  <IconHelpCircle className="size-3.5" />
                  <span className="sr-only">Field description</span>
                </Button>
              </TooltipTrigger>

              <TooltipContent side="top">{description}</TooltipContent>
            </Tooltip>
          )}
        </div>

        {action && (
          <div className="flex items-center gap-1.5 shrink-0">{action}</div>
        )}
      </div>

      <div className="relative w-full">{children}</div>
    </div>
  );
}


export default SectionField;