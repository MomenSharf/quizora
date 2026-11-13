"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconArrowUpRight,
  IconSparkles,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/config/app";

type ComingSoonProps = {
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
};

export function ComingSoon({
  title,
  description,
  backHref = "/",
  backLabel = "Back to home",
}: ComingSoonProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-7 flex size-16 items-center justify-center rounded-2xl border bg-muted/50">
          <IconSparkles className="size-7 text-primary" />
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          UNDER DEVELOPMENT
        </div>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          {description}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href={backHref}>
              <IconArrowLeft className="size-4" />
              {backLabel}
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/discover">
              Explore quizzes
              <IconArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Thanks for being part of {appConfig.name}.
        </p>
      </div>
    </div>
  );
}