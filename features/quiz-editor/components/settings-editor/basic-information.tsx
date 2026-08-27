"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Languages, PenLine, Tag } from "lucide-react";
import React from "react";
import { Controller } from "react-hook-form";

import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { QUIZ_LANGUAGES } from "@/lib/config/languages";
import { QUIZ_CATEGORIES } from "@/lib/config/quiz-categories";


function FieldLabel({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2.5 flex items-center gap-2 text-sm font-medium">
      <Icon className="size-4 text-muted-foreground" />
      <span>{children}</span>
    </div>
  );
}

export default function BasicInformation() {
  const { control } = useQuizForm();

  return (
    <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="border-b px-5 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-muted">
            <BookOpen className="size-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold">Basic information</h2>
            <p className="text-xs text-muted-foreground">
              Tell people what your quiz is about.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 md:p-6">
        {/* Title */}
        <Controller
          name="info.title"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <FieldLabel icon={PenLine}>Title</FieldLabel>

              <input
                {...field}
                value={field.value ?? ""}
                placeholder="Give your quiz a great title..."
                className="quiz-editor-input"
              />

              {fieldState.error && (
                <p className="mt-1.5 text-xs text-destructive">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Description */}
        <Controller
          name="info.description"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <FieldLabel icon={PenLine}>Description</FieldLabel>

              <textarea
                {...field}
                value={field.value ?? ""}
                rows={4}
                maxLength={500}
                placeholder="Add a short description of your quiz..."
                className="quiz-editor-textarea"
              />

              <div className="mt-1.5 flex items-center justify-between">
                {fieldState.error ? (
                  <p className="text-xs text-destructive">
                    {fieldState.error.message}
                  </p>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Optional
                  </span>
                )}

                <span className="text-xs text-muted-foreground">
                  {(field.value ?? "").length}/500
                </span>
              </div>
            </div>
          )}
        />

        {/* Category + Language */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Category */}
          <Controller
            name="info.category"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <FieldLabel icon={Tag}>Category</FieldLabel>

                <Select
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    className={[
                      "quiz-editor-input",
                      fieldState.error
                        ? "border-destructive focus:ring-destructive/10"
                        : "focus:border-primary/50",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="size-4 text-muted-foreground" />
                      <SelectValue placeholder="Select a category" />
                    </div>
                  </SelectTrigger>

                  <SelectContent className="rounded-xl" position="popper">
                    {QUIZ_CATEGORIES.map((category) => (
                      <SelectItem
                        key={category.value}
                        value={category.value}
                        className="rounded-lg"
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.error && (
                  <p className="mt-1.5 text-xs text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Language */}
          <Controller
            name="info.language"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <FieldLabel icon={Languages}>Language</FieldLabel>

                <Select
                  value={field.value ?? "en"}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    className={[
                      "quiz-editor-input",
                      fieldState.error
                        ? "border-destructive focus:ring-destructive/10"
                        : "focus:border-primary/50",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2">
                      <Languages className="size-4 text-muted-foreground" />
                      <SelectValue placeholder="Select a language" />
                    </div>
                  </SelectTrigger>

                  <SelectContent className="rounded-xl" position="popper">
                    {QUIZ_LANGUAGES.map((language) => (
                      <SelectItem
                        key={language.value}
                        value={language.value}
                        className="rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <span>{language.label}</span>

                          <span className="text-xs text-muted-foreground">
                            {language.nativeLabel}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.error && (
                  <p className="mt-1.5 text-xs text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
