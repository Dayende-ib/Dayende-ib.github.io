import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";

const valueKeys = ["product", "execution", "growth"] as const;
const infoKeys = ["location", "collaboration", "response"] as const;

type AboutProps = {
  locale: string;
};

export default async function About({ locale }: AboutProps) {
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <section id="about" className="py-20">
      <Container className="grid gap-10 xl:grid-cols-[minmax(0,1.1fr)_380px] xl:items-start">
        <div className="space-y-8">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />

          <div className="grid gap-4 md:grid-cols-3">
            {valueKeys.map((key) => (
              <div
                key={key}
                className="section-panel rounded-[24px] p-5"
              >
                <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/80">
                  {t(`values.${key}.eyebrow`)}
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  {t(`values.${key}.title`)}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t(`values.${key}.description`)}
                </p>
              </div>
            ))}
          </div>

          <div className="section-panel card-glow rounded-[28px] p-6">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                  {t("approach.eyebrow")}
                </p>
                <h3 className="text-2xl font-semibold text-white">
                  {t("approach.title")}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {t("approach.description")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full">
                  <Link href="#contact">{t("cta.primary")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="section-panel card-glow overflow-hidden rounded-[28px] p-5">
            <div className="relative mx-auto h-80 w-full overflow-hidden rounded-[22px] border border-border/70 bg-background/35">
              <Image
                src="/profile-ibrahim-dayende.webp"
                alt="Photo de profil Ibrahim Dayende - Full-stack Developer"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 380px"
              />
            </div>
            <div className="mt-5 space-y-2">
              <p className="text-lg font-medium text-white">{t("profile.title")}</p>
              <p className="text-sm leading-6 text-muted-foreground">
                {t("profile.description")}
              </p>
            </div>
          </div>

          <div className="section-panel rounded-[28px] border-cyan-400/25 bg-cyan-500/10 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/90">
              {t("achievement.eyebrow")}
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              {t("achievement.title")}
            </p>
            <p className="mt-2 text-sm leading-6 text-cyan-100/90">
              {t("achievement.description")}
            </p>
          </div>

          <div className="section-panel rounded-[28px] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              {t("details.eyebrow")}
            </p>
            <div className="mt-4 space-y-4">
              {infoKeys.map((key) => (
                <div key={key} className="rounded-2xl border border-border/70 bg-background/35 p-4">
                  <p className="text-sm font-medium text-white">
                    {t(`details.items.${key}.title`)}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {t(`details.items.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </Container>
    </section>
  );
}
