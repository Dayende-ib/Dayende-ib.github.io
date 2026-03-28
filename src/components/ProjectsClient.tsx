"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
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
type RailState = {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  progress: number;
};

const getMessageValue = (messages: Messages, path: string) => {
  return path.split(".").reduce<MessageValue>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return current[key] as MessageValue;
    }
    return undefined;
  }, messages);
};

const initialRailState: RailState = {
  canScrollLeft: false,
  canScrollRight: false,
  progress: 0
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

  const featuredRailRef = useRef<HTMLDivElement | null>(null);
  const otherRailRef = useRef<HTMLDivElement | null>(null);
  const [featuredRailState, setFeaturedRailState] = useState<RailState>(initialRailState);
  const [otherRailState, setOtherRailState] = useState<RailState>(initialRailState);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  const featuredIds = useMemo(
    () =>
      new Set(projects.filter((project) => project.featured).map((project) => project.id)),
    [projects]
  );

  const featuredProjects = useMemo(
    () => filteredProjects.filter((project) => featuredIds.has(project.id)),
    [featuredIds, filteredProjects]
  );

  const otherProjects = useMemo(
    () => filteredProjects.filter((project) => !featuredIds.has(project.id)),
    [featuredIds, filteredProjects]
  );

  useEffect(() => {
    const updateRailState = (
      element: HTMLDivElement | null,
      setter: (value: RailState) => void
    ) => {
      if (!element) {
        setter(initialRailState);
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = element;
      const maxScroll = Math.max(scrollWidth - clientWidth, 0);
      setter({
        canScrollLeft: scrollLeft > 4,
        canScrollRight: scrollLeft + clientWidth < scrollWidth - 4,
        progress: maxScroll > 0 ? Math.min(Math.max(scrollLeft / maxScroll, 0), 1) : 0
      });
    };

    const featuredRail = featuredRailRef.current;
    const otherRail = otherRailRef.current;

    const updateFeatured = () => updateRailState(featuredRail, setFeaturedRailState);
    const updateOther = () => updateRailState(otherRail, setOtherRailState);

    updateFeatured();
    updateOther();

    featuredRail?.addEventListener("scroll", updateFeatured, { passive: true });
    otherRail?.addEventListener("scroll", updateOther, { passive: true });
    window.addEventListener("resize", updateFeatured);
    window.addEventListener("resize", updateOther);

    return () => {
      featuredRail?.removeEventListener("scroll", updateFeatured);
      otherRail?.removeEventListener("scroll", updateOther);
      window.removeEventListener("resize", updateFeatured);
      window.removeEventListener("resize", updateOther);
    };
  }, [featuredProjects.length, otherProjects.length]);

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

        {featuredProjects.length > 0 ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                {t("featuredEyebrow")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("featuredDescription")}
              </p>
            </div>
            <ProjectRail
              railRef={featuredRailRef}
              railState={featuredRailState}
              hint={t("scrollHint")}
            >
              {featuredProjects.map((project, index) =>
                renderProjectCard(project, index, true)
              )}
            </ProjectRail>
          </div>
        ) : null}

        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("allProjectsEyebrow")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("allProjectsDescription")}
            </p>
          </div>
          <ProjectRail
            railRef={otherRailRef}
            railState={otherRailState}
            hint={t("scrollHint")}
          >
            {otherProjects.map((project, index) =>
              renderProjectCard(project, index, false)
            )}
          </ProjectRail>
        </div>
      </div>
    </LazyMotion>
  );

  function renderProjectCard(project: Project, index: number, featured: boolean) {
    const motionProps = shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: index * 0.05 },
          viewport: { once: true, margin: "-80px" },
          whileHover: { y: -6, scale: 1.01 }
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
    const primaryIsExternal = primaryAction?.href.startsWith("http") ?? false;
    const secondaryIsExternal =
      project.ctaSecondary?.href.startsWith("http") ?? false;

    return (
      <m.article
        key={project.id}
        {...motionProps}
        className={cn(
          "snap-start shrink-0",
          featured
            ? "w-[88vw] sm:w-[32rem] lg:w-[24rem]"
            : "w-[88vw] sm:w-[28rem] lg:w-[24rem]"
        )}
      >
        <Card
          className={cn(
            "group h-full overflow-hidden rounded-[26px] border-border/70 bg-card/80 card-glow",
            featured && "ring-1 ring-cyan-400/25"
          )}
        >
          <div className={cn("relative overflow-hidden", featured ? "h-56" : "h-48")}>
            <Image
              src={project.image}
              alt={title}
              width={800}
              height={500}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              placeholder="blur"
              blurDataURL={project.blurDataURL}
              sizes="(max-width: 768px) 88vw, 420px"
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
          <CardHeader className="space-y-3">
            <div className="space-y-2">
              <CardTitle className="text-xl text-white">{title}</CardTitle>
              <CardDescription className="line-clamp-3 leading-6">
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
          <CardContent className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {common("roleLabel")}:{" "}
              <span className="normal-case text-white/90">{role}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, featured ? 5 : 4).map((tag) => (
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

type ProjectRailProps = {
  children: ReactNode;
  hint: string;
  railRef: RefObject<HTMLDivElement | null>;
  railState: RailState;
};

function ProjectRail({ children, hint, railRef, railState }: ProjectRailProps) {
  const scrollByAmount = (direction: "left" | "right") => {
    const element = railRef.current;
    if (!element) {
      return;
    }

    const amount = Math.max(element.clientWidth * 0.82, 280);
    element.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth"
    });
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const element = railRef.current;
    if (!element) {
      return;
    }

    // Keep vertical wheel for page scrolling; only handle horizontal intent here.
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) {
      return;
    }

    event.preventDefault();
    element.scrollBy({
      left: event.deltaX,
      behavior: "auto"
    });
  };

  return (
    <div className="relative overflow-hidden">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            disabled={!railState.canScrollLeft}
            aria-label="Scroll left"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/50 text-white transition-colors",
              railState.canScrollLeft
                ? "hover:border-cyan-400/40 hover:bg-cyan-500/10"
                : "cursor-not-allowed opacity-35"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            disabled={!railState.canScrollRight}
            aria-label="Scroll right"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/50 text-white transition-colors",
              railState.canScrollRight
                ? "hover:border-cyan-400/40 hover:bg-cyan-500/10"
                : "cursor-not-allowed opacity-35"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-cyan-100">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-200" />
          </span>
          {hint}
        </div>
      </div>

      <div
        ref={railRef}
        onWheel={handleWheel}
        className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain px-1 pb-4 pt-1 [scrollbar-width:none]"
      >
        {children}
      </div>

      <div className="mt-3 flex items-center justify-center">
        <div className="h-1.5 w-36 rounded-full bg-white/10">
          <span
            className="block h-full w-[34%] rounded-full bg-cyan-200 transition-transform duration-300"
            style={{ transform: `translateX(${railState.progress * 194}%)` }}
          />
        </div>
      </div>
    </div>
  );
}
