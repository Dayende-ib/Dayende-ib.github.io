import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, BookOpen } from "lucide-react";

import AnimatedSection from "@/components/AnimatedSection";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const articleKeys = ["a1", "a2", "a3", "a4", "a5"] as const;

const articleAccents = [
  "border-cyan-400/25 bg-cyan-500/10",
  "border-violet-400/25 bg-violet-500/10",
  "border-sky-400/25 bg-sky-500/10",
  "border-emerald-400/25 bg-emerald-500/10",
  "border-pink-400/25 bg-pink-500/10"
] as const;

type BlogProps = {
  locale: string;
};

export default async function Blog({ locale }: BlogProps) {
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <section id="blog" className="py-20">
      <Container className="space-y-10">
        <AnimatedSection direction="up">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articleKeys.map((key, i) => (
            <AnimatedSection key={key} direction="up" delay={i * 0.1}>
              <article className={`section-panel card-hover-glow flex h-full flex-col gap-4 overflow-hidden rounded-[26px] border p-6 ${articleAccents[i]}`}>
                <div className="flex items-start justify-between gap-3">
                  <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400/70" />
                  <Badge variant="secondary" className="bg-white/5 text-xs text-slate-300">
                    {t(`items.${key}.tag`)}
                  </Badge>
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-base font-semibold leading-snug text-white">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {t(`items.${key}.summary`)}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-border/50 pt-4">
                  <span className="text-xs text-muted-foreground">
                    {t(`items.${key}.date`)}
                  </span>
                  <a
                    href={t(`items.${key}.url`)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    {t("readMore")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-xs text-muted-foreground sm:text-sm">
            <span>{t("ctaPrompt")}</span>
            <Button asChild size="sm" variant="outline">
              <Link href={t("ctaUrl")} target="_blank" rel="noreferrer">
                {t("ctaLabel")}
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
