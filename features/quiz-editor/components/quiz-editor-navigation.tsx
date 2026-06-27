import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  IconChartBar,
  IconGitBranch,
  IconHelpCircle,
  IconPalette,
  IconPhoto,
  IconSettings,
} from "@tabler/icons-react";

const items = [
  {
    title: "Cover",
    url: "/cover",
    icon: IconPhoto,
  },
  {
    title: "Questions",
    url: "/questions",
    icon: IconHelpCircle,
  },
  {
    title: "Branching Logic",
    url: "/branching-logic",
    icon: IconGitBranch,
  },
  {
    title: "Results",
    url: "/results",
    icon: IconChartBar,
  },
  {
    title: "Design",
    url: "/design",
    icon: IconPalette,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: IconSettings,
  },
];
const QuizEditorNavigation = () => {
  return (
    <aside className="flex sm:flex-col justify-start gap-2 p-2 border sm:border-r">
      {items.map((item) => {
        const isActive = item.title === 'Cover'
        return (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`flex flex-col justify-center items-center gap-1 rounded-lg p-1 hover:bg-muted size-10 sm:size-10 ${isActive ? 'bg-primary' : ''}`}
              >
                <item.icon className={`text-muted-foreground size-4 sm:size-5 ${isActive ? 'text-primary-foreground' : ''}`} />
               
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>

             {item.title}
              </p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </aside>
  );
};

export default QuizEditorNavigation;
