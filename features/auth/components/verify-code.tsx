"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import AuthFormWrapper from "./auth-form-wrapper";

import { VerifyCodeInput, VerifyCodeSchema } from "../validations/auth";

import {
  sendVerificationCode,
  verifyVerificationCode,
} from "../actions/verification-email";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function VerifyCode({
  email,
  initialCooldown = 0,
}: {
  email?: string;
  initialCooldown?: number;
}) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [cooldown, setCooldown] = useState(initialCooldown);

  const form = useForm<VerifyCodeInput>({
    resolver: zodResolver(VerifyCodeSchema),
    defaultValues: {
      code: "",
    },
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (data: VerifyCodeInput) => {
      if (!email) {
        toast.error("Email is required.");
        return;
      }

      const res = await verifyVerificationCode(email, data.code);

      if (res.error) {
        toast.error(res.error.message ?? "Invalid verification code.");
        return;
      }

      toast.success(res.data.message);
      router.push(`/login?email=${encodeURIComponent(email)}`);
    },
    [email, router],
  );

  function handleResend() {
    if (!email) {
      toast.error("Email is required.");
      return;
    }

    if (cooldown > 0 || isPending) return;

    startTransition(async () => {
      const res = await sendVerificationCode(email);

      if (res.error) {
        toast.error(res.error.message ?? "Something went wrong.");
        return;
      }

      toast.success(res.data.message);
      setCooldown(60);
    });
  }

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  return (
    <AuthFormWrapper authMode="verify-email">
      <div className="rounded-xl border bg-muted/30 px-4 py-3 text-center">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Verification code sent to
        </p>

        <p className="mt-1 truncate text-sm font-medium">{email}</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            name="code"
            control={form.control}

            render={({ field }) => (
              <Field className="items-center">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className="size-11 rounded-l-xl"
                      />
                      <InputOTPSlot index={1} className="size-11" />
                      <InputOTPSlot index={2} className="size-11" />
                      <InputOTPSlot index={3} className="size-11" />
                      <InputOTPSlot index={4} className="size-11" />
                      <InputOTPSlot
                        index={5}
                        className="size-11 rounded-r-xl"
                      />
                    </InputOTPGroup>
                  </InputOTP>
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
          Verify Email
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-11 w-full rounded-xl"
          onClick={handleResend}
          disabled={cooldown > 0 || isPending}
        >
          {isPending ? (
            <Spinner className="size-4" />
          ) : cooldown > 0 ? (
            `Resend in ${cooldown}s`
          ) : (
            "Resend Code"
          )}
        </Button>

        <Button asChild variant="ghost" className="h-10 w-full rounded-xl">
          <Link href="/login">Back to Login</Link>
        </Button>
      </form>
    </AuthFormWrapper>
  );
}
