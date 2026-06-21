import { cn } from "@/lib/utils";
import { Icons } from "./icons";

type LogoProps = {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  iconOnly?: boolean;
};

export function Logo({
  className,
  iconClassName,
  textClassName,
  iconOnly = false,
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="p-1 bg-primary rounded">
        <Icons.logo
          className={cn("fill-white stroke-white size-8", iconClassName)}
        />
      </div>

      {!iconOnly && (
        <span className={cn("text-xl font-medium", textClassName)}>
          QUIZORA
        </span>
      )}
    </div>
  );
}