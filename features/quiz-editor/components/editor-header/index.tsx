"use client";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Logo } from "@/components/logo";

import { EditorActions } from "./ediotor-actions";
import { EditableTitle } from "./editable-title";
import { HistoryControls } from "./history-controls";
import { SaveStatus } from "./save-status";
import { IssuesTrigger } from "../issues/issues-trigger";

export default function EditorHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 px-1 py-2 backdrop-blur-md">
      <div className="flex h-10 items-center gap-2">
        {/* Navigation */}
        <Logo
          withChevron
          iconOnly
          containerClassName="size-7 md:size-10"
          iconClassName="size-4 md:size-5"
        />

        {/* Quiz Info */}
        <div className="min-w-0 flex-1">
          <EditableTitle />

          {/* Desktop Save Status */}
          <div className="hidden md:block">
            <SaveStatus />
          </div>
        </div>

        {/* Mobile Save Status */}
        <div className="flex shrink-0 items-center md:hidden">
          <SaveStatus />
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1">
          {/* History */}
          <HistoryControls />

          {/* Theme */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Settings + Preview */}
          <EditorActions />
        </div>
      </div>
    </header>
  );
}