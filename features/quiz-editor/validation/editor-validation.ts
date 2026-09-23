import type { FieldErrors } from "react-hook-form";

import type { QuizEditor } from "./quiz";

export interface EditorIssue {
  id: string;
  path: string;
  message: string;
  section: string;
  questionIndex?: number;
}

export interface EditorIssueGroup {
  questionIndex?: number;
  section: string;
  issues: EditorIssue[];
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

function getSectionFromPath(path: string): string {
  if (path.startsWith("questions")) {
    return "questions";
  }

  if (path.startsWith("settings")) {
    return "settings";
  }

  return "info";
}

function getQuestionIndex(path: string): number | undefined {
  const match = path.match(/^questions\.(\d+)/);

  return match ? Number(match[1]) : undefined;
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
      section: getSectionFromPath(parentPath),
      questionIndex: getQuestionIndex(parentPath),
    });

    return issues;
  }

  for (const [key, child] of Object.entries(value)) {
    if (child == null) continue;

    const path = parentPath
      ? `${parentPath}.${key}`
      : key;

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
    const key =
      issue.questionIndex !== undefined
        ? `question:${issue.questionIndex}`
        : `section:${issue.section}`;

    const existing = groups.get(key);

    if (existing) {
      existing.issues.push(issue);
      continue;
    }

    groups.set(key, {
      questionIndex: issue.questionIndex,
      section: issue.section,
      issues: [issue],
    });
  }

  return Array.from(groups.values());
}