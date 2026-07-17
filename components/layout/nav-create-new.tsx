"use client";

import { IconLoader2, IconPlus } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useTransition } from "react";

import { createNewQuiz } from "@/features/quiz-editor/actions/create-new-quiz";
import { createDefaultQuiz } from "@/features/quiz-editor/create-defaults/quiz/create-default-quiz";
import { cn } from "@/lib/utils";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NavCreateNew() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreate = () => {
    startTransition(async () => {
      try {
        const result = await createNewQuiz();

        toast.success("Quiz created successfully.");

        router.push(`/quiz/${result.quizId}/editor`);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to create quiz.",
        );
      }
    });
  };

  return (
    <SidebarGroup className="p-0">
      <SidebarMenu>
        <SidebarMenuItem>
          <motion.div
            whileHover={!isPending ? "hover" : undefined}
            whileTap={!isPending ? "tap" : undefined}
            className="transform-gpu"
          >
            <SidebarMenuButton
              size="lg"
              disabled={isPending}
              onClick={handleCreate}
              className={cn(
                "group relative h-12 w-full overflow-hidden rounded-md border border-border/60",
                "cursor-pointer bg-linear-to-r from-primary to-primary/90 text-primary-foreground",
                "transition-colors duration-200",
                "hover:border-primary/40 hover:text-primary-foreground active:text-primary-foreground",
                "disabled:pointer-events-none disabled:opacity-70",
              )}
            >
              <motion.div
                variants={{
                  hover: {
                    rotate: 90,
                    scale: 1.1,
                    y: -1,
                  },
                  tap: {
                    scale: 0.95,
                  },
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/15 will-change-transform"
              >
                {isPending ? (
                  <IconLoader2
                    size={20}
                    stroke={2.5}
                    className="animate-spin"
                  />
                ) : (
                  <IconPlus size={20} stroke={2.5} />
                )}
              </motion.div>

              <div className="flex flex-1 flex-col leading-none">
                <span className="font-semibold">
                  {isPending ? "Creating..." : "Create"}
                </span>
                <span className="text-xs text-primary-foreground/70">
                  {isPending ? "Please wait" : "New quiz"}
                </span>
              </div>

              {!isPending && (
                <motion.div
                  variants={{
                    hover: {
                      x: "120%",
                    },
                  }}
                  initial={{
                    x: "-120%",
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent will-change-transform"
                />
              )}
            </SidebarMenuButton>
          </motion.div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
