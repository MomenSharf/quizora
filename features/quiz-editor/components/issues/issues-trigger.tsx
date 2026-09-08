"use client";

import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useEditorActions } from "../../store";
import { useEditorValidation } from "../../hooks/use-editor-validation";

export function IssuesTrigger() {
  const { setActivePanel } = useEditorActions();
  const { errorCount, attempted } = useEditorValidation();

  if (!attempted) return null;

  const hasIssues = errorCount > 0;

  const label = hasIssues
    ? `${errorCount} ${errorCount === 1 ? "issue" : "issues"}`
    : "No issues";

  const iconClass = hasIssues
    ? "size-4 text-destructive"
    : "size-4 text-emerald-500";

  const buttonClass =
    "rounded-xl border-border/70 bg-background/60 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-background hover:shadow-md active:translate-y-0 active:scale-[0.98]";

  return (
    <TooltipProvider>
      {/* Desktop — full status */}
      <Button
        type="button"
        variant="outline"
        onClick={() => setActivePanel("issues")}
        className={`hidden h-10 items-center gap-2 px-3 font-medium md:flex ${buttonClass}`}
      >
        <AlertCircle className={iconClass} />
        <span>{label}</span>
      </Button>

      {/* Mobile — icon only */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setActivePanel("issues")}
            aria-label={label}
            className={`size-8 min-[400px]:size-10 md:hidden ${buttonClass}`}
          >
            <AlertCircle className="size-4 min-[400px]:size-5" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}