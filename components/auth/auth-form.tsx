"use client";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { EmailSchema, emailSchema } from "@/lib/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCheck, IconMail } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";
import { AuthMode } from "./auth-form-wrapper";

export function AuthForm({ authMode }: { authMode: AuthMode }) {
  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: EmailSchema) {
    try {
      await signIn("resend", {
        callbackUrl: "/",
        email: data.email,
      });
      console.log("fds");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field }) => (
            <Field
              className="p-0.5 rounded-lg bg-muted"
            >
              <div className="flex gap-2 sm:gap-3 items-center px-4 py-2 bg-white rounded-lg">
                <IconMail size={32} />
                <Separator orientation="vertical" />

                <div className="flex-1 flex flex-col gap-1">
                  <FieldLabel
                    htmlFor="email"
                    className="text-muted-foreground text-xs"
                  >
                    Email Address
                  </FieldLabel>
                  
                  <Input
                    {...field}
                    id="email"
                    placeholder={
                      authMode === "login"
                        ? "Welcome back! Enter your email"
                        : "Let's get started! Enter your email"
                    }
                    autoComplete="off"
                    autoFocus
                    className="h-12 sm:text-lg! bg-transparent border-0 border-b rounded-none placeholder:text-muted-foreground/70 transition-all focus-visible:ring-0 focus-visible:border-primary shadow-none"
                  />
                </div>
                <div className="flex justify-center items-center">
                  <div className="p-1 flex items-center justify-center rounded-full bg-success text-success-foreground">
                    {true ? (
                      <Spinner className="size-6" />
                    ) : (
                      <IconCheck size={18} />
                    )}
                  </div>
                </div>
              </div>
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        size="lg"
        disabled={!form.formState.isValid || form.formState.isSubmitting}
      >
        {form.formState.isSubmitting && <Spinner />}
        Continue
      </Button>
      <div className="relative text-center text-muted-foreground">
        <Separator className="absolute top-1/2 -translate-y-1/2 left-0 right-0 -z-1" />
        <span className="text-sm px-5 bg-background">Or Continue With</span>
      </div>
      <Button
        variant="outline"
        size="lg"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        disabled={form.formState.isSubmitting}
      >
        <Icons.google className="size-6" /> Continue with Google
      </Button>
    </form>
  );
}
