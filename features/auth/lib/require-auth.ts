import { auth } from "@/features/auth/lib/auth-options";
import { AppErrors } from "@/lib/errors/app-errors";

export async function requireAuth() {
  const session = await auth();

  if (!session?.user?.id) {
    throw AppErrors.unauthorized("You must be logged in");
  }

  return session;
}