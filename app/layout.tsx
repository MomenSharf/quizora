import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { Providers } from "./provider";
import { appConfig } from "@/lib/config/app";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });


const font = Plus_Jakarta_Sans({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.url),

  applicationName: appConfig.name,
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,

  keywords: [
    "Quizora",
    "online quizzes",
    "interactive quizzes",
    "quiz maker",
    "quiz creator",
    "online learning",
    "knowledge testing",
  ],

  authors: [{ name: appConfig.company.name }],
  creator: appConfig.company.name,
  publisher: appConfig.company.name,

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: appConfig.name,
    title: appConfig.name,
    description: appConfig.description,
    url: appConfig.url,
  },

  twitter: {
    card: "summary_large_image",
    title: appConfig.name,
    description: appConfig.description,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-ful scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent",
        "antialiased",
        font.className,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
