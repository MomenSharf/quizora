"use client";

import { AlertCircle, X } from "lucide-react";

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

  const {
    errorCount,
    attempted,
    stopValidation,
  } = useEditorValidation();

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

  const clearIssues = () => {
    stopValidation();
    setActivePanel("questions");
  };
  return (
    <TooltipProvider>
      {/* Desktop */}
      <div className="hidden items-center gap-1 md:flex">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => setActivePanel("issues")}
              className={`h-10 items-center gap-2 px-3 font-medium ${buttonClass}`}
            >
              <AlertCircle className={iconClass} />
              <span>{label}</span>
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>View issues</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearIssues}
              aria-label="Clear issues"
              className="size-8 rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="size-4" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>Clear issues</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Mobile */}
      <div className="flex items-center gap-1 md:hidden">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setActivePanel("issues")}
              aria-label={label}
              className={`size-8 min-[400px]:size-10 ${buttonClass}`}
            >
              <AlertCircle className={iconClass.replace(
                "size-4",
                "size-4 min-[400px]:size-5",
              )} />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>View issues</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearIssues}
              aria-label="Clear issues"
              className="size-8 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="size-4" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>Clear issues</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}