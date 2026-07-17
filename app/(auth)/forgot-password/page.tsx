import ForgotPassword from "@/features/auth/components/forgot-password";
import { auth } from "@/features/auth/lib/auth-options";
import { redirect } from "next/navigation";

export default async function ForgotPasswordPage() {
  const session = await auth();

  if (session) {
    return redirect("/");
  }
  
  return <ForgotPassword />;
}
