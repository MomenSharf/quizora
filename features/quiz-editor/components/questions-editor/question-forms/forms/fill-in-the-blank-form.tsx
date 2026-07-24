import RichTextEditor from "@/components/rich-text-editor";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { parseFillInTheBlank } from "@/features/quiz-editor/lib/fill-in-the-blank-parser";
import { serializeFillInTheBlank } from "@/features/quiz-editor/lib/fill-in-the-blank-serializer";
import {
  FillBlankData
} from "@/features/quiz-editor/validation/question";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import ExplanationSection from "../explanation-section";
import { QuestionFormProps } from "../question-form-router";
import QuestionSection from "../question-section";
import { SectionCard } from "../section-card";

export function FillinTheBlankForm({ questionIndex }: QuestionFormProps) {
  const { control, setValue } = useQuizForm();

  const content = useWatch({
    control,
    name: `questions.${questionIndex}.content`,
  }) as FillBlankData;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const editorContent = useMemo(() => serializeFillInTheBlank(content), []);
  
  return (
    <div className="space-y-5">
      <SectionCard type="FILL_BLANK" title="Fill in the Blank">
        <QuestionSection questionIndex={questionIndex} type="FILL_BLANK" />
      </SectionCard>
      <SectionCard type="FILL_BLANK" title="Blanks">
        <div className="group rounded-xl border bg-card transition-all duration-200 hover:border-primary/20 focus-within:border-primary/40 focus-within:shadow-sm">
          <div className="p-4">
            <RichTextEditor
              content={editorContent}
              placeholder="Type your sentence and insert blanks..."
              allowInsertBlank
              className="
                        min-h-60
                        rounded-lg
                        border-0
                        bg-transparent
                        px-5
                        py-4
                        shadow-none

                        focus-visible:border-transparent
                        focus-visible:ring-0

                        [&_.ProseMirror]:min-h-52
                        [&_.ProseMirror]:outline-none
                        [&_.ProseMirror]:text-[15px]
                        [&_.ProseMirror]:leading-7
                        [&_.ProseMirror]:tracking-normal
                        [&_.ProseMirror]:text-foreground

                        [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground/70
                      "
              onJsonChange={(json) => {
                const data = parseFillInTheBlank(json);

                setValue(`questions.${questionIndex}.content`, data, {
                  shouldDirty: true,
                });
              }}
            />
          </div>
        </div>
      </SectionCard>
      <SectionCard type="FILL_BLANK" title="Explanation">
        <ExplanationSection questionIndex={questionIndex} />
      </SectionCard>
    </div>
  );
}
