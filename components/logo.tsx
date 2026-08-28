import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { appConfig } from "@/lib/config/app";

type LogoProps = {
  href?: string;
  className?: string;
  containerClassName?: string;
  iconClassName?: string;
  textClassName?: string;
  iconOnly?: boolean;
  withChevron?: boolean;
};

export function Logo({
  href = "/",
  className,
  containerClassName,
  iconClassName,
  textClassName,
  iconOnly = false,
  withChevron = false,
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={iconOnly ? appConfig.name : undefined}
      className={cn(
        "group inline-flex items-center gap-2.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        "rounded-lg",
        className
      )}
    >
      <div
        className={cn(
          "relative flex size-10 shrink-0 items-center justify-center",
          "overflow-hidden rounded-lg",
          "bg-primary text-primary-foreground",
          "shadow-sm ring-1 ring-border/60",
          containerClassName
        )}
      >
        {/* Gradient */}
        <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-transparent" />

        {/* Shine */}
        <span className="pointer-events-none absolute inset-y-0 -left-8 w-5 rotate-12 bg-white/40 blur-md transition-all duration-700 group-hover:left-12" />

        {/* Logo */}
        <Icons.logo
          className={cn(
            "relative z-10 size-5 fill-current stroke-current transition-all duration-200",
            withChevron && "group-hover:-translate-x-5 group-hover:opacity-0",
            iconClassName
          )}
        />

        {/* Chevron */}
        {withChevron && (
          <IconChevronLeft
            className="absolute z-10 size-5 translate-x-5 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
          />
        )}
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
    </Link>
  );
}
