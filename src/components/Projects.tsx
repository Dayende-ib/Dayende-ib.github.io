import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { projects, projectFilters } from "@/data/projects";

const ProjectsClient = dynamic(() => import("@/components/ProjectsClient"), {
  loading: () => (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={`project-skeleton-${index}`}
          className="animate-pulse rounded-[22px] border border-border/60 bg-muted/20 overflow-hidden"
        >
          <div className="aspect-video bg-muted/30" />
          <div className="p-4 space-y-2">
            <div className="h-3.5 w-3/4 rounded-full bg-muted/40" />
            <div className="h-3 w-full rounded-full bg-muted/30" />
            <div className="h-3 w-2/3 rounded-full bg-muted/30" />
          </div>
        </div>
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
