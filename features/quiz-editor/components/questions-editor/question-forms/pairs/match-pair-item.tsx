"use client";

import { useRef, useState } from "react";

import { motion } from "framer-motion";
import { useQuizForm } from "@/features/quiz-editor/hooks/use-quiz-form";
import { MatchPair } from "@/features/quiz-editor/validation/question";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/react/sortable";
import { createId } from "@paralleldrive/cuid2";
import {
  IconArrowsLeftRight,
  IconGripVertical,
} from "@tabler/icons-react";
import { useController, useWatch } from "react-hook-form";
import { ActionsDropdown } from "../../actions-dropdown";
import { ImageField } from "../../../image-upload/image-field";
import { ImageButtonTrigger } from "../../../image-upload/image-button-trigger";

export default function MatchPairItem({
  pairId,
  pair,
  index,
  questionIndex,
  autoResize,
  textareaRef,
  rightTextareaRef,
  moveUp,
  moveDown,
  canMoveUp,
  canMoveDown,
}: {
  pairId: string;
  pair: MatchPair;
  index: number;
  questionIndex: number;
  autoResize: (textarea: HTMLTextAreaElement) => void;
  textareaRef: (el: HTMLTextAreaElement | null) => void;
  rightTextareaRef: (el: HTMLTextAreaElement | null) => void;
  moveUp: () => void;
  moveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const [element, setElement] = useState<Element | null>(null);
  const [flipKey, setFlipKey] = useState(0);

  const handleRef = useRef<HTMLButtonElement | null>(null);

  const {
    control,
    setValue,
    resetField,
    formState: { dirtyFields },
  } = useQuizForm();

  const pairs = useWatch({
    control,
    name: `questions.${questionIndex}.content.pairs`,
  });

  const { field: leftText } = useController({
    control,
    name: `questions.${questionIndex}.content.pairs.${index}.left.text`,
  });

  const { field: rightText } = useController({
    control,
    name: `questions.${questionIndex}.content.pairs.${index}.right.text`,
  });

  const { isDragging } = useSortable({
    id: pairId,
    index,
    element,
    handle: handleRef,
  });

  const canReset = !!(
    dirtyFields.questions?.[questionIndex]?.content as { pairs: MatchPair[] }
  )?.pairs?.[index];

  const onReset = () =>
    resetField(`questions.${questionIndex}.content.pairs.${index}`);

  const onDelete = () => {
    if (questionIndex === -1 || !pairs) return;

    const nextPairs = pairs.filter((p) => p.id !== pair.id);

    setValue(`questions.${questionIndex}.content.pairs`, nextPairs, {
      shouldDirty: true,
    });
  };

  const onDuplicate = () => {
    if (questionIndex === -1 || !pairs) return;

    const pairIndex = pairs.findIndex((p) => p.id === pair.id);
    if (pairIndex === -1) return;

    const duplicatedPair = {
      ...pair,
      id: createId(),
    };

    const nextPairs = [...pairs];
    nextPairs.splice(pairIndex + 1, 0, duplicatedPair);

    setValue(`questions.${questionIndex}.content.pairs`, nextPairs, {
      shouldDirty: true,
    });
  };

  const onFlip = () => {
    if (!pairs) return;

    setValue(
      `questions.${questionIndex}.content.pairs.${index}`,
      {
        ...pair,
        left: pair.right,
        right: pair.left,
      },
      {
        shouldDirty: true,
      },
    );

    setFlipKey((value) => value + 1);
  };

  return (
    <motion.div
      ref={setElement}
      layout
      initial={{
        opacity: 0,
        y: 8,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isDragging ? 1.02 : 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.96,
        height: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        overflow: "hidden",
      }}
      transition={{
        layout: {
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: {
          duration: 0.18,
        },
        scale: {
          duration: 0.2,
        },
      }}
      className={cn(
        "group rounded-xl border bg-card p-3",
        "hover:border-primary hover:shadow-sm",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        isDragging && "z-50 shadow-xl ring-2 ring-primary",
      )}
    >
      <div className="flex items-start gap-3">
        <button
          ref={handleRef}
          type="button"
          className="mt-1 cursor-grab rounded-md p-1 text-muted-foreground active:cursor-grabbing lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <IconGripVertical className="size-5" />
        </button>

        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/18 text-sm font-semibold text-primary">
          {index + 1}
        </div>

        <div className="flex-1">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <motion.div
              key={`left-${flipKey}`}
              initial={{
                opacity: 0,
                x: -16,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-2"
            >
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Left
              </div>

              <ImageField
                key={pair.left.image?.id}
                name={`questions.${questionIndex}.content.pairs.${index}.left.image`}
                trigger={(props) => <ImageButtonTrigger {...props} />}
              />

              <div className="rounded-lg border p-2">
                <textarea
                  {...leftText}
                  ref={(el) => {
                    leftText.ref(el);
                    textareaRef(el);

                    if (el) {
                      requestAnimationFrame(() => autoResize(el));
                    }
                  }}
                  onInput={(e) => autoResize(e.currentTarget)}
                  rows={1}
                  placeholder={`Left item ${index + 1}`}
                  className="h-11 min-h-11 w-full overflow-y-auto bg-transparent text-sm outline-none"
                  data-field-names={`questions.${questionIndex}.content.pairs.${index}.left.text`}
                />
              </div>
            </motion.div>

            <motion.button
              type="button"
              onClick={onFlip}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                rotate: flipKey % 2 === 0 ? 0 : 180,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center justify-center self-center max-lg:py-2"
            >
              <div className="flex size-11 items-center justify-center rounded-full border border-primary/35 bg-primary/12 text-primary transition-colors hover:bg-primary/30">
                <IconArrowsLeftRight className="size-5" />
              </div>
            </motion.button>

            <motion.div
              key={`right-${flipKey}`}
              initial={{
                opacity: 0,
                x: 16,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-2"
            >
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Right
              </div>

              <ImageField
                key={pair.right.image?.id}
                name={`questions.${questionIndex}.content.pairs.${index}.right.image`}
                trigger={(props) => <ImageButtonTrigger {...props} />}
              />

              <div className="rounded-lg border p-2">
                <textarea
                  {...rightText}
                  ref={(el) => {
                    rightText.ref(el);
                    rightTextareaRef(el);

                    if (el) {
                      requestAnimationFrame(() => autoResize(el));
                    }
                  }}
                  onInput={(e) => autoResize(e.currentTarget)}
                  rows={1}
                  placeholder={`Right item ${index + 1}`}
                  className="h-11 min-h-11 w-full overflow-y-auto bg-transparent text-sm outline-none"
                  data-field-names={`questions.${questionIndex}.content.pairs.${index}.right.text`}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="hidden shrink-0 lg:block lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100">
          <ActionsDropdown
            onDuplicate={onDuplicate}
            onDelete={onDelete}
            canDelete={pairs.length > 1}
            canReset={canReset}
            onReset={onReset}
            canMoveDown={canMoveDown}
            canMoveUp={canMoveUp}
            moveDown={moveDown}
            moveUp={moveUp}
          />
        </div>
      </div>

      <div className="mt-3 flex justify-end lg:hidden">
        <ActionsDropdown
          onDuplicate={onDuplicate}
          onDelete={onDelete}
          canDelete={pairs.length > 1}
          canMoveDown={canMoveDown}
          canMoveUp={canMoveUp}
          moveDown={moveDown}
          moveUp={moveUp}
        />
      </div>
    </motion.div>
  );
}