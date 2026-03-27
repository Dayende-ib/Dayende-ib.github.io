"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
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
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("projects");
  const common = useTranslations("common");
  const messages = useMessages() as Messages;

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

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
              >
                {t(`filters.${filter.key}`)}
              </Button>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project, index) => {
            const motionProps = shouldReduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.3, delay: index * 0.05 },
                  viewport: { once: true, margin: "-80px" },
                  whileHover: { y: -6, scale: 1.01 }
                };

            const getProjectField = (field: string, fallback?: string) => {
              const value = getMessageValue(
                messages,
                `projects.items.${project.id}.${field}`
              );
              return typeof value === "string" ? value : fallback;
            };

            const title = getProjectField("title", project.title) ?? project.title;
            const description =
              getProjectField("description", project.description) ??
              project.description;
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
            const shouldShowSecondaryCta =
              hasSecondaryCta && canShowSecondaryCta;
            const primaryIsExternal =
              primaryAction?.href.startsWith("http") ?? false;
            const secondaryIsExternal =
              project.ctaSecondary?.href.startsWith("http") ?? false;

            return (
              <m.article key={project.id} {...motionProps}>
                <Card
                  className={cn(
                    "group overflow-hidden card-glow",
                    project.featured && "ring-1 ring-violet-400/40"
                  )}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={title}
                      width={800}
                      height={500}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL={project.blurDataURL}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  </div>
                  <CardHeader className="space-y-2">
                    {project.featured || project.clientProject || project.status ? (
                      <div className="flex flex-wrap gap-2">
                        {project.featured ? (
                          <Badge className="w-fit border-amber-400/40 bg-amber-500/20 text-amber-200">
                            {t("badges.featured")}
                          </Badge>
                        ) : null}
                        {project.clientProject ? (
                          <Badge className="w-fit border-emerald-400/40 bg-emerald-500/20 text-emerald-200">
                            {t("badges.client")}
                          </Badge>
                        ) : null}
                        {project.status === "wip" ? (
                          <Badge className="w-fit border-slate-400/40 bg-slate-500/20 text-slate-200">
                            {t("badges.wip")}
                          </Badge>
                        ) : null}
                      </div>
                    ) : null}
                    <CardTitle className="text-white">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      {common("roleLabel")}: {role}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{impact}</p>
                    {microcopy ? (
                      <p className="text-xs text-muted-foreground">
                        {microcopy}
                      </p>
                    ) : null}
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-3">
                    {primaryAction ? (
                      <Button asChild size="sm" variant="secondary">
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
                      <Button asChild size="sm" variant="ghost">
                        <a
                          href={project.ctaSecondary.href}
                          target={secondaryIsExternal ? "_blank" : undefined}
                          rel={secondaryIsExternal ? "noreferrer" : undefined}
                        >
                          {secondaryLabel}
                        </a>
                      </Button>
                    ) : null}
                    <Badge
                      className={cn(
                        "ml-auto",
                        project.category === "ads" &&
                          "border-transparent bg-pink-500/20 text-pink-200",
                        project.category === "web" &&
                          "border-transparent bg-violet-500/20 text-violet-200",
                        project.category === "mobile" &&
                          "border-transparent bg-cyan-500/20 text-cyan-200",
                        project.category === "ia" &&
                          "border-transparent bg-indigo-500/20 text-indigo-200"
                      )}
                    >
                      {t(`categories.${project.category}`).toUpperCase()}
                    </Badge>
                  </CardFooter>
                </Card>
              </m.article>
            );
          })}
        </div>
      </div>
    </LazyMotion>
  );
}
