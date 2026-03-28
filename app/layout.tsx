import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { defaultLocale } from "../i18n";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const siteUrl = "https://ibrahimdayende.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ibrahim Dayende OUGDA | Full-Stack Web & Mobile Developer",
    template: "%s | Ibrahim Dayende OUGDA"
  },
  description:
    "Portfolio de Ibrahim Dayende OUGDA, développeur Full-Stack Web & Mobile. Projets, services et contact.",
  alternates: {
    canonical: "/",
    languages: {
      fr: "/fr",
      en: "/en",
      "x-default": "/"
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/favicon.ico"
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Ibrahim Dayende OUGDA",
    title: "Ibrahim Dayende OUGDA | Full-Stack Web & Mobile Developer",
    description:
      "Développeur Full-Stack Web & Mobile. Découvrez mes projets, services et réalisations.",
    url: siteUrl,
    locale: "fr_FR"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Dayende OUGDA | Full-Stack Web & Mobile Developer",
    description:
      "Développeur Full-Stack Web & Mobile. Projets web/mobile, automatisation et livraison orientée impact."
  }
};

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
