import { redirect } from "next/navigation";

import VerifyCode from "@/features/auth/components/verify-code";
import { validateEmailVerification } from "@/features/auth/actions/verification-email";
import { auth } from "@/features/auth/lib/auth-options";

type PageProps = {
  searchParams: Promise<{
    email?: string | string[];
  }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: PageProps) {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  const { email } = await searchParams;

  if (!email || Array.isArray(email)) {
    redirect("/login");
  }

  const { data, error } = await validateEmailVerification(email);

  if (error) {
    redirect(
      `/login?errorMessage=${encodeURIComponent(
        error.message ?? "Something went wrong. Please try again."
      )}`
    );
  }

  if (data.status === "already_verified") {
    redirect(
      `/login?successMessage=${encodeURIComponent(
        "Your email has already been verified. You can now sign in."
      )}`
    );
  }

  return (
    <VerifyCode
      email={email}
      initialCooldown={data.secondsLeft ?? 0}
    />
  );
}