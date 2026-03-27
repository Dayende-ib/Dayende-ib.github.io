import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { projects, projectFilters } from "@/data/projects";

const ProjectsClient = dynamic(() => import("@/components/ProjectsClient"), {
  loading: () => (
    <div className="grid gap-6 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`project-skeleton-${index}`}
          className="h-72 rounded-2xl border border-border/60 bg-muted/20"
        />
      ))}
    </div>
  )
});

type ProjectsProps = {
  locale: string;
};

export default async function Projects({ locale }: ProjectsProps) {
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <section id="projects" className="py-20">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <ProjectsClient projects={projects} filters={projectFilters} />
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-xs text-muted-foreground sm:text-sm">
          <span>{t("ctaPrompt")}</span>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild size="sm">
              <a href="#contact">{t("ctaLabel")}</a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a
                href="https://github.com/Dayende-ib"
                target="_blank"
                rel="noreferrer"
              >
                {t("ctaGithub")}
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
