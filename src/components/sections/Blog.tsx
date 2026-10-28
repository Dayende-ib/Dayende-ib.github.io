import { ArrowUpRight, Linkedin } from "lucide-react";
import { getTranslations } from "next-intl/server";

import AnimatedSection from "@/components/AnimatedSection";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const articleKeys = ["a1", "a2", "a3", "a4", "a5"] as const;

export default async function Blog({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <section id="blog" className="py-14 sm:py-20">
      <Container className="space-y-8 sm:space-y-10">
        <SectionHeading
          index="07"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          aside={
            <Button asChild variant="outline">
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                <Linkedin />
                {t("ctaLabel")}
              </a>
            </Button>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articleKeys.map((key, index) => (
            <AnimatedSection key={key} delay={(index % 3) * 0.08} className={cn(index === 0 && "md:col-span-2")}>
              <a
                href={t(`items.${key}.url`)}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "spotlight-card group flex h-full flex-col rounded-3xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 sm:p-6",
                  index === 0 && "bg-gradient-to-br from-primary/10 via-card to-card"
                )}
              >
                <div className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <span className="rounded-full border border-border px-2.5 py-1">{t(`items.${key}.tag`)}</span>
                  <span>{t(`items.${key}.date`)}</span>
                </div>
                <h3
                  className={cn(
                    "mt-4 font-display font-semibold leading-snug tracking-tight",
                    index === 0 ? "text-2xl sm:text-3xl" : "text-lg"
                  )}
                >
                  {t(`items.${key}.title`)}
                </h3>
                <p className={cn("mt-2 text-sm leading-6 text-muted-foreground", index !== 0 && "line-clamp-3")}>
                  {t(`items.${key}.summary`)}
                </p>
                <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-medium text-primary">
                  {t("readMore")}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
