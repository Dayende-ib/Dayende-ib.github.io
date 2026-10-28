import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import HtmlLang from "@/components/HtmlLang";
import MotionProvider from "@/components/motion/MotionProvider";
import ScrollProgress from "@/components/ScrollProgress";
import Toaster from "@/components/Toaster";

/** Fournisseurs communs aux pages localisées (/fr, /en) et à la racine (/). */
export default async function LocaleProviders({
  locale,
  children
}: {
  locale: string;
  children: ReactNode;
}) {
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MotionProvider>
        <HtmlLang locale={locale} />
        <ScrollProgress />
        {children}
        <Toaster />
      </MotionProvider>
    </NextIntlClientProvider>
  );
}
