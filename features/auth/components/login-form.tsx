"use client";

import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { IconEye, IconEyeOff, IconLock, IconMail } from "@tabler/icons-react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import AuthFormWrapper from "./auth-form-wrapper";
import { LoginInput, loginSchema } from "../validations/auth";
import Link from "next/link";
import { toast } from "sonner";
import { AUTH_ERRORS } from "@/lib/errors/auth-errors";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "../actions/login";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

   const searchParams = useSearchParams();
  const defaultEmail = searchParams.get("email");


  const router = useRouter();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: defaultEmail ?? "",
      password: "",
    },
    mode: "onChange",
  });

  const email = useWatch({
    control: form.control,
    name: "email",
  })

  async function onSubmit(data: LoginInput) {
    const res = await login(data);

    if (res.error) {
      if (res.error.code === "FORBIDDEN") {
        toast.info(res.error.message);
        router.push(`/verify?email=${encodeURIComponent(data.email)}`);
        return;
      }

      toast.error(res.error.message);
      return;
    }

    toast.success(res.data.message);
    router.push("/");
  }


  return (
    <AuthFormWrapper authMode="login" email={email}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FieldGroup className="space-y-1 gap-3">
          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel
                  htmlFor="email"
                  className="text-[11px] font-medium text-muted-foreground"
                >
                  Email
                </FieldLabel>

                <div className="relative">
                  <IconMail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    {...field}
                    id="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    placeholder="you@example.com"
                    className="h-11 rounded-xl border bg-background pl-10 pr-3 shadow-none transition-all focus-visible:ring-2"
                  />
                </div>
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field }) => (
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor="password"
                    className="text-[11px] font-medium text-muted-foreground"
                  >
                    Password
                  </FieldLabel>

                  <Link
                    href={`/forgot-password${email ? `?email=${encodeURIComponent(email)}` : ""}`}
                    className="text-[11px] font-medium text-primary hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>

                <div className="relative">
                  <IconLock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    {...field}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="h-11 rounded-xl border bg-background pl-10 pr-10 shadow-none transition-all focus-visible:ring-2"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <IconEyeOff className="size-4" />
                    ) : (
                      <IconEye className="size-4" />
                    )}
                  </button>
                </div>
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          className="h-11 w-full rounded-xl"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && <Spinner className="size-4" />}
          Sign In
        </Button>

        <div className="relative py-1">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            Or
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-11 w-full rounded-xl"
          disabled={form.formState.isSubmitting}
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Icons.google className="mr-2 size-4" />
          Continue with Google
        </Button>
      </form>
    </AuthFormWrapper>
  );
}
