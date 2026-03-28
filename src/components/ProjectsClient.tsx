"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { useMessages, useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project, ProjectFilter, ProjectFilterKey } from "@/data/projects";

interface ProjectsClientProps {
  projects: Project[];
  filters: ProjectFilter[];
}

type MessageValue = string | Record<string, unknown> | undefined;
type Messages = Record<string, MessageValue>;

const getMessageValue = (messages: Messages, path: string) => {
  return path.split(".").reduce<MessageValue>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return current[key] as MessageValue;
    }
    return undefined;
  }, messages);
};

export default function ProjectsClient({
  projects,
  filters
}: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterKey>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("projects");
  const common = useTranslations("common");
  const messages = useMessages() as Messages;

  const orderedProjects = useMemo(() => {
    if (activeFilter === "all") {
      return [...projects].sort(
        (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
      );
    }

    return projects
      .filter((project) => project.category === activeFilter)
      .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [activeFilter, projects]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  useEffect(() => {
    if (currentIndex >= orderedProjects.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, orderedProjects.length]);

  const currentProject = orderedProjects[currentIndex] ?? null;
  const canNavigate = orderedProjects.length > 1;

  const goToPrevious = () => {
    if (!canNavigate) {
      return;
    }

    setCurrentIndex((prev) =>
      prev === 0 ? orderedProjects.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    if (!canNavigate) {
      return;
    }

    setCurrentIndex((prev) => (prev + 1) % orderedProjects.length);
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-8">
        <div
          role="tablist"
          aria-label={t("filtersLabel")}
          className="flex flex-wrap gap-2"
        >
          {filters.map((filter) => {
            const isActive = filter.key === activeFilter;
            return (
              <Button
                key={filter.key}
                size="sm"
                variant={isActive ? "default" : "ghost"}
                onClick={() => setActiveFilter(filter.key)}
                aria-pressed={isActive}
                className="rounded-full"
              >
                {t(`filters.${filter.key}`)}
              </Button>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                {t("allProjectsEyebrow")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("allProjectsDescription")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrevious}
                disabled={!canNavigate}
                aria-label="Previous project"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/50 text-white transition-colors",
                  canNavigate
                    ? "hover:border-cyan-400/40 hover:bg-cyan-500/10"
                    : "cursor-not-allowed opacity-35"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                disabled={!canNavigate}
                aria-label="Next project"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/50 text-white transition-colors",
                  canNavigate
                    ? "hover:border-cyan-400/40 hover:bg-cyan-500/10"
                    : "cursor-not-allowed opacity-35"
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/20 p-2 sm:p-3">
            {currentProject ? renderProjectCard(currentProject) : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {orderedProjects.length > 0 ? `${currentIndex + 1}/${orderedProjects.length}` : "0/0"}
            </p>
            <div className="flex items-center gap-2">
              {orderedProjects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to project ${index + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    index === currentIndex ? "w-8 bg-cyan-200" : "w-2 bg-white/25 hover:bg-white/45"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );

  function renderProjectCard(project: Project) {
    const motionProps = shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, x: 24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.35 }
        };

    const getProjectField = (field: string, fallback?: string) => {
      const value = getMessageValue(messages, `projects.items.${project.id}.${field}`);
      return typeof value === "string" ? value : fallback;
    };

    const title = getProjectField("title", project.title) ?? project.title;
    const description =
      getProjectField("description", project.description) ?? project.description;
    const impact = getProjectField("impact", project.impact) ?? project.impact;
    const role = getProjectField("role", project.role) ?? project.role;
    const microcopy = getProjectField("microcopy", project.microcopy);
    const codeLabel =
      getProjectField("codeLabel", project.codeLabel) || t("cta.viewCode");
    const secondaryLabel = project.ctaSecondary
      ? getProjectField("ctaSecondary", project.ctaSecondary.label)
      : undefined;

    const primaryAction = (() => {
      if (project.liveUrl) {
        return { label: t("cta.viewProject"), href: project.liveUrl };
      }
      if (project.clientProject && project.codePrivate) {
        return { label: t("cta.requestDemo"), href: "#contact" };
      }
      if (project.codeUrl) {
        return {
          label: codeLabel,
          href: project.codeUrl
        };
      }
      return null;
    })();

    const hasSecondaryCta = Boolean(project.ctaSecondary && secondaryLabel);
    const canShowSecondaryCta =
      project.status === "wip" ||
      project.category === "ia" ||
      (project.clientProject && project.featured);
    const shouldShowSecondaryCta = hasSecondaryCta && canShowSecondaryCta;
    const isHackathonWinner = project.id === "anam-meteo-eval";
    const primaryIsExternal = primaryAction?.href.startsWith("http") ?? false;
    const secondaryIsExternal =
      project.ctaSecondary?.href.startsWith("http") ?? false;

    return (
      <m.article
        key={project.id}
        {...motionProps}
        className="w-full"
      >
        <Card
          className={cn(
            "group overflow-hidden rounded-[26px] border-border/70 bg-card/80 card-glow",
            project.featured && "ring-1 ring-cyan-400/25"
          )}
        >
          <div className="relative h-56 overflow-hidden sm:h-64">
            <Image
              src={project.image}
              alt={title}
              width={800}
              height={500}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              placeholder="blur"
              blurDataURL={project.blurDataURL}
              sizes="(max-width: 1024px) 100vw, 1000px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
              <div className="flex flex-wrap gap-2">
                {project.featured ? (
                  <Badge className="w-fit border-cyan-400/30 bg-cyan-500/20 text-cyan-100">
                    {t("badges.featured")}
                  </Badge>
                ) : null}
                {project.clientProject ? (
                  <Badge className="w-fit border-emerald-400/30 bg-emerald-500/20 text-emerald-100">
                    {t("badges.client")}
                  </Badge>
                ) : null}
                {project.status === "wip" ? (
                  <Badge className="w-fit border-slate-400/40 bg-slate-500/20 text-slate-200">
                    {t("badges.wip")}
                  </Badge>
                ) : null}
                {isHackathonWinner ? (
                  <Badge className="w-fit border-amber-400/40 bg-amber-500/20 text-amber-100">
                    {t("badges.hackathonWinner")}
                  </Badge>
                ) : null}
              </div>
              <Badge
                className={cn(
                  "border-transparent",
                  project.category === "ads" && "bg-pink-500/20 text-pink-200",
                  project.category === "web" && "bg-sky-500/20 text-sky-200",
                  project.category === "mobile" && "bg-cyan-500/20 text-cyan-200",
                  project.category === "ia" && "bg-indigo-500/20 text-indigo-200"
                )}
              >
                {t(`categories.${project.category}`).toUpperCase()}
              </Badge>
            </div>
          </div>
          <CardHeader className="space-y-3 lg:space-y-4">
            <div className="space-y-2">
              <CardTitle className="text-xl text-white">{title}</CardTitle>
              <CardDescription className="leading-6">
                {description}
              </CardDescription>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/35 p-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/80">
                {t("impactEyebrow")}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/90">{impact}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 lg:space-y-5">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {common("roleLabel")}:{" "}
              <span className="normal-case text-white/90">{role}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/5 text-slate-200">
                  {tag}
                </Badge>
              ))}
            </div>
            {microcopy ? (
              <p className="text-xs leading-5 text-muted-foreground">{microcopy}</p>
            ) : null}
          </CardContent>
          <CardFooter className="mt-auto flex flex-wrap gap-3">
            {primaryAction ? (
              <Button asChild size="sm" variant="secondary" className="rounded-full">
                <a
                  href={primaryAction.href}
                  target={primaryIsExternal ? "_blank" : undefined}
                  rel={primaryIsExternal ? "noreferrer" : undefined}
                >
                  {primaryAction.label}
                </a>
              </Button>
            ) : null}
            {shouldShowSecondaryCta && project.ctaSecondary ? (
              <Button asChild size="sm" variant="ghost" className="rounded-full">
                <a
                  href={project.ctaSecondary.href}
                  target={secondaryIsExternal ? "_blank" : undefined}
                  rel={secondaryIsExternal ? "noreferrer" : undefined}
                >
                  {secondaryLabel}
                </a>
              </Button>
            ) : null}
          </CardFooter>
        </Card>
      </m.article>
    );
  }
}
