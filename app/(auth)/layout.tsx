import Image from "next/image";
import { redirect } from "next/navigation";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { auth } from "@/features/auth/lib/auth-options";
import { AuthContent } from "@/features/auth/components/auth-content";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="grid h-dvh overflow-hidden md:grid-cols-2">
      {/* Form side */}
      <div className="flex min-h-0 flex-col p-3">
        <header className="mt-5 flex shrink-0 items-center justify-between">
          <Logo />
          <ThemeToggle />
        </header>

        {/* Only this area scrolls */}
        <div className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-color:var(--border)_transparent] scrollbar-thin">
          <div className="flex min-h-full items-center justify-center p-6">
            <AuthContent>{children}</AuthContent>
          </div>
        </div>
      </div>

      {/* Fixed image side */}
      <div className="relative hidden min-h-0 md:block">
        <Image
          src="/assets/images/login-image.jpg"
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
      </div>
    </main>
  );
}
