"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  IconEye,
  IconEyeOff,
  IconLock,
} from "@tabler/icons-react";

import AuthFormWrapper from "./auth-form-wrapper";
import { resetPassword } from "../actions/forgot-password";
import {
  ResetPasswordInput,
  resetPasswordSchema,
} from "../validations/auth";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export default function ResetPasswordForm({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: ResetPasswordInput) {
    const res = await resetPassword({
      token,
      email,
      newPassword: data.password,
    });

    if (res.error) {
      toast.error(res.error.message ?? "Something went wrong.");
      return;
    }

    toast.success(res.data?.message ?? "Password updated successfully.");
    router.push("/login");
  }

  return (
    <AuthFormWrapper authMode="reset-password">
      <div className="rounded-xl border bg-muted/30 px-4 py-3 text-center">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Resetting password for
        </p>

        <p className="mt-1 truncate text-sm font-medium">
          {email}
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
      >
        <FieldGroup className="space-y-1 gap-3">
          <Controller
            name="password"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel className="text-[11px] font-medium text-muted-foreground">
                  New Password
                </FieldLabel>

                <div className="relative">
                  <IconLock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel className="text-[11px] font-medium text-muted-foreground">
                  Confirm Password
                </FieldLabel>

                <div className="relative">
                  <IconLock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className="h-11 rounded-xl border bg-background pl-10 pr-10 shadow-none transition-all focus-visible:ring-2"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((v) => !v)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showConfirmPassword ? (
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
          {form.formState.isSubmitting && (
            <Spinner className="size-4" />
          )}
          Update Password
        </Button>
      </form>
    </AuthFormWrapper>
  );
}