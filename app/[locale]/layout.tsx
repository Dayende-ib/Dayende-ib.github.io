import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import ScrollProgress from "@/components/ScrollProgress";

import { defaultLocale, locales, type Locale } from "../../i18n";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;
  const t = await getTranslations({ locale: resolvedLocale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");
  const siteUrl = "https://ibrahimdayende.me";
  const localizedUrl = `${siteUrl}/${resolvedLocale}`;
  const ogLocale = resolvedLocale === "fr" ? "fr_FR" : "en_US";

  return {
    title,
    description,
    alternates: {
      canonical: `/${resolvedLocale}`,
      languages: {
        fr: "/fr",
        en: "/en",
        "x-default": "/"
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
      title,
      description,
      type: "website",
      url: localizedUrl,
      locale: ogLocale,
      siteName: "Ibrahim Dayende OUGDA",
      images: [
        {
          url: `https://ibrahimdayende.me/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Ibrahim Dayende OUGDA - Full-Stack Web & Mobile Developer"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://ibrahimdayende.me/og-image.png"]
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;
  const resolvedLocale = locale as Locale;
  if (!locales.includes(resolvedLocale)) {
    notFound();
  }

  setRequestLocale(resolvedLocale);
  const messages = await getMessages({ locale: resolvedLocale });

  return (
    <NextIntlClientProvider locale={resolvedLocale} messages={messages}>
      <ScrollProgress />
      {children}
    </NextIntlClientProvider>
  );
}
