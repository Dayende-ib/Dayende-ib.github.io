"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();
  const [loadingLocale, setLoadingLocale] = useState<"en" | "fr" | null>(null);

  const handleSelectLocale = (locale: "en" | "fr") => {
    if (loadingLocale) {
      return;
    }

    setLoadingLocale(locale);
    router.push(`/${locale}/`);
  };

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <div className="w-full max-w-xl rounded-2xl border border-border/60 bg-card/70 p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur">
          <p className="text-2xl font-semibold text-white sm:text-3xl">
            Bienvenue sur le portfolio de Ibrahim Dayende OUGDA
          </p>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Veuillez choisir une langue pour continuer.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleSelectLocale("en")}
              disabled={Boolean(loadingLocale)}
              className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              English
            </button>
            {/* <span className="text-muted-foreground">|</span> */}
            <button
              type="button"
              onClick={() => handleSelectLocale("fr")}
              disabled={Boolean(loadingLocale)}
              className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Français
            </button>
          </div>
        </div>
      </main>

      {loadingLocale ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border/60 bg-card/80 px-6 py-5">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-white" />
            <p className="text-sm text-muted-foreground">
              Chargement de la version {loadingLocale === "fr" ? "française" : "anglaise"}...
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
