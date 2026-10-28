import type { ReactNode } from "react";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import HtmlLang from "@/components/HtmlLang";
import MotionProvider from "@/components/motion/MotionProvider";
import ScrollProgress from "@/components/ScrollProgress";
import Toaster from "@/components/Toaster";

type Messages = Record<string, AbstractIntlMessages>;

/**
 * Seules les traductions lues par des composants client partent dans le HTML.
 * Le reste (hero, à propos, articles, footer, métadonnées...) est rendu côté serveur.
 * Ajouter ici tout namespace utilisé avec useTranslations dans un composant client.
 */
const pickClientMessages = (messages: Messages): AbstractIntlMessages => ({
  common: messages.common,
  navbar: messages.navbar,
  palette: messages.palette,
  impact: messages.impact,
  skills: messages.skills,
  projects: messages.projects,
  testimonials: messages.testimonials,
  services: { process: messages.services.process },
  contact: { form: messages.contact.form }
});

/** Fournisseurs communs aux pages localisées (/fr, /en) et à la racine (/). */
export default async function LocaleProviders({
  locale,
  children
}: {
  locale: string;
  children: ReactNode;
}) {
  setRequestLocale(locale);
  const messages = pickClientMessages((await getMessages({ locale })) as Messages);

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
