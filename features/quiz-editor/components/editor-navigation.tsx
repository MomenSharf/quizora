"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { IconPlayerPlay } from "@tabler/icons-react";
import { EDITOR_PANELS } from "../constants/editor-panels";
import { useActivePanel, useEditorActions } from "../store";
import MobileHeaderSheet from "./editor-header/quiz-mobile-header-sheet";
import { SaveStatus } from "./editor-header/save-status";

const EditorNavigation = () => {
  const activePanel = useActivePanel();
  const { setActivePanel } = useEditorActions();
  return (
    <aside className="flex items-center md:items-start p-2">
      <div className="flex items-center md:hidden">
        <MobileHeaderSheet />
      </div>
      {/* <div className="flex mr-auto justify-center items-center md:flex-col md:justify-start  gap-2"> */}
      <div className="flex max-md:mr-auto md:flex-col md:justify-start gap-1 sm:gap-2">
        {EDITOR_PANELS.map((item) => {
          const isActive = item.value === activePanel;
          return (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "size-8 min-[450px]:size-10 rounded-xl border border-transparent transition-all duration-200 :",
                    "hover:bg-accent hover:text-accent-foreground",
                    "hover:border-border/60 hover:shadow-sm",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isActive &&
                      "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 hover:bg-primary dark:hover:bg-primary",
                  )}
                  onClick={() => setActivePanel(item.value)}
                >
                  <item.icon
                    className={cn(
                      "size-4 min-[450px]:size-5 transition-transform duration-200",
                      "text-muted-foreground",
                      "group-hover:scale-105",
                      isActive && "text-primary-foreground",
                    )}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{item.title}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
      <div className="flex items-center gap-2 md:hidden">
        <SaveStatus />

        <Button
          size="icon"
          className="size-8 min-[400px]:size-10 group relative overflow-hidden cursor-pointer rounded-xl border border-primary/20 bg-linear-to-r from-primary to-primary/90 font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <div className="relative flex items-center justify-center gap-3">
            <IconPlayerPlay className="size-4 min-[400px]:size-5 transition-transform duration-200 group-hover:rotate-120" />
          </div>
        </Button>
      </div>
    </aside>
  );
};

export default EditorNavigation;
