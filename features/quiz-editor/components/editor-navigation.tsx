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
import { useEditorStore } from "../store";
import MobileHeaderSheet from "./editor-header/quiz-mobile-header-sheet";

const EditorNavigation = () => {
  const {
    setActivePanel,
    navigation: { activePanel },
  } = useEditorStore();
  return (
    <aside className="flex justify-between px-2 md:p-0 md:py-2">
      <div className="min-h-16.25 min-w-16.25 flex justify-center items-center md:flex-col md:justify-start  gap-2">
        {EDITOR_PANELS.map((item) => {
          const isActive = item.value === activePanel;
          return (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "size-10 rounded-xl border border-transparent transition-all duration-200 :",
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
                      "size-5 transition-transform duration-200",
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
      <div className="flex items-center gap-2">
        <MobileHeaderSheet />

        <Button variant="outline" size="icon" className="rounded-xl md:hidden">
          <IconPlayerPlay className="size-4" />
        </Button>
      </div>
    </aside>
  );
};

export default EditorNavigation;
