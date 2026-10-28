import { ArrowRight, ArrowUpRight, Bot, Code2, Megaphone, Smartphone } from "lucide-react";
import { getTranslations } from "next-intl/server";

import AnimatedSection from "@/components/AnimatedSection";
import Container from "@/components/Container";
import Magnetic from "@/components/motion/Magnetic";
import Process from "@/components/sections/Process";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";

const services = [
  { key: "web", icon: Code2 },
  { key: "mobile", icon: Smartphone },
  { key: "ai", icon: Bot },
  { key: "ads", icon: Megaphone }
] as const;

export default async function Services({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <section id="services" className="py-14 sm:py-20">
      <Container className="space-y-8 sm:space-y-10">
        <SectionHeading
          index="03"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          aside={
            <Magnetic>
              <Button asChild variant="outline">
                <a href="#contact">
                  {t("cta")}
                  <ArrowUpRight />
                </a>
              </Button>
            </Magnetic>
          }
        />

        <div className="grid gap-4 md:grid-cols-2">
          {services.map(({ key, icon: Icon }, index) => (
            <AnimatedSection key={key} delay={(index % 2) * 0.1} className="h-full">
              <article className="spotlight-card group flex h-full flex-col rounded-3xl border border-border bg-card p-5 transition-colors duration-300 hover:border-foreground/20 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:border-primary/40 group-hover:text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")} — {t(`items.${key}.tag`)}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">{t(`items.${key}.title`)}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{t(`items.${key}.description`)}</p>
                <div className="mt-4 flex gap-3 rounded-2xl bg-accent/60 p-4">
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-signal" />
                  <p className="text-sm leading-6">
                    <span className="font-medium">{t("benefitLabel")} </span>
                    <span className="text-muted-foreground">{t(`items.${key}.benefit`)}</span>
                  </p>
                </div>
                <p className="mt-auto pt-4 font-mono text-xs leading-5 text-muted-foreground">{t(`items.${key}.proof`)}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 sm:p-8">
          <div className="mb-8 max-w-2xl space-y-2">
            <p className="eyebrow">{t("process.eyebrow")}</p>
            <h3 className="font-display text-3xl font-semibold tracking-tight">{t("process.title")}</h3>
            <p className="leading-7 text-muted-foreground">{t("process.description")}</p>
          </div>
          <Process />
        </div>
      </Container>
    </section>
  );
}
