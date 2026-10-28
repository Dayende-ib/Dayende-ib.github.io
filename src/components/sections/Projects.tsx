import { ArrowUpRight, Github } from "lucide-react";
import { getTranslations } from "next-intl/server";

import AnimatedSection from "@/components/AnimatedSection";
import Container from "@/components/Container";
import CaseStudies from "@/components/projects/CaseStudies";
import ProjectGrid from "@/components/projects/ProjectGrid";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export default async function Projects({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <section id="projects" className="py-14 sm:py-20">
      <Container className="space-y-8 sm:space-y-10">
        <SectionHeading index="04" eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <CaseStudies />
        <div className="pt-4">
          <ProjectGrid />
        </div>
        <AnimatedSection>
          <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-dashed border-border p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <p className="font-display text-xl font-semibold tracking-tight">{t("ctaPrompt")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("ctaDescription")}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <a href="#contact">
                  {t("ctaLabel")}
                  <ArrowUpRight />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={site.github} target="_blank" rel="noreferrer">
                  <Github />
                  {t("ctaGithub")}
                </a>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
