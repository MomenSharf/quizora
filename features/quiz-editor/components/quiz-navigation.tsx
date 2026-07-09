'use client'

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { useNavigation } from "../store";
import { EDITOR_PANELS } from "../constants/editor-panels";


const QuizNavigation = () => {
  const {activePanel} = useNavigation()
  return (
    <aside className="min-w-16.25 flex justify-center md:flex-col md:justify-start sm:items-center gap-2 p-2">
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
                    "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 hover:bg-primary",
                )}
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
    </aside>
  );
};

export default QuizNavigation;
