import { ArrowDown, ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import AnimatedSection from "@/components/AnimatedSection";
import Container from "@/components/Container";
import LocalTime from "@/components/LocalTime";
import CountUp from "@/components/motion/CountUp";
import Magnetic from "@/components/motion/Magnetic";
import Marquee from "@/components/motion/Marquee";
import HeroHeadline from "@/components/sections/HeroHeadline";
import HeroVisual from "@/components/sections/HeroVisual";
import { Button } from "@/components/ui/button";
import { site, techStack } from "@/data/site";

const proofKeys = ["projects", "campaigns", "automations", "impressions"] as const;

export default async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "hero" });

  return (
    <section id="accueil" className="relative overflow-hidden pt-24 sm:pt-32">
      {/* Décor */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-b" />
        <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute left-[-10%] top-1/3 h-[320px] w-[320px] rounded-full bg-signal/10 blur-[120px]" />
      </div>

      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-10">
        <div className="space-y-6">
          <AnimatedSection direction="none">
            <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-border bg-background/60 py-1.5 pl-2 pr-4 text-xs backdrop-blur">
              <span className="flex items-center gap-2 rounded-full bg-signal/10 px-2.5 py-1 font-medium text-signal">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-signal" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                </span>
                {t("status")}
              </span>
              <span className="font-mono text-muted-foreground">
                {t("location")} · <LocalTime />
              </span>
            </div>
          </AnimatedSection>

          <div className="space-y-5">
            <AnimatedSection direction="none" delay={0.1}>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-[13px]">
                {t("intro")}
              </p>
            </AnimatedSection>
            <HeroHeadline
              before={t("headline.before")}
              words={t.raw("headline.words") as string[]}
              lead={t("headline.lead")}
              highlight={t("headline.highlight")}
              tail={t("headline.tail")}
            />
          </div>

          <AnimatedSection delay={0.9}>
            <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {t("description")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={1.05}>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button asChild size="lg">
                  <a href="#contact">
                    {t("cta.primary")}
                    <ArrowUpRight />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild size="lg" variant="outline">
                  <a href="#impact">
                    {t("cta.secondary")}
                    <ArrowDown />
                  </a>
                </Button>
              </Magnetic>
            </div>
          </AnimatedSection>
        </div>

        <HeroVisual
          name={site.name}
          role={t("role")}
          ringText={t("ring")}
          chips={{
            award: { title: t("chips.award.title"), label: t("chips.award.label") },
            cost: { value: t("chips.cost.value"), label: t("chips.cost.label") },
            shipped: { value: t("chips.shipped.value"), label: t("chips.shipped.label") }
          }}
        />
      </Container>

      <Container className="mt-10 sm:mt-14">
        <AnimatedSection delay={0.2}>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
            {proofKeys.map((key) => (
              <div key={key} className="flex flex-col-reverse gap-1 bg-background p-4 sm:p-6">
                <dt className="text-sm text-muted-foreground">{t(`proofs.${key}.label`)}</dt>
                <dd className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                  <CountUp value={t(`proofs.${key}.value`)} />
                </dd>
              </div>
            ))}
          </dl>
        </AnimatedSection>
      </Container>

      <div className="py-8 sm:py-10">
        <p className="eyebrow mb-4 text-center">{t("stackLabel")}</p>
        <Marquee duration={45}>
          {techStack.map((tech) => (
            <span key={tech} className="flex items-center gap-10 whitespace-nowrap font-display text-xl font-medium text-muted-foreground/80 sm:text-2xl">
              {tech}
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
