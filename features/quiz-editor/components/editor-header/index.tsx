import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { IconChevronLeft } from "@tabler/icons-react";

import { EditableTitle } from "./editable-title";
import { EditorActions } from "./ediotor-actions";
import { SaveStatus } from "./save-status";
import MobileHeaderSheet from "./quiz-mobile-header-sheet";

export default function EditorHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 px-1 py-2 backdrop-blur-md">
      <div className="flex h-10 items-center gap-2">
        {/* Navigation */}
        <div className="shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="group hidden size-10 rounded-xl md:flex"
          >
            <span className="relative flex size-5 items-center justify-center">
              <Icons.logo className="absolute size-5 transition-all duration-200 group-hover:-translate-x-5 group-hover:opacity-0" />
              <IconChevronLeft className="absolute size-5 translate-x-5 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
          </Button>

          <div className="md:hidden">
            <MobileHeaderSheet />
          </div>
        </div>

        {/* Quiz Info */}
        <div className="min-w-0 flex-1">
          <EditableTitle title="Quiz Title" />

          <div className="hidden md:block">
            <SaveStatus />
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <div className="md:hidden">
            <SaveStatus />
          </div>

          <EditorActions />
        </div>
      </div>
    </header>
  );
}