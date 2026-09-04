"use client";

import { AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useEditorActions } from "../../store";
import { useEditorValidation } from "../../hooks/use-editor-validation";
import { focusEditorField } from "../../validation/quiz/focus-editor-field";
import { IssueLocation } from "./issue-location";

export function IssuesPanel() {
  const { setActivePanel } = useEditorActions();

  const { issues, errorCount, attempted } = useEditorValidation();

  const { focusIssue } = useEditorValidation();

  const onIssueClick = (path: string) => {
    focusIssue(path);
  };
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6 md:py-10">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/10">
              {errorCount > 0 ? (
                <AlertCircle className="size-5 text-destructive" />
              ) : (
                <CheckCircle2 className="size-5 text-emerald-500" />
              )}
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">Issues</h1>

              <p className="text-sm text-muted-foreground">
                {errorCount > 0
                  ? `${errorCount} ${
                      errorCount === 1 ? "issue" : "issues"
                    } need your attention`
                  : attempted
                    ? "Everything looks good"
                    : "Validation issues will appear here"}
              </p>
            </div>
          </div>
        </div>

        <Button variant="outline" onClick={() => setActivePanel("questions")}>
          Back to editor
        </Button>
      </div>

      {/* Issues */}
      {errorCount > 0 ? (
        <div className="space-y-2">
          {issues.map((issue) => (
            <button
              key={issue.id}
              type="button"
              onClick={() => onIssueClick(issue.path)}
              className="group flex w-full items-start gap-4 rounded-xl border bg-background p-4 text-left transition-colors hover:bg-muted/50"
            >
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" />

              <div className="min-w-0 flex-1">
                <p className="font-medium">{issue.message}</p>

                <IssueLocation path={issue.path} />
              </div>

              <ChevronRight className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle2 className="size-6 text-emerald-500" />
          </div>

          <h2 className="font-semibold">No issues found</h2>

          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Your quiz has passed validation and is ready for the next step.
          </p>
        </div>
      )}
    </main>
  );
}
