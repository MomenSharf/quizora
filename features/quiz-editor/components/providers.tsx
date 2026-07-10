"use client";

import { useEffect, useRef } from "react";
import {
  FormProvider,
  useForm,
  type UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  QuizEditorSchema,
  type QuizEditorInput,
} from "../validation/quiz";

import { useEditorActions } from "../store";

import { useAutosaveHook } from "../hooks/use-autosave";
import { useHistorySync } from "../hooks/use-history-sync";

interface QuizEditorProviderProps {
  initialData: QuizEditorInput;
  children: React.ReactNode;
}

export function QuizEditorProvider({
  initialData,
  children,
}: QuizEditorProviderProps) {
  const methods = useQuizEditorForm(initialData);

  return (
    <FormProvider {...methods}>
      <QuizEditorEffects />
      {children}
    </FormProvider>
  );
}

function useQuizEditorForm(
  initialData: QuizEditorInput,
): UseFormReturn<QuizEditorInput> {
  const methods = useForm<QuizEditorInput>({
    resolver: zodResolver(QuizEditorSchema),
    defaultValues: initialData,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  const previousId = useRef(initialData.id);

  useEffect(() => {
    if (previousId.current !== initialData.id) {
      methods.reset(initialData);
      previousId.current = initialData.id;
    }
  }, [initialData, methods]);

  return methods;
}

function QuizEditorEffects() {
  const { reset } = useEditorActions();

  useAutosaveHook();
  useHistorySync();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return null;
}