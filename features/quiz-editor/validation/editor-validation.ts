import type { FieldErrors } from "react-hook-form";

import type { QuizEditor } from "./quiz";

export interface EditorIssue {
  id: string;
  path: string;
  message: string;
  section?: string;
  questionIndex?: number;
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

function getSectionFromPath(path: string) {
  if (path.startsWith("questions")) {
    return "questions";
  }

  if (path.startsWith("settings")) {
    return "settings";
  }

  // if (path.startsWith("appearance")) {
  //   return "appearance";
  // }

  return "info";
}

function getQuestionIndex(path: string) {
  const match = path.match(/^questions\.(\d+)/);

  return match ? Number(match[1]) : undefined;
}

function walkErrors(
  value: unknown,
  parentPath = "",
  issues: EditorIssue[] = [],
) {
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