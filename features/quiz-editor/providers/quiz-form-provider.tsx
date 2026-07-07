"use client";

import {
  createContext,
  use,
  useMemo,
  type PropsWithChildren,
} from "react";

import {
  FormProvider,
  useForm,
  type UseFormReturn,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  QuizEditorSchema,
  type QuizEditor,
} from "@/features/quiz-editor/validation/quiz";

type QuizFormContextValue = UseFormReturn<QuizEditor>;

const QuizFormContext =
  createContext<QuizFormContextValue | null>(null);

interface Props extends PropsWithChildren {
  quiz: QuizEditor;
}

export function QuizFormProvider({
  quiz,
  children,
}: Props) {
  const form = useForm<QuizEditor>({
    resolver: zodResolver(QuizEditorSchema),

    defaultValues: quiz,

    mode: "onChange",

    reValidateMode: "onChange",

    shouldFocusError: false,

    shouldUnregister: false,
  });

  const value = useMemo(() => form, [form]);

  return (
    <QuizFormContext value={value}>
      <FormProvider {...form}>
        {children}
      </FormProvider>
    </QuizFormContext>
  );
}

export function useQuizForm() {
  const context = use(QuizFormContext);

  if (!context) {
    throw new Error(
      "useQuizForm must be used inside QuizFormProvider",
    );
  }

  return context;
}