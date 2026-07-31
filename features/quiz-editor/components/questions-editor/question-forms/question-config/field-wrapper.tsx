"use client";

import * as React from "react";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type FieldWrapperProps = {
  label: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export function FieldWrapper({
  label,
  description,
  required,
  className,
  children,
  actions,
}: FieldWrapperProps) {
  return (
    <div className={cn("space-y-2.5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <Label className="flex items-center gap-1.5 text-sm font-medium leading-none">
            <span>{label}</span>

            {required && (
              <span className="text-destructive">*</span>
            )}

            {description && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      tabIndex={-1}
                      className="rounded-full text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Info className="size-3.5" />
                    </button>
                  </TooltipTrigger>

                  <TooltipContent
                    side="top"
                    className="max-w-xs text-sm"
                  >
                    {description}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </Label>

          {description && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {actions && <div className="shrink-0">{actions}</div>}
      </div>

      {children}
    </div>
  );
}