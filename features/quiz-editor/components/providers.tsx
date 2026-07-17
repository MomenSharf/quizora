"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";

import { QuizEditorSchema, type QuizEditor } from "../validation/quiz";

import { EditorState, useEditorActions } from "../store";

import { useAutosaveHook } from "../hooks/use-autosave";

interface QuizEditorProviderProps {
  initialData: QuizEditor;
  initialState: EditorState;
  children: React.ReactNode;
}

export function QuizEditorProvider({
  initialData,
  initialState,
  children,
}: QuizEditorProviderProps) {
  const methods = useQuizEditorForm(initialData);

  const { setState } = useEditorActions();

  useEffect(() => {
    console.log("initialState", initialState);
    setState(initialState);
  }, [initialState, setState]);

  return (
    <FormProvider {...methods}>
      <QuizEditorEffects />
      {children}
    </FormProvider>
  );
}

function useQuizEditorForm(initialData: QuizEditor): UseFormReturn<QuizEditor> {
  const methods = useForm<QuizEditor>({
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
  // useHistorySync();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return null;
}
