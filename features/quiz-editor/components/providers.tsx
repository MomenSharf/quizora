"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAutosaveHook } from "../hooks/use-autosave";
import { useHistorySync } from "../hooks/use-history-synce";
import { useEditorActions } from "../store";
import { type QuizEditorInput, QuizEditorSchema } from "../validation/quiz";

interface QuizEditorProviderProps {
  initialData: QuizEditorInput;
  children: React.ReactNode;
}

export function QuizEditorProvider({
  initialData,
  children,
}: QuizEditorProviderProps) {
  const { reset } = useEditorActions();

  const methods = useForm<QuizEditorInput>({
    resolver: zodResolver(QuizEditorSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  // useEffect(() => {
  //   return () => {
  //     reset();
  //   };
  // }, [reset]);

  return (
    <FormProvider {...methods}>
      <EditorSynchronizerChildrenWrapper>
        {children}
      </EditorSynchronizerChildrenWrapper>
    </FormProvider>
  );
}

function EditorSynchronizerChildrenWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // useAutosaveHook();
  // useHistorySync();

  return <>{children}</>;
}
