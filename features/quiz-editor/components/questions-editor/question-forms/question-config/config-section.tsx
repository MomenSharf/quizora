import { ReactNode } from "react";
import { CircleHelp } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ConfigWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  separator?: boolean;
}

export function ConfigSection({
  title,
  description,
  children,
  className,
}: ConfigWrapperProps) {
  return (
    <>
      <section className={cn("space-y-3", className)}>
        {/* Section header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <h3 className="truncate text-xs font-semibold tracking-wide text-foreground">
              {title}
            </h3>

            {description && (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label={`About ${title}`}
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center",
                        "rounded-full text-muted-foreground/70",
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
        </div>

        {/* Fields */}
        <div className="space-y-2.5">{children}</div>
      </section>
    </>
  );
}
