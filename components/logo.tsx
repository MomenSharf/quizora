import { cn } from "@/lib/utils";
import { Icons } from "./icons";

type LogoProps = {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
};

export function Logo({ className, iconClassName, textClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="p-1 bg-primary rounded">
        <Icons.logo
          className={cn("fill-white stroke-white size-8", iconClassName)}
        />
      </div>
      <span className={cn("text-xl font-medium", textClassName)}>Quizora</span>
    </div>
  );
}
