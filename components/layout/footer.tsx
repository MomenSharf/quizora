import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { Logo } from "../logo";

const footerLinks = [
  {
    title: "Explore",
    links: [{ label: "Discover quizzes", href: "/discover" }],
  },
  {
    title: "Get started",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Create an account", href: "/register" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border px-4 pb-6 pt-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm space-y-3">
          <Logo />

          <p className="max-w-xs text-sm leading-6 text-muted-foreground">
            Learn something new, challenge yourself, and make every question
            count.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:gap-16">
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-sm font-semibold">{group.title}</h3>

              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-9 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Quizora. All rights reserved.
        </p>

        <p className="text-xs text-muted-foreground">
          Made for curious minds. <span aria-hidden="true">✦</span>
        </p>
      </div>
    </footer>
  );
}
