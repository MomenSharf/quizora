"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconSettings2 } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

import QuizCover from "./quiz-cover";
import BasicInformation from "./basic-information";
import QuizTags from "./quiz-tags";
import QuizVisibility from "./quiz-vissibility";
import { useEditorActions } from "../../store";

export default function SettingsLayout() {
  const {setActivePanel} = useEditorActions();

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-5xl p-4 md:p-6 lg:p-8">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-5"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActivePanel("questions")}
            className="group -ml-2 h-9 gap-2 rounded-lg px-2.5 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
          >
            <IconArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Back to questions</span>
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-7"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border bg-muted/50">
              <IconSettings2 className="size-4" />
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-semibold tracking-tight md:text-xl">
                Quiz settings
              </h1>

              <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
                Customize your quiz information, language, category, and
                visibility.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
          {/* Cover — first on mobile */}
          <QuizCover />

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="order-last space-y-5 lg:order-first"
          >
            <BasicInformation />

            <QuizTags />

            <QuizVisibility />
          </motion.div>
        </div>
      </div>
    </div>
  );
}