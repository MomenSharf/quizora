'use server'

import { tryCatchAsync } from "@/lib/utils/try-catch";
import { authService } from "../services/auth.service";

export const sendResetPasswordLink = async (email: string) =>
  tryCatchAsync(async () => {
    const res = await authService.sendPasswordResetToken(email);

    return {
      message: "Password reset link sent successfully.",
      email: res.to,
    };
  });
  
export const resetPassword = async (data: {
  email: string;
  token: string;
  newPassword: string;
}) =>
  tryCatchAsync(async () => {
    const res = await authService.resetPassword(data);

    return {
      message: "Password reset successfully.",
      email: res.email,
    };
  });
