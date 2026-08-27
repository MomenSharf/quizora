"use client";

import React from "react";
import { motion } from "framer-motion"
import {
  Check,
  Globe2,
  Link2,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Visibility } from "@/lib/db/generated/prisma/enums";



interface VisibilitySelectorProps {
  value?: Visibility;
  onChange: (value: Visibility) => void;
}

const options = [
  {
    value: Visibility.PRIVATE,
    title: "Private",
    description: "Only you can access this quiz.",
    icon: Lock,
  },
  {
    value: Visibility.UNLISTED,
    title: "Unlisted",
    description: "Anyone with the link can access it.",
    icon: Link2,
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
}: VisibilitySelectorProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const Icon = option.icon;
        const selected = value === option.value;

        return (
          <motion.button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            whileTap={{ scale: 0.985 }}
            className={[
              "group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border p-4 text-left transition-all duration-200",
              selected
                ? "border-primary/40 bg-primary/[0.045] shadow-sm"
                : "border-border/60 bg-background hover:border-border hover:bg-muted/40",
            ].join(" ")}
          >
            {/* Animated selected background */}
            {selected && (
              <motion.div
                layoutId="visibility-selected"
                className="absolute inset-0 -z-0 bg-primary/[0.025]"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}

            {/* Icon */}
            <motion.div
              animate={{
                scale: selected ? 1 : 0.96,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              className={[
                "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                selected
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground group-hover:text-foreground",
              ].join(" ")}
            >
              <Icon className="size-4" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  {option.title}
                </span>

                {option.value === Visibility.PUBLIC && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Recommended
                  </span>
                )}
              </div>

              <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                {option.description}
              </p>
            </div>

            {/* Check */}
            <div className="relative z-10 flex size-5 shrink-0 items-center justify-center">
              <motion.div
                initial={false}
                animate={{
                  scale: selected ? 1 : 0.7,
                  opacity: selected ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 25,
                }}
                className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <Check className="size-3" strokeWidth={3} />
              </motion.div>

              {!selected && (
                <div className="absolute size-5 rounded-full border border-border/80 transition-colors group-hover:border-foreground/30" />
              )}
            </div>
          </motion.button>
        );
      })}

      {/* Information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 flex items-start gap-2.5 rounded-xl bg-muted/40 px-3.5 py-3"
      >
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

        <p className="text-[11px] leading-5 text-muted-foreground">
          You can change your quiz visibility at any time. Private quizzes
          won&apos;t appear in search or public listings.
        </p>
      </motion.div>
    </div>
  );
}