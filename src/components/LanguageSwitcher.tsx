"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

const locales = ["fr", "en"] as const;
type Locale = (typeof locales)[number];

export const buildLocalePath = (pathname: string, locale: Locale) => {
  const segments = pathname.split("/");
  const currentLocale = segments[1] as Locale | undefined;

  if (locales.includes(currentLocale as Locale)) {
    segments[1] = locale;
  } else {
    segments.splice(1, 0, locale);
  }

  const nextPath = segments.join("/") || "/";
  return nextPath.replace(/\/\/+/g, "/");
};

export const rememberLocale = (locale: Locale) => {
  try {
    localStorage.setItem("preferred-locale", locale);
  } catch {
    // Stockage indisponible (navigation privée) : on ignore
  }
};

export default function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const query = searchParams?.toString();

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-border bg-background/60 p-0.5 font-mono text-[11px] uppercase tracking-wider",
        className
      )}
      role="group"
      aria-label={t("language")}
    >
      {locales.map((nextLocale) => {
        const href = buildLocalePath(pathname, nextLocale);
        const hrefWithQuery = query ? `${href}?${query}` : href;
        const isActive = locale === nextLocale;

        return (
          <Link
            key={nextLocale}
            href={hrefWithQuery}
            hrefLang={nextLocale}
            aria-current={isActive ? "true" : undefined}
            onClick={() => rememberLocale(nextLocale)}
            className={cn(
              "rounded-full px-2.5 py-1.5 transition-colors",
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {nextLocale}
          </Link>
        );
      })}
    </div>
  );
}
