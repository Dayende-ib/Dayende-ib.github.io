import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Container from "@/components/Container";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SectionHeading from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { defaultLocale, locales, type Locale } from "../../../i18n";

type MindeaseDemoPageProps = {
  params: Promise<{ locale: string }>;
};

type DemoKey = "web" | "mobile" | "whatsapp";

type DemoConfig = {
  key: DemoKey;
  src: string;
  orientation: "landscape" | "portrait";
};

const demos: DemoConfig[] = [
  { key: "web", src: "/mindease/web.mp4", orientation: "landscape" },
  { key: "mobile", src: "/mindease/mobile.mp4", orientation: "portrait" },
  { key: "whatsapp", src: "/mindease/whatsapp.mp4", orientation: "portrait" }
];

export async function generateMetadata({
  params
}: MindeaseDemoPageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;
  const t = await getTranslations({ locale: resolvedLocale, namespace: "mindease" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      url: `/${resolvedLocale}/mindeasedemo`
    }
  };
}

export default async function MindeaseDemoPage({ params }: MindeaseDemoPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "mindease" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur">
        <Container className="flex items-center justify-between py-3">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <Image
              src="/logo.png"
              alt="Logo Ibrahim Dayende"
              width={28}
              height={28}
              className="h-7 w-7"
              priority
            />
            Ibrahim Dayende
          </Link>
          <div className="flex items-center gap-4">
            <Suspense fallback={null}>
              <LanguageSwitcher />
            </Suspense>
            <Button asChild variant="outline" size="sm">
              <Link href={`/${locale}`}>{t("backHome")}</Link>
            </Button>
          </div>
        </Container>
      </header>

      <main>
        <section className="relative overflow-hidden pt-20 pb-12">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid opacity-25" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.35),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(34,211,238,0.25),_transparent_50%)] bg-[length:200%_200%] animate-gradient-slow" />
          </div>
          <Container className="relative">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("subtitle")}
              align="center"
            />
          </Container>
        </section>

        <section className="pb-20">
          <Container className="space-y-10">
            {demos.map((demo) => (
              <article
                key={demo.key}
                className="rounded-xl border bg-card p-4 shadow sm:p-6"
              >
                <div className="mb-4 space-y-2">
                  <Badge
                    variant="secondary"
                    className="border-cyan-400/30 bg-cyan-500/10 text-cyan-100"
                  >
                    {t(`demos.${demo.key}.label`)}
                  </Badge>
                  <h3 className="text-xl font-semibold text-white">
                    {t(`demos.${demo.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`demos.${demo.key}.description`)}
                  </p>
                </div>
                <div
                  className={
                    demo.orientation === "portrait"
                      ? "mx-auto w-full max-w-[320px] overflow-hidden rounded-lg border border-border/60 bg-black"
                      : "w-full overflow-hidden rounded-lg border border-border/60 bg-black"
                  }
                >
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className={
                      demo.orientation === "portrait"
                        ? "aspect-[9/16] h-full w-full object-cover"
                        : "aspect-video h-full w-full object-cover"
                    }
                  >
                    <source src={demo.src} type="video/mp4" />
                    {t("unavailable")}
                  </video>
                </div>
              </article>
            ))}
          </Container>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8">
        <Container className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <Link href={`/${locale}`} className="transition-colors hover:text-white">
            {t("backHome")}
          </Link>
          <p>&copy; {new Date().getFullYear()} Ibrahim Dayende.</p>
        </Container>
      </footer>
    </div>
  );
}
