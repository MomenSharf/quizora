"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Globe2,
  Loader2,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Visibility } from "@/lib/db/generated/prisma/enums";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useQuizForm } from "../../hooks/use-quiz-form";
import { useEditorValidation } from "../../hooks/use-editor-validation";
import { useEditorActions, useEditorStore } from "../../store";
import { publishQuiz } from "../../actions/publish-quiz";

interface VisibilitySelectorProps {
  value?: Visibility;
  onChange: (value: Visibility) => void;
  lastPublishedAt?: Date | string | null;
}

const options = [
  {
    value: Visibility.PRIVATE,
    title: "Private",
    description: "Only you can access this quiz.",
    icon: Lock,
  },
  {
    value: Visibility.PUBLIC,
    title: "Public",
    description: "Anyone can discover and play it.",
    icon: Globe2,
  },
] as const;

export default function VisibilitySelector({
  value = Visibility.PRIVATE,
  onChange,
  lastPublishedAt,
}: VisibilitySelectorProps) {
  const { getValues } = useQuizForm();
  const [isPublishing, setIsPublishing] = useState(false);

  const { validate } = useEditorValidation();
  const { setActivePanel } = useEditorActions();

  const onChangeVisibility = async (nextValue: Visibility) => {
    if (isPublishing || nextValue === value) return;

    if (nextValue === Visibility.PRIVATE) {
      onChange(Visibility.PRIVATE);
      return;
    }

    setIsPublishing(true);

    try {
      const valid = await validate();

      if (!valid) {
        setActivePanel("issues");

        toast.error("Your quiz needs attention", {
          description:
            "Fix the validation issues before publishing. Your visibility preference will be saved.",
        });

        onChange(Visibility.PUBLIC);
        return;
      }

      const editorState = useEditorStore.getState();
      const res = await publishQuiz(getValues(), editorState);

      if (res.error) {
        toast.error(res.error.message ?? "Failed to publish quiz");
        return;
      }

      onChange(Visibility.PUBLIC);
      toast.success(res.data.message);
    } finally {
      setIsPublishing(false);
    }
  };

  const publishedDate = lastPublishedAt
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(lastPublishedAt))
    : null;

  return (
    <div className="space-y-3">
      {options.map((option) => {
        const Icon = option.icon;
        const selected = value === option.value;
        const isPublic = option.value === Visibility.PUBLIC;

        return (
          <motion.button
            key={option.value}
            type="button"
            onClick={() => onChangeVisibility(option.value)}
            disabled={isPublishing}
            whileTap={!isPublishing ? { scale: 0.985 } : undefined}
            className={cn(
              "group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border p-4 text-left transition-all duration-200",
              selected
                ? "border-primary/40 bg-primary/[0.045] shadow-sm"
                : "border-border/60 bg-background hover:border-border hover:bg-muted/40",
              isPublishing && "cursor-wait opacity-60"
            )}
          >
            {selected && (
              <motion.div
                layoutId="visibility-selected"
                className="absolute inset-0 bg-primary/[0.025]"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}

            <div
              className={cn(
                "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                selected
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground group-hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
            </div>

            <div className="relative z-10 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold">
                  {option.title}
                </span>

                {option.value === Visibility.PRIVATE && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Draft
                  </span>
                )}

                {isPublic && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Published
                  </span>
                )}
              </div>

              <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                {option.description}
              </p>

              {isPublic && selected && publishedDate && (
                <p className="mt-1.5 text-[11px] font-medium text-primary">
                  Last published: {publishedDate}
                </p>
              )}
            </div>

            <div className="relative z-10 flex size-5 shrink-0 items-center justify-center">
              {isPublic && isPublishing ? (
                <Loader2 className="size-4 animate-spin text-primary" />
              ) : selected ? (
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Check className="size-3" strokeWidth={3} />
                </motion.div>
              ) : (
                <div className="size-5 rounded-full border border-border/80 transition-colors group-hover:border-foreground/30" />
              )}
            </div>
          </motion.button>
        );
      })}

      <div className="flex items-start gap-2.5 rounded-xl bg-muted/40 px-3.5 py-3">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

        <p className="text-[11px] leading-5 text-muted-foreground">
          You can change your quiz visibility at any time. Private quizzes
          won&apos;t appear in search or public listings.
        </p>
      </div>
    </div>
  );
}