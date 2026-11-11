
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export type  CollectionTab = {
  value: string;
  label: string;
  count?: number;
};

type CollectionPageTabsProps = {
  tabs: CollectionTab[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
};

export function CollectionPageTabs({
  tabs,
  value,
  onValueChange,
  className,
}: CollectionPageTabsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 overflow-x-auto",
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = value === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onValueChange(tab.value)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative isolate inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors duration-200",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="library-active-tab"
                className="absolute inset-0 -z-10 rounded-xl bg-primary/10 ring-1 ring-primary/15"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 32,
                }}
              />
            )}

            <span>{tab.label}</span>

            {tab.count !== undefined && (
              <span
                className={cn(
                  "text-xs font-semibold tabular-nums transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground/70",
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
