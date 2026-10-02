"use client";

import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { IconAlertCircle } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

interface FieldErrorProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  className?: string;
}

export function FieldError<T extends FieldValues>({
  control,
  name,
  className,
}: FieldErrorProps<T>) {
  const {
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <AnimatePresence initial={false} mode="wait">
      {error?.message && (
        <motion.p
          key={error.message}
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          role="alert"
          className={cn(
            "mt-1.5 flex items-start gap-1.5",
            "text-xs font-medium leading-4 text-destructive",
            className,
          )}
        >
          <IconAlertCircle
            className="mt-0.5 size-3.5 shrink-0"
            stroke={2}
          />

          <span className="min-w-0">{error.message}</span>
        </motion.p>
      )}
    </AnimatePresence>
  );
}
