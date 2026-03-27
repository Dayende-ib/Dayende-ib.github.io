import type { ReactNode } from "react";
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
  return (
    <html lang={defaultLocale} className={inter.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
