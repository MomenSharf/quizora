"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconUser,
} from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import AuthFormWrapper from "./auth-form-wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { signup } from "../actions/signup";
import {
  SignupInput,
  signupSchema,
} from "../validations/auth";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  
     const searchParams = useSearchParams();
    const defaultEmail = searchParams.get("email");

  const router = useRouter();
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: defaultEmail ?? "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const email = useWatch({
      control: form.control,
      name: "email",
    })

    const onSubmit = async (data: SignupInput) => {
    const res = await signup(data);

    if (res.error) {
      toast.error(res.error.message || "Something went wrong");
      return;
    }

    toast.success(res.data.message);
    router.push(`/verify?email=${data.email}`);
  };


  return (
    <AuthFormWrapper authMode="signup" email={email}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
      >
        <FieldGroup className="space-y-1 gap-3">
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel className="text-[11px] font-medium text-muted-foreground">
                  Full Name
                </FieldLabel>

                <div className="relative">
                  <IconUser className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    {...field}
                    autoFocus
                    placeholder="John Doe"
                    autoComplete="name"
                    className="h-11 rounded-xl border bg-background pl-10 shadow-none transition-all focus-visible:ring-2"
                  />
                </div>
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel className="text-[11px] font-medium text-muted-foreground">
                  Email
                </FieldLabel>

                <div className="relative">
                  <IconMail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    {...field}
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="h-11 rounded-xl border bg-background pl-10 shadow-none transition-all focus-visible:ring-2"
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
                <FieldLabel className="text-[11px] font-medium text-muted-foreground">
                  Password
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
                <FieldLabel className="mb-1.5 text-[11px] font-medium text-muted-foreground">
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
          {form.formState.isSubmitting && <Spinner className="size-4" />}
          Create Account
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