"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";

const locales = ["fr", "en"] as const;
type Locale = (typeof locales)[number];

const buildLocalePath = (pathname: string, locale: Locale) => {
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

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const query = searchParams?.toString();

  return (
    <div
      className="flex items-center rounded-full border border-border/70 bg-background/35 p-1 text-[11px] uppercase tracking-[0.24em]"
      aria-label="Language switcher"
    >
      {locales.map((nextLocale) => {
        const href = buildLocalePath(pathname, nextLocale);
        const hrefWithQuery = query ? `${href}?${query}` : href;
        const isActive = locale === nextLocale;

        return (
          <Link
            key={nextLocale}
            href={hrefWithQuery}
            className={cn(
              "rounded-full px-3 py-1.5 transition-colors",
              isActive
                ? "bg-white/10 text-white"
                : "text-muted-foreground hover:text-white"
            )}
          >
            {nextLocale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
