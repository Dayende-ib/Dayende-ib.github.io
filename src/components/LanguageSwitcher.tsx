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
      className="flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-muted-foreground"
      aria-label="Language switcher"
    >
      {locales.map((nextLocale, index) => {
        const href = buildLocalePath(pathname, nextLocale);
        const hrefWithQuery = query ? `${href}?${query}` : href;
        const isActive = locale === nextLocale;

        return (
          <span key={nextLocale} className="flex items-center gap-2">
            <Link
              href={hrefWithQuery}
              className={cn(
                "transition-colors",
                isActive ? "text-white" : "hover:text-white"
              )}
            >
              {nextLocale.toUpperCase()}
            </Link>
            {index === 0 ? <span className="text-muted-foreground/50">|</span> : null}
          </span>
        );
      })}
    </div>
  );
}
