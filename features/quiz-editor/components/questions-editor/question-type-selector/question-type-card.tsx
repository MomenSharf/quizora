import { QuestionTypeUI } from "@/features/quiz-editor/types/question-types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { QuestionTypeIcon } from "./question-type-icon";
import { IconHelp } from "@tabler/icons-react";

interface QuestionTypeCardProps {
  type: QuestionTypeUI;
  onSelect?: (typeId: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionTypeCard = ({ type, onSelect }: QuestionTypeCardProps) => {
  
  return (
    <Card
      onClick={() => onSelect?.(type.id)}
      className={cn(
        "group relative flex h-full p-3 cursor-pointer flex-col overflow-hidden rounded-3xl border bg-card transition-all duration-300",
        "hover:-translate-y-1 hover:scale-[1.015]",
        "hover:border-primary/40 hover:bg-accent/30 hover:shadow-xl",
        "active:scale-[0.985]",
      )}
    >
      {(type.badge || type.isNew || type.isPopular) && (
        <Badge
          variant="secondary"
          className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
        >
          {type.badge ?? (type.isNew ? "New" : "Popular")}
        </Badge>
      )}
      {/* {(type.badge || type.isNew || type.isPopular) && (
        <Badge
          variant="outline"
          
          className="absolute right-4 top-4 rounded-full size-8"
        >
          <IconHelp  />
        </Badge>
      )} */}




      <CardContent className="flex flex-1 flex-col gap-2 p-1">
        <QuestionTypeIcon
          icon={type.icon}
          color={type.color}
          className="max-sm:size-8 max-sm:rounded-md"
          iconClassName="max-sm:size-4 size-6"
        />

        <div className="space-y-1">
          <h3 className="text-base font-semibold transition-colors group-hover:text-primary">
            {type.label}
          </h3>

          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {type.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
            Create
          </span>

          <ArrowRight className="size-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100" />
        </div>
      </CardContent>

      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-primary/10" />
    </Card>
  );
};

export default QuestionTypeCard;
