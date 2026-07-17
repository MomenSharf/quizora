import { LoginForm } from "@/features/auth/components/login-form";
import { auth } from "@/features/auth/lib/auth-options";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    return redirect("/");
  }
  return <LoginForm />;
}
