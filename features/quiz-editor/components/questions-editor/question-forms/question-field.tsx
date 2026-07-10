import { IconHelpCircle } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type EditorFieldProps = {
  label: string;
  description?: string;
  isOptional?: boolean;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function QuestionField({
  label,
  description,
  isOptional,
  required,
  children,
  className,
}: EditorFieldProps) {
  return (
    <section className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold tracking-tight">
            {label}
            {required && (
              <span className="ml-1 text-destructive">*</span>
            )}
          </label>

          {description && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <IconHelpCircle className="size-4" />
                </button>
              </TooltipTrigger>

              <TooltipContent
                side="top"
                align="start"
                className="max-w-xs"
              >
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {isOptional && (
          <Badge
            variant="secondary"
            className="h-6 rounded-full px-2.5 text-[11px] font-medium"
          >
            Optional
          </Badge>
        )}
      </div>

      {children}
    </section>
  );
}