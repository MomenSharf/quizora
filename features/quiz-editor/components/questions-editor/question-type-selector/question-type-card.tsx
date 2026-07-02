import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { QuestionTypeUI } from "@/features/quiz-editor/types/question-types";
import { cn } from "@/lib/utils";
import { IconHelp } from "@tabler/icons-react";
import { ArrowRight } from "lucide-react";
import PreviewWrapper from "./preview-wrapper";
import { QuestionTypeIcon } from "./question-type-icon";

interface QuestionTypeCardProps {
  type: QuestionTypeUI;
  onSelect?: (typeId: string) => void;
  
}

const QuestionTypeCard = ({
  type,
  onSelect,
 
}: QuestionTypeCardProps) => {
  return (
    <div
    tabIndex={0}
  role="button"
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      // handleClick()
    }
  }}
      onClick={() => onSelect?.(type.id)}
      className={cn(
        "group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl border bg-card p-3 text-left transition-all duration-300",
        "hover:-translate-y-1 hover:scale-[1.015]",
        "hover:border-primary/40 hover:bg-accent/30 hover:shadow-xl",
        "active:scale-[0.985]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
    >
      <div className="absolute top-4 right-4 flex items-center gap-1">
        {(type.badge || type.isNew || type.isPopular) && (
          <Badge
            variant="secondary"
            className="hidden sm:block font-semibold uppercase tracking-wide text-xs"
          >
            {type.badge ?? (type.isNew ? "New" : "Popular")}
          </Badge>
        )}

        <Dialog>
          <DialogTrigger>
            <IconHelp className="size-4 'hover:text-primary" />
          </DialogTrigger>

          <DialogContent onClick={(e) => e.stopPropagation()}>
            <PreviewWrapper type={type} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-1">
        <QuestionTypeIcon
          icon={type.icon}
          color={type.color}
          className="max-sm:size-8 max-sm:rounded-md"
          iconClassName="size-6 max-sm:size-4"
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
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-primary/10" />
    </div>
  );
};

export default QuestionTypeCard;
