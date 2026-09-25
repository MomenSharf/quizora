import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Logo } from "@/components/logo";
import { auth } from "@/features/auth/lib/auth-options";
import Image from "next/image";
import { redirect } from "next/navigation";

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
    <main className="grid min-h-screen md:grid-cols-2">
      <div className="flex flex-col p-3">
        <div className="flex mt-5 justify-between">
            <Logo />
          <ThemeToggle />
        </div>

        <div className="flex-1 p-6 flex justify-center items-center">
          {children}
        </div>
      </div>

      <div className="relative max-md:hidden">
        <Image
          src="/assets/images/login-image.jpg"
          alt="Login Cover"
          fill
          className="object-cover"
          priority
        />
      </div>
    </main>
  );
}
