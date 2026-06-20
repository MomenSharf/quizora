import { Logo } from "@/components/logo";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid min-h-screen md:grid-cols-2">
      <div className="flex flex-col">
        <div className="flex mt-5 ml-5">
          <Logo />
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
