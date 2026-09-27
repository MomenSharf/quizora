import type { FieldErrors } from "react-hook-form";

import type { QuizEditor } from "../../validation/quiz";

export interface EditorIssue {
  id: string;
  path: string;
  message: string;
  section: EditorIssueSection;
  questionIndex?: number;
}

export type EditorIssueSection = "settings" | "questions";

export interface EditorIssueGroup {
  questionIndex?: number;
  issues: EditorIssue[];
  section: EditorIssueSection;
}

function isFieldError(value: unknown): value is {
  message?: unknown;
  type?: unknown;
} {
  return (
    typeof value === "object" &&
    value !== null &&
    ("message" in value || "type" in value)
  );
}

function getQuestionIndex(path: string): number | undefined {
  const match = path.match(/^questions\.(\d+)(?:\.|$)/);

  return match ? Number(match[1]) : undefined;
}

function getIssueSection(path: string): EditorIssueSection {
  return path.startsWith("questions.") ? "questions" : "settings";
}

function walkErrors(
  value: unknown,
  parentPath = "",
  issues: EditorIssue[] = [],
): EditorIssue[] {
  if (!value || typeof value !== "object") {
    return issues;
  }

  if (isFieldError(value)) {
    const message =
      typeof value.message === "string"
        ? value.message
        : "This field is invalid.";

    issues.push({
      id: parentPath,
      path: parentPath,
      message,
      section: getIssueSection(parentPath),
      questionIndex: getQuestionIndex(parentPath),
    });

    return issues;
  }

  for (const [key, child] of Object.entries(value)) {
    if (child == null) continue;

    const path = parentPath ? `${parentPath}.${key}` : key;

    walkErrors(child, path, issues);
  }

  return issues;
}

export function getEditorIssues(
  errors: FieldErrors<QuizEditor>,
): EditorIssue[] {
  return walkErrors(errors);
}

export function groupEditorIssues(
  issues: EditorIssue[],
): EditorIssueGroup[] {
  const groups = new Map<string, EditorIssueGroup>();

  for (const issue of issues) {
    if (issue.section === "settings") {
      const existing = groups.get("general");

      if (existing) {
        existing.issues.push(issue);
      } else {
        groups.set("general", {
          questionIndex: undefined,
          issues: [issue],
          section: "settings",
        });
      }

      continue;
    }

    if (issue.questionIndex === undefined) {
      continue;
    }

    const key = `question-${issue.questionIndex}`;
    const existing = groups.get(key);

    if (existing) {
      existing.issues.push(issue);
      continue;
    }

    groups.set(key, {
      questionIndex: issue.questionIndex,
      issues: [issue],
      section: "questions",
    });
  }

  return Array.from(groups.values()).sort((a, b) => {
    if (a.section === "settings") return -1;
    if (b.section === "settings") return 1;

    return (a.questionIndex ?? 0) - (b.questionIndex ?? 0);
  });
}
