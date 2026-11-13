
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
    <main className="flex min-h-dvh flex-col">
      {/* Full-width header */}
      <header className="flex h-20 shrink-0 items-center justify-between px-6 sm:px-10">
        <Logo />
        <ThemeToggle />
      </header>

      {/* Main content */}
      <div className="grid flex-1 items-center md:grid-cols-2">
        {/* Form */}
        <section className="flex min-w-0 items-center justify-center px-6 py-10 sm:px-10">
          <AuthContent>{children}</AuthContent>
        </section>

        {/* Illustration */}
        <aside className="relative hidden h-full min-h-100 items-center justify-center p-8 md:flex lg:p-12">
          <div className="relative aspect-4/3 w-full max-w-2xl">
            <Image
              src="/assets/images/login-image.png"
              alt=""
              fill
              priority
              sizes="50vw"
              className="object-contain"
            />
          </div>
        </aside>
      </div>
    </main>
  );
}
