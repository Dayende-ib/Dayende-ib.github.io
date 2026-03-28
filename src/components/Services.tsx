import { Bot, Code2, Megaphone, Rocket } from "lucide-react";
import { getTranslations } from "next-intl/server";

import AnimatedSection from "@/components/AnimatedSection";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  { key: "web", icon: Code2 },
  { key: "mobile", icon: Rocket },
  { key: "ads", icon: Megaphone },
  { key: "ai", icon: Bot }
] as const;

const deliverables = ["scoping", "delivery", "support"] as const;

type ServicesProps = {
  locale: string;
};

export default async function Services({ locale }: ServicesProps) {
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <section id="services" className="py-20">
      <Container className="space-y-10">
        <AnimatedSection direction="up">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </AnimatedSection>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_320px]">
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <AnimatedSection key={service.key} direction="up" delay={index * 0.09}>
                  <Card className="group h-full rounded-[26px] border-border/70 bg-card/80 card-glow card-hover-glow">
                    <CardHeader className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 transition-transform duration-300 group-hover:scale-110 group-hover:border-cyan-400/40">
                          <Icon className="h-5 w-5 text-cyan-100" />
                        </div>
                        <span className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                          {t(`items.${service.key}.tag`)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <CardTitle className="text-white">
                          {t(`items.${service.key}.title`)}
                        </CardTitle>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {t(`items.${service.key}.description`)}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-2xl border border-border/70 bg-background/35 p-4">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/80">
                          {t("benefitEyebrow")}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/90">
                          {t(`items.${service.key}.benefit`)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection direction="right" delay={0.15}>
            <aside className="section-panel card-glow space-y-5 p-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                  {t("panel.eyebrow")}
                </p>
                <h3 className="text-2xl font-semibold text-white">{t("panel.title")}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {t("panel.description")}
                </p>
              </div>

              <div className="space-y-3">
                {deliverables.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border/70 bg-background/35 p-4 card-hover-glow hover:border-cyan-400/25"
                  >
                    <p className="text-sm font-medium text-white">
                      {t(`panel.items.${item}.title`)}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {t(`panel.items.${item}.description`)}
                    </p>
                  </div>
                ))}
              </div>

              <Button asChild className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-background font-semibold shadow-lg shadow-cyan-500/20">
                <a href="#contact">{t("cta")}</a>
              </Button>
            </aside>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
