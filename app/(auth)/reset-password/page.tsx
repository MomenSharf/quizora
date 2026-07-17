import { redirect } from "next/navigation";

import ResetPasswordForm from "@/features/auth/components/reset-password";
import { authService } from "@/features/auth/services/auth.service";
import { tryCatchAsync } from "@/lib/utils/try-catch";
import { auth } from "@/features/auth/lib/auth-options";

type PageProps = {
  searchParams: Promise<{
    token?: string | string[];
    email?: string | string[];
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: PageProps) {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  const { token, email } = await searchParams;

  const invalidParams =
    !token ||
    !email ||
    Array.isArray(token) ||
    Array.isArray(email);

  if (invalidParams) {
    redirect(
      `/login?errorMessage=${encodeURIComponent(
        "Invalid or expired reset link"
      )}`
    );
  }

  const validation = await tryCatchAsync(() =>
    authService.validateResetLinkRequest(email, token)
  );

  if (validation.error) {
    redirect(
      `/forgot-password?errorMessage=${encodeURIComponent(
        validation.error.message
      )}`
    );
  }

  return <ResetPasswordForm token={token} email={email} />;
}