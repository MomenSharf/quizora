"use client";

import { useMemo } from "react";
import {
  FormProvider,
  useForm,
  type DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  QuizSchema,
  type Quiz,
} from "@/features/quiz-editor/validation/quiz";

import { useAutosave } from "./use-autosave";

type Props = {
  values: Quiz;

  children: React.ReactNode;
};

export function QuizEditorForm({
  values,
  children,
}: Props) {
  const defaultValues = useMemo<DefaultValues<Quiz>>(
    () => values,
    [values],
  );

  const form = useForm<Quiz>({
    resolver: zodResolver(QuizSchema),

    defaultValues,

    mode: "onChange",

    reValidateMode: "onChange",

    shouldFocusError: false,
  });

  useAutosave(form);

  return (
    <FormProvider {...form}>
      {children}
    </FormProvider>
  );
}