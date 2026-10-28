"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

import { site } from "@/data/site";

/** Heure locale au Burkina Faso, mise à jour chaque minute. */
export default function LocalTime({ className }: { className?: string }) {
  const locale = useLocale();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: site.timeZone
      }).format(new Date());

    setTime(format());
    const id = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(id);
  }, [locale]);

  return (
    <time className={className} suppressHydrationWarning>
      {time ?? "--:--"} GMT
    </time>
  );
}
