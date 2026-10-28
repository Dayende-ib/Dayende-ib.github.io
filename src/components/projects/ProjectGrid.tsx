"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { easeOutExpo } from "@/components/motion/easing";
import ProjectBadges from "@/components/projects/ProjectBadges";
import { useProjectModal } from "@/components/projects/ProjectProvider";
import { useProjectContent } from "@/components/projects/useProjectContent";
import { Button } from "@/components/ui/button";
import { caseStudyIds, projectFilters, projects, type ProjectFilterKey } from "@/data/projects";
import { cn } from "@/lib/utils";

const INITIAL_COUNT = 6;

// L'archive exclut les études de cas déjà présentées au-dessus
const archive = projects.filter((project) => !(caseStudyIds as readonly string[]).includes(project.id));

export default function ProjectGrid() {
  const t = useTranslations("projects");
  const getContent = useProjectContent();
  const { openProject } = useProjectModal();
  const [filter, setFilter] = useState<ProjectFilterKey>("all");
  const [expanded, setExpanded] = useState(false);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: archive.length };
    archive.forEach((project) => {
      result[project.category] = (result[project.category] ?? 0) + 1;
    });
    return result;
  }, []);

  const filtered = filter === "all" ? archive : archive.filter((project) => project.category === filter);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hiddenCount = filtered.length - visible.length;

  const selectFilter = (key: ProjectFilterKey) => {
    setFilter(key);
    setExpanded(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{t("archive.title")}</h3>
          <p className="text-muted-foreground">{t("archive.description")}</p>
        </div>
        <div role="group" aria-label={t("filtersLabel")} className="flex flex-wrap gap-1 rounded-full border border-border bg-card p-1">
          {projectFilters
            .filter((key) => counts[key])
            .map((key) => {
              const isActive = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => selectFilter(key)}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                    isActive ? "text-background" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive ? (
                    <m.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative">
                    {t(`filters.${key}`)} <span className="font-mono text-[10px] opacity-60">{counts[key]}</span>
                  </span>
                </button>
              );
            })}
        </div>
      </div>

      <m.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => {
            const content = getContent(project.id);
            const metric = content.metrics[0];
            return (
              <m.li
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                transition={{ duration: 0.5, delay: (index % INITIAL_COUNT) * 0.05, ease: easeOutExpo }}
              >
                <button
                  type="button"
                  onClick={() => openProject(project.id)}
                  className="spotlight-card group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20"
                >
                  <span className="relative block aspect-[16/10] w-full overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <ProjectBadges project={project} className="absolute left-3 top-3 right-3" />
                  </span>
                  <span className="flex flex-1 flex-col p-4">
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-display text-lg font-semibold leading-snug tracking-tight">{content.title}</span>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground" />
                    </span>
                    {metric ? (
                      <span className="mt-2 text-sm text-muted-foreground">
                        <span className="font-semibold text-signal">{metric.value}</span> {metric.label}
                      </span>
                    ) : null}
                    <span className="mt-auto flex flex-wrap gap-1.5 pt-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </span>
                  </span>
                </button>
              </m.li>
            );
          })}
        </AnimatePresence>
      </m.ul>

      {filtered.length > INITIAL_COUNT ? (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>
            {expanded ? t("showLess") : t("showMore", { count: hiddenCount })}
            <ChevronDown className={cn("transition-transform duration-300", expanded && "rotate-180")} />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
