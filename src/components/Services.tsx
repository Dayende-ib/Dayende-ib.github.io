import { getTranslations } from "next-intl/server";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  { key: "web" },
  { key: "mobile" },
  { key: "ads" },
  { key: "ai" }
];

type ServicesProps = {
  locale: string;
};

export default async function Services({ locale }: ServicesProps) {
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <section id="services" className="py-20">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <Card
              key={service.key}
              className="group card-glow transition-transform duration-300 hover:-translate-y-1"
            >
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 via-fuchsia-400/20 to-cyan-400/30">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                </div>
                <CardTitle className="text-white">
                  {t(`items.${service.key}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t(`items.${service.key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-xs text-muted-foreground sm:text-sm">
          <span>{t("microProof")}</span>
          <Button asChild size="sm">
            <a href="#contact">{t("cta")}</a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
