"use client";

import { type PropsWithChildren } from "react";

import type { QuizEditor } from "@/features/quiz-editor/validation/quiz";

import { QuizFormProvider } from "./quiz-form-provider";
import { AutosaveProvider } from "../autosave/autosave-provider";
import { HistoryProvider } from "../history/history-provider";

interface Props extends PropsWithChildren {
  quiz: QuizEditor;
}

export function QuizEditorProvider({
  quiz,
  children,
}: Props) {
  return (
    <QuizFormProvider quiz={quiz}>
      <HistoryProvider>
        <AutosaveProvider>{children}</AutosaveProvider>
      </HistoryProvider>
    </QuizFormProvider>
  );
}