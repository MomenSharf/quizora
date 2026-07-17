import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";

export type AuthMode =
  | "login"
  | "signup"
  | "forgot-password"
  | "reset-password"
  | "verify-email";

const items = [
  {
    authMode: "login" as const,
    label: "Log In",
    href: "/login",
  },
  {
    authMode: "signup" as const,
    label: "Create Account",
    href: "/signup",
  },
];

const content: Record<
  AuthMode,
  {
    title: string;
    description: string;
    showTabs: boolean;
  }
> = {
  login: {
    title: "Welcome back",
    description: "Sign in to continue building and playing quizzes.",
    showTabs: true,
  },
  signup: {
    title: "Create your account",
    description: "Start creating beautiful quizzes in just a few minutes.",
    showTabs: true,
  },
  "forgot-password": {
    title: "Forgot your password?",
    description:
      "Enter your email and we'll send you a secure reset link.",
    showTabs: false,
  },
  "reset-password": {
    title: "Create a new password",
    description:
      "Choose a strong password to secure your account.",
    showTabs: false,
  },
  "verify-email": {
    title: "Verify your email",
    description:
      "Enter the 6-digit verification code we sent to your email.",
    showTabs: false,
  },
};

export default function AuthFormWrapper({
  children,
  authMode,
  email,
}: {
  children: ReactNode;
  authMode: AuthMode;
  email?: string;
}) {
   const searchParams = useSearchParams();
  const errorMessage = searchParams.get("errorMessage");

  useEffect(() => {
    if (!errorMessage) return;

    const t = setTimeout(() => {
      toast.error(errorMessage);
    }, 50);

    return () => clearTimeout(t);
  }, [errorMessage]);

  const page = content[authMode];

  return (
    <div className="mx-auto w-full max-w-md space-y-5">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          {page.title}
        </h1>

        <p className="mx-auto max-w-sm text-sm leading-6 text-muted-foreground">
          {page.description}
        </p>
      </header>

      {page.showTabs && (
        <div className="rounded-2xl border bg-muted/30 p-1">
          <div className="grid grid-cols-2 gap-1">
            {items.map((item) => {
              const active = item.authMode === authMode;

              return (
                <Link
                  key={item.href}
                  href={`${item.href}${email ? `?email=${encodeURIComponent(email)}` : ""}`}
                  className={[
                    "rounded-xl px-3 py-2.5 text-center text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-background text-foreground dark:bg-white dark:text-black shadow-sm"
                      : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {children}
    </div>
  );
}