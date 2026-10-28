"use client";

import { useEffect } from "react";

/** Le layout racine est partagé entre locales : on corrige l'attribut lang côté client. */
export default function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
