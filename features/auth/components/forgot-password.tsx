"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { IconMail } from "@tabler/icons-react";

import AuthFormWrapper from "./auth-form-wrapper";
import { sendResetPasswordLink } from "../actions/forgot-password";
import { ForgotPasswordInput, forgotPasswordSchema } from "../validations/auth";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [needsVerification, setNeedsVerification] = useState(false);

  const searchParams = useSearchParams();
  const defaultEmail = searchParams.get("email");

  const router = useRouter();

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: defaultEmail ?? "",
    },
    mode: "onChange",
  });

   const email = useWatch({
      control: form.control,
      name: "email",
    })

  async function onSubmit(data: ForgotPasswordInput) {
    const res = await sendResetPasswordLink(data.email);

    if (res.error) {
      if (res.error.code === "UNAUTHORIZED") {
        setNeedsVerification(true);
      }
      toast.error(res.error.message ?? "Something went wrong");
      return;
    }

    toast.success(res.data.message);
    router.push("/login");
  }

  return (
    <AuthFormWrapper authMode="forgot-password" email={email}>
      {needsVerification && (
        <div className="rounded-xl border p-4 text-sm">
          <p className="text-muted-foreground">
            Your email isn&apos;t verified.{" "}
            <Link
              href={`/verify?email=${encodeURIComponent(email)}`}
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              Verify your email
            </Link>
          </p>
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
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
                    className="h-11 rounded-xl border bg-background pl-10 shadow-none transition-all focus-visible:ring-2"
                  />
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
          Send Reset Link
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="h-11 w-full rounded-xl text-sm"
          onClick={() => router.push("/login")}
        >
          Back to Login
        </Button>
      </form>
    </AuthFormWrapper>
  );
}
