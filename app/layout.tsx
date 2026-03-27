import type { ReactNode } from "react";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { defaultLocale } from "../i18n";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const headerList = await headers();
  const locale = headerList.get("x-next-intl-locale") ?? defaultLocale;

  return (
    <html lang={locale} className={inter.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
