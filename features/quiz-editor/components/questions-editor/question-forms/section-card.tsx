"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import { QuestionType } from "@/lib/db/generated/prisma/enums";
import { cn } from "@/lib/utils";
import { IconAdjustmentsHorizontal, IconChevronDown } from "@tabler/icons-react";
import { QuestionTypeIcon } from "../question-type-selector/question-type-icon";
import { Settings2 } from "lucide-react";

interface SectionCardProps {
  type: QuestionType;
  title: string;
  children: ReactNode;

  actions?: ReactNode;
  settings?: ReactNode;

  defaultOpen?: boolean;
  collapsible?: boolean;

  className?: string;
  contentClassName?: string;
}

export function SectionCard({
  type,
  title,
  children,
  actions,
  settings,

  defaultOpen = true,
  collapsible = true,

  className,
  contentClassName,
}: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = () => {
    if (collapsible) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-4 px-5 py-4 transition-colors",
          collapsible && "hover:bg-muted/40",
        )}
      >
        <div className="min-w-0 flex-1">
          <div className="flex gap-2 items-center">
            <QuestionTypeIcon type={type} />
            <h3 className="font-medium">{title}</h3>
          </div>
        </div>

        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          {actions}

          {settings ?? (
            <Button variant="ghost" size="icon" className="size-8 rounded-lg">
              <Settings2   className="size-4" />
            </Button>
          )}

          {collapsible && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "size-8 rounded-lg",
                collapsible && "cursor-pointer",
              )}
              onClick={toggle}
            >
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              >
                <IconChevronDown className="size-4" />
              </motion.div>
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: {
                duration: 0.25,
                ease: "easeInOut",
              },
              opacity: {
                duration: 0.15,
              },
            }}
            className="overflow-hidden"
          >
            <div className="border-t" />

            <motion.div
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className={cn("p-5", contentClassName)}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
