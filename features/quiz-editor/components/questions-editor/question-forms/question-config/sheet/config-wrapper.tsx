import { ReactNode } from "react";
import { CircleHelp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
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

export function ConfigWrapper({
  title,
  description,
  children,
  className,
  separator = true,
}: ConfigWrapperProps) {
  return (
    <>
      <section className={cn("space-y-5", className)}>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            {title}
          </h2>

          {description && (
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                  >
                    <CircleHelp className="size-3.5" />
                  </button>
                </TooltipTrigger>

                <TooltipContent
                  side="top"
                  align="start"
                  className="max-w-xs text-sm leading-relaxed"
                >
                  {description}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="space-y-4">{children}</div>
      </section>

      {separator && <Separator className="my-8 opacity-50 last:hidden" />}
    </>
  );
}