"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { QuizSchema, type Quiz } from "@/features/quiz-editor/validation/quiz";

import { useQuizEditorStore } from "../store";
import { useAutosave } from "./use-autosave";

type Props = {
  initialValues: Quiz;

  children: React.ReactNode;
};

export function QuizEditorProvider({ initialValues, children }: Props) {
  const setSaveState = useQuizEditorStore((state) => state.setSaveState);

  const form = useForm<Quiz>({
    resolver: zodResolver(QuizSchema),

    defaultValues: initialValues,

    mode: "onChange",
  });

  useEffect(() => {
    form.reset(initialValues);

    setSaveState("idle");
  }, [form, initialValues, setSaveState]);

  useAutosave(form);

  return <FormProvider {...form}>{children}</FormProvider>;
}
