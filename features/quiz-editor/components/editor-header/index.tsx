import { ThemeToggle } from "@/components/layout/theme-toggle";

import { Logo } from "@/components/logo";
import { EditorActions } from "./ediotor-actions";
import { EditableTitle } from "./editable-title";
import { SaveStatus } from "./save-status";

export default function EditorHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 px-1 py-2 backdrop-blur-md">
      <div className="flex h-10 items-center gap-2">
        {/* Navigation */}
        <Logo withChevron/>

        {/* Quiz Info */}
        <div className="min-w-0 flex-1">
          <EditableTitle />

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
