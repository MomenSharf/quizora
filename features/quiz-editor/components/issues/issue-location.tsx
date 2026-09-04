"use client";

import { Fragment } from "react";

interface IssueLocationProps {
  path: string;
}

function formatPath(path: string) {
  const parts = path.split(".");

  const result: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (part === "questions") {
      const index = Number(parts[++i]);
      result.push(`Question ${index + 1}`);
      continue;
    }

    if (part === "content") {
      continue;
    }

    if (part === "options") {
      const index = Number(parts[++i]);
      result.push(`Option ${index + 1}`);
      continue;
    }

    if (part === "text") {
      result.push("Answer text");
      continue;
    }

    if (part === "settings") {
      result.push("Settings");
      continue;
    }

    if (part === "appearance") {
      result.push("Appearance");
      continue;
    }

    // Convert camelCase to readable text
    const readable = part
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    result.push(readable);
  }

  return result;
}

export function IssueLocation({
  path,
}: IssueLocationProps) {
  const parts = formatPath(path);

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-1 text-xs text-muted-foreground">
      {parts.map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          {index > 0 && (
            <span className="text-muted-foreground/50">
              →
            </span>
          )}

          <span className="truncate">
            {part}
          </span>
        </Fragment>
      ))}
    </div>
  );
}