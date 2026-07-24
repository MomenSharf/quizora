import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconPlayerPlay } from "@tabler/icons-react";
import { EditableTitle } from "./editable-title";
import QuizTabs from "./quiz-tabs";
import { SaveStatus } from "./save-status";

export default function EditorHeader() {
  return (
    <header className="hidden sticky top-0 z-40 md:flex h-16 items-center justify-between bg-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="group hidden size-10 rounded-xl sm:flex"
        >
          <div className="relative flex items-center justify-center">
            <Icons.logo className="absolute size-5 transition-all duration-200 group-hover:-translate-x-5 group-hover:opacity-0" />
            <IconChevronLeft className="absolute size-5 translate-x-5 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
          </div>
        </Button>

        <Icons.logo className="size-5 sm:hidden" />

        <div className="min-w-0">
          <EditableTitle title="Quiz Title" />

          <SaveStatus />
        </div>
      </div>

      <div className="hidden md:block">
        <QuizTabs />
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button className="group relative overflow-hidden cursor-pointer rounded-xl border border-primary/20 bg-linear-to-r from-primary to-primary/90 px-4 py-5 font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]">
          <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

          <div className="relative flex items-center justify-center gap-3">
            <div className="flex size-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:rotate-120">
              <IconPlayerPlay className="size-4" />
            </div>

            <span>Preview</span>
          </div>
        </Button>
      </div>
    </header>
  );
}
