
"use client";

import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useEditorValidation } from "../../hooks/use-editor-validation";

import { IssueLocation } from "./issue-location";

import BackToQuestuonsButton from "../back-to-questions-button ";

import { cn } from "@/lib/utils";

export function IssuesPanel() {
  const {
    issueGroups,
    errorCount,
    attempted,
    focusIssue,
  } = useEditorValidation();

  
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    () => new Set(),
  );

  const groupKeys = useMemo(
    () =>
      issueGroups.map((group) =>
        group.questionIndex !== undefined
          ? `question:${group.questionIndex}`
          : `section:${group.section}`,
      ),
    [issueGroups],
  );

  const allCollapsed =
    groupKeys.length > 0 &&
    groupKeys.every((key) => collapsedGroups.has(key));

  const toggleGroup = (key: string) => {
    setCollapsedGroups((current) => {
      const next = new Set(current);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  };

  const toggleAll = () => {
    setCollapsedGroups(
      allCollapsed
        ? new Set()
        : new Set(groupKeys),
    );
  };

  const getGroupTitle = (
    group: (typeof issueGroups)[number],
  ) => {
    if (group.questionIndex !== undefined) {
      return `Question ${group.questionIndex + 1}`;
    }

    if (group.section === "settings") {
      return "Settings";
    }

    return "General";
  };

  const getGroupDescription = (
    group: (typeof issueGroups)[number],
  ) => {
    const count = group.issues.length;

    return `${count} ${count === 1 ? "issue" : "issues"}`;
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        {/* Header */}
        <motion.div
          layout
          className="mb-8 flex flex-col-reverse items-start justify-between gap-4 md:flex-row"
        >
          <div>
            <div className="flex items-center gap-3">
              <motion.div
                layout
                className={cn(
                  "flex size-10 items-center justify-center rounded-xl",
                  errorCount > 0
                    ? "bg-destructive/10"
                    : "bg-emerald-500/10",
                )}
              >
                <AnimatePresence
                  mode="wait"
                  initial={false}
                >
                  {errorCount > 0 ? (
                    <motion.div
                      key="error"
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                        rotate: -10,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.7,
                        rotate: 10,
                      }}
                      transition={{ duration: 0.18 }}
                    >
                      <AlertCircle className="size-5 text-destructive" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      transition={{ duration: 0.18 }}
                    >
                      <CheckCircle2 className="size-5 text-emerald-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  Issues
                </h1>

                <AnimatePresence
                  mode="wait"
                  initial={false}
                >
                  <motion.p
                    key={
                      errorCount > 0
                        ? `errors-${errorCount}`
                        : attempted
                          ? "success"
                          : "idle"
                    }
                    initial={{
                      opacity: 0,
                      y: 4,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -4,
                    }}
                    transition={{ duration: 0.16 }}
                    className="text-sm text-muted-foreground"
                  >
                    {errorCount > 0
                      ? `${errorCount} ${
                          errorCount === 1
                            ? "issue"
                            : "issues"
                        } need your attention`
                      : attempted
                        ? "Everything looks good"
                        : "Validation issues will appear here"}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {errorCount > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={toggleAll}
              >
                <ChevronDown
                  className={cn(
                    "mr-2 size-4 transition-transform",
                    !allCollapsed && "-rotate-90",
                  )}
                />

                {allCollapsed
                  ? "Expand all"
                  : "Collapse all"}
              </Button>
            )}

            <BackToQuestuonsButton />
          </div>
        </motion.div>

        {/* Issues */}
        <AnimatePresence
          mode="popLayout"
          initial={false}
        >
          {errorCount > 0 ? (
            <motion.div
              key="issues"
              layout
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="space-y-3"
            >
              <AnimatePresence
                initial={false}
                mode="popLayout"
              >
                {issueGroups.map((group) => {
                  const key =
                    group.questionIndex !== undefined
                      ? `question:${group.questionIndex}`
                      : `section:${group.section}`;

                  const isExpanded =
                    !collapsedGroups.has(key);

                  return (
                    <motion.div
                      key={key}
                      layout
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
                      className="overflow-hidden rounded-xl border bg-background"
                    >
                      {/* Group header */}
                      <button
                        type="button"
                        onClick={() =>
                          toggleGroup(key)
                        }
                        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/50"
                      >
                        <motion.div
                          animate={{
                            rotate: isExpanded
                              ? 90
                              : 0,
                          }}
                          transition={{
                            duration: 0.18,
                          }}
                        >
                          <ChevronRight className="size-5 text-muted-foreground" />
                        </motion.div>

                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                            <AlertCircle className="size-4 text-destructive" />
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium">
                              {getGroupTitle(group)}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {getGroupDescription(
                                group,
                              )}
                            </p>
                          </div>
                        </div>

                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-xs font-medium text-destructive">
                          {group.issues.length}
                        </span>
                      </button>

                      {/* Group issues */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0,
                            }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                            }}
                            transition={{
                              duration: 0.2,
                              ease: "easeOut",
                            }}
                          >
                            <div className="border-t">
                              <div className="space-y-2 p-3">
                                <AnimatePresence
                                  initial={false}
                                  mode="popLayout"
                                >
                                  {group.issues.map(
                                    (issue) => (
                                      <motion.button
                                        key={issue.id}
                                        layout
                                        type="button"
                                        onClick={() =>
                                          focusIssue(
                                            issue.path,
                                          )
                                        }
                                        initial={{
                                          opacity: 0,
                                          y: -6,
                                        }}
                                        animate={{
                                          opacity: 1,
                                          y: 0,
                                        }}
                                        exit={{
                                          opacity: 0,
                                          x: -8,
                                        }}
                                        transition={{
                                          duration: 0.16,
                                        }}
                                        className="group flex w-full items-start gap-3 rounded-lg border bg-background p-3 text-left transition-colors hover:bg-muted/50"
                                      >
                                        <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />

                                        <div className="min-w-0 flex-1">
                                          <p className="text-sm font-medium">
                                            {issue.message}
                                          </p>

                                          <IssueLocation
                                            path={issue.path}
                                          />
                                        </div>

                                        <ChevronRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                                      </motion.button>
                                    ),
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
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
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.08,
                  duration: 0.25,
                  ease: "backOut",
                }}
                className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-emerald-500/10"
              >
                <CheckCircle2 className="size-6 text-emerald-500" />
              </motion.div>

              <h2 className="font-semibold">
                No issues found
              </h2>

              <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                Your quiz has passed validation and is
                ready for the next step.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
