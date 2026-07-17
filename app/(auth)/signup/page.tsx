import { SignupForm } from "@/features/auth/components/signup-form";
import { auth } from "@/features/auth/lib/auth-options";
import { redirect } from "next/navigation";

export default async function SignupPage() {
const session = await auth();

  if (session) {
    return redirect("/");
  }
  return <SignupForm />;
}
