"use server";

import { tryCatchAsync } from "@/lib/utils/try-catch";
import { authService } from "../services/auth.service";
import { signupSchema } from "../validations/auth";

export const signup = async (data: unknown) =>
  tryCatchAsync(async () => {
    const parsed = signupSchema.parse(data);

    const email = await authService.signupUser(parsed);

    return {
      message: "Verification code sent to email.",
      email,
    };
  });