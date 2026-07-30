import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";

interface ConfigWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  separator?: boolean;
}

export function ConfigWrapper({
  title,
  description,
  children,
  className,
  separator = true,
}: ConfigWrapperProps) {
  return (
    <>
      <section className={cn("space-y-5", className)}>
        <div className="space-y-1">
          <h2 className="text-sm font-semibold tracking-tight">{title}</h2>

          {description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-4">{children}</div>
      </section>

      {separator && <Separator className="my-8 opacity-60 last:hidden" />}
    </>
  );
}