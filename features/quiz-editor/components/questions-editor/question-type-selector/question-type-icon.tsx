import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  color: string;
  className?: string;
  iconClassName?: string;
};

export function QuestionTypeIcon({ icon: Icon, color, className, iconClassName }: Props) {
  const { resolvedTheme } = useTheme();

  const bg =
    resolvedTheme === "dark"
      ? `${color}33`
      : `${color}18`;

  return (
    <div
      className={cn(
        "flex size-12 items-center justify-center rounded-2xl transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110",
        className
      )}
      style={{
        color,
        backgroundColor: bg,
      }}
    >
      <Icon className={cn("size-4", iconClassName)} />
    </div>
  );
}