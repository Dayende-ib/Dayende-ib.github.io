"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const storedLocale = localStorage.getItem("preferred-locale");
    if (storedLocale === "fr" || storedLocale === "en") {
      router.replace(`/${storedLocale}/`);
      return;
    }

    const languages = [
      ...(navigator.languages || []),
      navigator.language,
      (navigator as Navigator & { userLanguage?: string }).userLanguage
    ].filter(Boolean) as string[];

    const normalized = languages.map((item) => item.toLowerCase());
    const hasFrench = normalized.some((item) => item.startsWith("fr"));
    const hasEnglish = normalized.some((item) => item.startsWith("en"));

    const locale = hasFrench ? "fr" : hasEnglish ? "en" : "fr";
    router.replace(`/${locale}/`);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border/60 bg-card/80 px-6 py-5">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-white" />
        <p className="text-sm text-muted-foreground">Redirection...</p>
      </div>
    </main>
  );
}
