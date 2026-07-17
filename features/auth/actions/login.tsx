"use server";

import { tryCatchAsync } from "@/lib/utils/try-catch";
import { authService } from "../services/auth.service";
import { loginSchema } from "../validations/auth";
import { signIn } from "../lib/auth-options";

export const login = async (data: unknown) =>
  tryCatchAsync(async () => {
    const parsed = loginSchema.parse(data);

    await authService.validateLogin(parsed.email, parsed.password);

    await signIn("credentials", {
      email: parsed.email,
      password: parsed.password,
      redirect: false,
    });

    return {
      message: "Logged in successfully.",
    };
  });