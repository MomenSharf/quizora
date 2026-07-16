"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconAlertTriangle,
  IconRefresh,
  IconHome,
  IconBug,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/15 blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute left-0 top-1/2 h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="relative z-10 w-full max-w-xl rounded-3xl border border-border/60 bg-card/70 p-10 shadow-2xl backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 220,
          }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive"
        >
          <IconAlertTriangle size={42} stroke={1.8} />
        </motion.div>

        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Something went wrong
          </h1>

          <p className="text-muted-foreground">
            An unexpected error occurred while processing your request.
            You can try again or return to the homepage.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90 active:scale-[0.98]"
          >
            <IconRefresh size={18} />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 font-medium transition hover:bg-accent"
          >
            <IconHome size={18} />
            Go Home
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8">
            <button
              onClick={() => setShowDetails((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm font-medium transition hover:bg-muted"
            >
              <span className="flex items-center gap-2">
                <IconBug size={18} />
                Error Details
              </span>

              {showDetails ? (
                <IconChevronUp size={18} />
              ) : (
                <IconChevronDown size={18} />
              )}
            </button>

            <motion.div
              initial={false}
              animate={{
                height: showDetails ? "auto" : 0,
                opacity: showDetails ? 1 : 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="overflow-hidden"
            >
              <pre className="mt-3 overflow-auto rounded-xl border border-border bg-muted p-4 text-xs leading-relaxed text-muted-foreground">
                {error.message}

                {error.digest && (
                  <>
                    {"\n\n"}
                    Digest: {error.digest}
                  </>
                )}

                {error.stack && (
                  <>
                    {"\n\n"}
                    {error.stack}
                  </>
                )}
              </pre>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}