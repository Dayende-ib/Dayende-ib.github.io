"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { X, ExternalLink, Github, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { useMessages, useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project, ProjectFilter, ProjectFilterKey } from "@/data/projects";

const PAGE_SIZE = 9;

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

const categoryColors: Record<string, string> = {
  ads:    "bg-pink-500/20 text-pink-200 border-transparent",
  web:    "bg-sky-500/20 text-sky-200 border-transparent",
  mobile: "bg-cyan-500/20 text-cyan-200 border-transparent",
  ia:     "bg-indigo-500/20 text-indigo-200 border-transparent"
};

export default function ProjectsClient({ projects, filters }: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterKey>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [page, setPage] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("projects");
  const common = useTranslations("common");
  const messages = useMessages() as Messages;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLButtonElement>(null);
  const paginatedRef = useRef(false);

  const filteredProjects = useMemo(() => {
    const list = activeFilter === "all"
      ? [...projects]
      : projects.filter((p) => p.category === activeFilter);
    return list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [activeFilter, projects]);

  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);
  const pageProjects = filteredProjects.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const closeModal = useCallback(() => setSelectedProject(null), []);

  const goToPage = (next: number) => {
    paginatedRef.current = true;
    setPage(next);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Reset page when filter changes
  useEffect(() => { setPage(0); }, [activeFilter]);

  // Focus first card after pagination (after exit animation ~250ms)
  useEffect(() => {
    if (!paginatedRef.current) return;
    paginatedRef.current = false;
    const id = setTimeout(() => firstCardRef.current?.focus({ preventScroll: true }), 280);
    return () => clearTimeout(id);
  }, [page]);

  useEffect(() => {
    if (!selectedProject) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedProject, closeModal]);

  useEffect(() => {
    if (selectedProject) closeButtonRef.current?.focus();
  }, [selectedProject]);

  const getField = (project: Project, field: string, fallback?: string) => {
    const value = getMessageValue(messages, `projects.items.${project.id}.${field}`);
    return typeof value === "string" ? value : (fallback ?? "");
  };

  return (
    <LazyMotion features={domAnimation}>
      {/* Filters */}
      <div role="tablist" aria-label={t("filtersLabel")} className="flex flex-wrap gap-2 mb-8">
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

      {/* Grid */}
      <div ref={gridRef} className="scroll-mt-28">
        <m.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {pageProjects.map((project, i) => {
              const title = getField(project, "title", project.title);
              const description = getField(project, "description", project.description);

              return (
                <m.button
                  key={project.id}
                  ref={i === 0 ? firstCardRef : undefined}
                  layout
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  onClick={() => setSelectedProject(project)}
                  className="group text-left rounded-[22px] border border-border/70 bg-card/80 overflow-hidden card-hover-glow card-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Voir le détail : ${title}`}
                >
                  {/* Image — full aspect ratio, no crop */}
                  <div className="relative w-full aspect-video bg-background/60 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={title}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      placeholder="blur"
                      blurDataURL={project.blurDataURL}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* subtle bottom gradient to separate image from card body */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
                    {/* category badge top-right */}
                    <div className="absolute top-2.5 right-2.5 flex flex-wrap gap-1.5">
                      {project.featured && (
                        <Badge className="border-cyan-400/30 bg-cyan-500/20 text-cyan-100 text-[10px]">
                          {t("badges.featured")}
                        </Badge>
                      )}
                      {project.clientProject && (
                        <Badge className="border-emerald-400/30 bg-emerald-500/20 text-emerald-100 text-[10px]">
                          {t("badges.client")}
                        </Badge>
                      )}
                      {project.status === "wip" && (
                        <Badge className="border-slate-400/40 bg-slate-500/20 text-slate-200 text-[10px]">
                          {t("badges.wip")}
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-2.5 left-2.5">
                      <Badge className={cn("text-[10px]", categoryColors[project.category])}>
                        {t(`categories.${project.category}`).toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4 space-y-2">
                    <p className="text-sm font-semibold text-white leading-snug line-clamp-2">
                      {title}
                    </p>
                    <p className="text-xs leading-5 text-muted-foreground line-clamp-2">
                      {description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-white/5 text-slate-300 text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="secondary" className="bg-white/5 text-slate-400 text-[10px]">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </m.button>
              );
            })}
          </AnimatePresence>
        </m.div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page === 0}
            aria-label="Page précédente"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/50 text-white transition-colors",
              page === 0
                ? "cursor-not-allowed opacity-30"
                : "hover:border-cyan-400/40 hover:bg-cyan-500/10"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToPage(i)}
                aria-label={`Page ${i + 1}`}
                aria-current={i === page ? "page" : undefined}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === page
                    ? "h-2 w-6 bg-cyan-400"
                    : "h-2 w-2 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages - 1}
            aria-label="Page suivante"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/50 text-white transition-colors",
              page === totalPages - 1
                ? "cursor-not-allowed opacity-30"
                : "hover:border-cyan-400/40 hover:bg-cyan-500/10"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <span className="ml-1 text-xs text-muted-foreground tabular-nums">
            {page + 1} / {totalPages}
          </span>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <m.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
              className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
              aria-hidden="true"
            />
            <m.div
              key="modal"
              role="dialog"
              aria-modal="true"
              aria-label={getField(selectedProject, "title", selectedProject.title)}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="fixed inset-x-4 top-[5vh] bottom-[5vh] z-[81] mx-auto max-w-2xl overflow-y-auto rounded-[28px] border border-border/70 bg-card shadow-2xl shadow-black/40 scrollbar-none"
            >
              <ModalContent
                project={selectedProject}
                closeButtonRef={closeButtonRef}
                onClose={closeModal}
                getField={getField}
                t={t}
                common={common}
              />
            </m.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

/* ── Modal content ── */
function ModalContent({
  project,
  closeButtonRef,
  onClose,
  getField,
  t,
  common
}: {
  project: Project;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  getField: (p: Project, field: string, fallback?: string) => string;
  t: ReturnType<typeof useTranslations>;
  common: ReturnType<typeof useTranslations>;
}) {
  const title       = getField(project, "title",       project.title);
  const description = getField(project, "description", project.description);
  const impact      = getField(project, "impact",      project.impact);
  const role        = getField(project, "role",        project.role);
  const microcopy   = getField(project, "microcopy",   project.microcopy);
  const codeLabel   = getField(project, "codeLabel",   project.codeLabel) || t("cta.viewCode");

  const primaryAction = (() => {
    if (project.liveUrl)                              return { label: t("cta.viewProject"), href: project.liveUrl,  external: true  };
    if (project.clientProject && project.codePrivate) return { label: t("cta.requestDemo"), href: "#contact",       external: false };
    if (project.codeUrl)                              return { label: codeLabel,             href: project.codeUrl, external: true  };
    return null;
  })();

  const secondaryAction = project.codeUrl && project.liveUrl
    ? { label: codeLabel, href: project.codeUrl }
    : null;

  return (
    <div>
      {/* Image header — full image, no crop */}
      <div className="relative w-full aspect-video bg-background/80 rounded-t-[28px] overflow-hidden">
        <Image
          src={project.image}
          alt={title}
          fill
          className="object-contain"
          placeholder="blur"
          blurDataURL={project.blurDataURL}
          sizes="672px"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />

        {/* Close */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Badges */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {project.featured && (
              <Badge className="border-cyan-400/30 bg-cyan-500/20 text-cyan-100">{t("badges.featured")}</Badge>
            )}
            {project.clientProject && (
              <Badge className="border-emerald-400/30 bg-emerald-500/20 text-emerald-100">{t("badges.client")}</Badge>
            )}
            {project.status === "wip" && (
              <Badge className="border-slate-400/40 bg-slate-500/20 text-slate-200">{t("badges.wip")}</Badge>
            )}
            {project.id === "anam-meteo-eval" && (
              <Badge className="border-amber-400/40 bg-amber-500/20 text-amber-100">{t("badges.hackathonWinner")}</Badge>
            )}
          </div>
          <Badge className={cn("shrink-0 border-transparent", categoryColors[project.category])}>
            {t(`categories.${project.category}`).toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-5 p-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold leading-snug text-white">{title}</h2>
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        </div>

        {/* Case study or impact */}
        {project.caseStudy ? (
          <div className="rounded-2xl border border-border/70 bg-background/35 p-4 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/80">Case Study</p>
            <div className="space-y-2.5 text-sm leading-6">
              <p><span className="font-medium text-white/60">Défi — </span><span className="text-white/80">{project.caseStudy.challenge}</span></p>
              <p><span className="font-medium text-white/60">Approche — </span><span className="text-white/80">{project.caseStudy.approach}</span></p>
              <p><span className="font-medium text-cyan-300/80">Résultat — </span><span className="text-white/90">{project.caseStudy.result}</span></p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border/70 bg-background/35 p-4 space-y-2">
            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/80">{t("impactEyebrow")}</p>
            <p className="text-sm leading-6 text-white/90">{impact}</p>
          </div>
        )}

        {/* Role + Tags */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {common("roleLabel")}:{" "}
            <span className="normal-case text-white/90">{role}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/5 text-slate-200">{tag}</Badge>
            ))}
          </div>
          {microcopy && <p className="text-xs leading-5 text-muted-foreground">{microcopy}</p>}
        </div>

        {/* CTAs */}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-wrap gap-3 pt-1 border-t border-border/50">
            {primaryAction && (
              <Button asChild size="sm" className="rounded-full gap-1.5 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-background font-semibold">
                <a href={primaryAction.href} target={primaryAction.external ? "_blank" : undefined} rel={primaryAction.external ? "noreferrer" : undefined}>
                  {primaryAction.label}
                  {primaryAction.external && <ExternalLink className="h-3.5 w-3.5" />}
                </a>
              </Button>
            )}
            {secondaryAction && (
              <Button asChild size="sm" variant="outline" className="rounded-full gap-1.5">
                <a href={secondaryAction.href} target="_blank" rel="noreferrer">
                  <Github className="h-3.5 w-3.5" />
                  {secondaryAction.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
