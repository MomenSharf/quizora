import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { appConfig } from "@/lib/config/app";

type LogoProps = {
  className?: string;
    containerClassName?: string;

  iconClassName?: string;
  textClassName?: string;
  iconOnly?: boolean;
};

export function Logo({
  className,
  containerClassName,
  iconClassName,
  textClassName,
  iconOnly = false,
}: LogoProps) {
  return (
    <div className={cn("group inline-flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "relative flex size-10 items-center justify-center overflow-hidden rounded-lg",
          "bg-primary text-primary-foreground",
          "shadow-sm ring-1 ring-border/60",
          containerClassName
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-transparent" />

        <div className="pointer-events-none absolute inset-y-0 -left-8 w-5 rotate-12 bg-white/40 blur-md transition-all duration-700 group-hover:left-12" />

        <Icons.logo
          className={cn(
            "relative z-10 size-5 fill-current stroke-current",
            iconClassName
          )}
        />
      </div>

      {!iconOnly && (
        <span
          className={cn(
            "text-xl font-semibold tracking-tight text-foreground",
            textClassName
          )}
        >
          {appConfig.name}
        </span>
      )}
    </div>
  );
}