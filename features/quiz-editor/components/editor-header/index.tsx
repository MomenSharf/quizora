import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconPlayerPlay } from "@tabler/icons-react";
import { Icons } from "@/components/icons";
import { EditableTitle } from "./editable-title";
import QuizTabs from "./quiz-tabs";
import MobileHeaderSheet from "./quiz-mobile-header-sheet";

export default function EditorHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-background/80 px-4 backdrop-blur-xl">
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

          <div className="mt-0.5 flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-emerald-500" />
            <span className="text-xxs text-muted-foreground">
              All changes saved
            </span>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <QuizTabs />
      </div>

      <div className="flex items-center gap-2">
        {/* Mobile Menu */}
        <MobileHeaderSheet />

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />

          <Button className="rounded-xl px-5">
            <IconPlayerPlay className="size-4" />
            Preview
          </Button>
        </div>

        {/* Mobile Preview */}
        <Button variant="outline" size="icon" className="rounded-xl md:hidden">
          <IconPlayerPlay className="size-4" />
        </Button>
      </div>
    </header>
  );
}
