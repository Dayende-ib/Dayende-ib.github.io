import type { Metadata } from "next";

import EnglishRedirect from "@/components/EnglishRedirect";
import LocaleProviders from "@/components/LocaleProviders";

import { defaultLocale } from "../i18n";
import HomePage from "./[locale]/page";

// La racine sert directement la version française : même contenu que /fr
export const metadata: Metadata = {
  alternates: {
    canonical: "/fr",
    languages: { fr: "/fr", en: "/en", "x-default": "/" }
  }
};

export default function RootPage() {
  return (
    <>
      <EnglishRedirect />
      <LocaleProviders locale={defaultLocale}>
        <HomePage params={Promise.resolve({ locale: defaultLocale })} />
      </LocaleProviders>
    </>
  );
}
