"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { IconChevronLeft } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

import { useEditorValidation } from "../../hooks/use-editor-validation";
import { useEditorActions } from "../../store";

import { IssueLocation } from "./issue-location";
import BackToQuestuonsButton from "../back-to-questions-button ";
import { cn } from "@/lib/utils";

export function IssuesPanel() {
  const { setActivePanel } = useEditorActions();
  const { issues, errorCount, attempted, focusIssue } = useEditorValidation();

  const onIssueClick = (path: string) => {
    focusIssue(path);
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.div
          layout
          className="mb-8 flex flex-col-reverse md:flex-row items-start justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3">
              <motion.div
                layout
                className={cn("flex size-10 items-center justify-center rounded-xl" , errorCount > 0 ? "bg-destructive/10" : "bg-emerald-500/10")}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {errorCount > 0 ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.7, rotate: 10 }}
                      transition={{ duration: 0.18 }}
                    >
                      <AlertCircle className="size-5 text-destructive" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.18 }}
                    >
                      <CheckCircle2 className="size-5 text-emerald-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div>
                <h1 className="text-xl font-semibold tracking-tight">Issues</h1>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={
                      errorCount > 0
                        ? `errors-${errorCount}`
                        : attempted
                          ? "success"
                          : "idle"
                    }
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.16 }}
                    className="text-sm text-muted-foreground"
                  >
                    {errorCount > 0
                      ? `${errorCount} ${
                          errorCount === 1 ? "issue" : "issues"
                        } need your attention`
                      : attempted
                        ? "Everything looks good"
                        : "Validation issues will appear here"}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <BackToQuestuonsButton />
        </motion.div>

        {/* Issues */}
        <AnimatePresence mode="popLayout" initial={false}>
          {errorCount > 0 ? (
            <motion.div
              key="issues"
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="space-y-2"
            >
              <AnimatePresence initial={false} mode="popLayout">
                {issues.map((issue) => (
                  <motion.button
                    key={issue.id}
                    layout
                    type="button"
                    onClick={() => onIssueClick(issue.path)}
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      x: -12,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="group flex w-full items-start gap-4 rounded-xl border bg-background p-4 text-left transition-colors hover:bg-muted/50"
                  >
                    <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" />

                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{issue.message}</p>

                      <IssueLocation path={issue.path} />
                    </div>

                    <ChevronRight className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              layout
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.98,
              }}
              transition={{
                duration: 0.22,
                ease: "easeOut",
              }}
              className="rounded-2xl border border-dashed p-12 text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.08,
                  duration: 0.25,
                  ease: "backOut",
                }}
                className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-emerald-500/10"
              >
                <CheckCircle2 className="size-6 text-emerald-500" />
              </motion.div>

              <h2 className="font-semibold">No issues found</h2>

              <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                Your quiz has passed validation and is ready for the next step.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
