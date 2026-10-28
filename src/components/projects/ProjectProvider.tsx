"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Link2,
  MessageSquare,
  PlayCircle,
  X
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { trackEvent } from "@/components/Analytics";
import { easeOutExpo } from "@/components/motion/easing";
import ProjectBadges from "@/components/projects/ProjectBadges";
import { useProjectContent } from "@/components/projects/useProjectContent";
import { toast } from "@/components/Toaster";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, projectsById } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectContextValue = {
  openProject: (id: string) => void;
};

const ProjectContext = createContext<ProjectContextValue | null>(null);

export const useProjectModal = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjectModal doit être utilisé dans <ProjectProvider>");
  return context;
};

export const CONTACT_PREFILL_EVENT = "portfolio:contact-prefill";

const HASH_PREFIX = "#project-";

const metricColumns: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4"
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openProject = useCallback((id: string) => {
    if (!projectsById[id]) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    setDirection(0);
    setActiveId(id);
    trackEvent("project-open", { id });
    window.history.replaceState(null, "", `${HASH_PREFIX}${id}`);
  }, []);

  const closeProject = useCallback(() => {
    setActiveId(null);
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  const step = useCallback(
    (delta: number) => {
      setActiveId((current) => {
        if (!current) return current;
        const index = projects.findIndex((project) => project.id === current);
        const next = projects[(index + delta + projects.length) % projects.length];
        window.history.replaceState(null, "", `${HASH_PREFIX}${next.id}`);
        return next.id;
      });
      setDirection(delta);
    },
    []
  );

  // Lien partagé : /fr/#project-mindease ouvre directement la fiche
  useEffect(() => {
    const openFromHash = () => {
      const { hash } = window.location;
      if (!hash.startsWith(HASH_PREFIX)) return;
      const id = decodeURIComponent(hash.slice(HASH_PREFIX.length));
      if (projectsById[id]) setActiveId(id);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const value = useMemo(() => ({ openProject }), [openProject]);

  return (
    <ProjectContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {activeId ? (
          <ProjectDialog
            key="project-dialog"
            id={activeId}
            direction={direction}
            onClose={closeProject}
            onStep={step}
          />
        ) : null}
      </AnimatePresence>
    </ProjectContext.Provider>
  );
}

function ProjectDialog({
  id,
  direction,
  onClose,
  onStep
}: {
  id: string;
  direction: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const t = useTranslations("projects");
  const common = useTranslations("common");
  const locale = useLocale();
  const getContent = useProjectContent();
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const project = projectsById[id];
  const content = getContent(id);
  const position = projects.findIndex((item) => item.id === id) + 1;

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      const target = event.target as HTMLElement;
      const isTyping = target.closest("input, textarea");
      if (!isTyping && event.key === "ArrowRight") onStep(1);
      if (!isTyping && event.key === "ArrowLeft") onStep(-1);

      // Garde le focus dans la fenêtre
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, onStep]);

  const goToContact = () => {
    window.dispatchEvent(
      new CustomEvent(CONTACT_PREFILL_EVENT, {
        detail: { message: t("prefill", { title: content.title }), type: project.category }
      })
    );
    onClose();
    requestAnimationFrame(() =>
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast(t("linkCopied"));
    } catch {
      // Presse-papiers refusé : rien à faire
    }
  };

  return (
    <>
      <m.div
        className="fixed inset-0 z-[90] bg-background/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden
      />
      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="fixed inset-x-0 bottom-0 top-[4vh] z-[91] mx-auto flex max-w-3xl flex-col overflow-hidden rounded-t-[28px] border border-border bg-popover shadow-2xl shadow-black/40 sm:inset-x-4 sm:bottom-[4vh] sm:rounded-[28px]"
        initial={{ opacity: 0, y: 60, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
      >
        {/* Barre supérieure */}
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-foreground">{String(position).padStart(2, "0")}</span>
            {" / "}
            {String(projects.length).padStart(2, "0")}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={copyLink}
              aria-label={t("copyLink")}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Link2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label={t("prev")}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label={t("next")}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={common("close")}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <m.article
              key={id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: easeOutExpo }}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={content.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-popover to-transparent" />
                <ProjectBadges project={project} className="absolute left-4 top-4 right-4" />
              </div>

              <div className="space-y-6 px-5 pb-6 pt-2 sm:px-7">
                <div className="space-y-3">
                  <h2
                    id="project-dialog-title"
                    className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"
                  >
                    {content.title}
                  </h2>
                  <p className="text-[15px] leading-7 text-muted-foreground">{content.description}</p>
                </div>

                {content.metrics.length ? (
                  <dl
                    className={cn(
                      "grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border",
                      // Une métrique seule en fin de ligne occupe toute la largeur
                      "[&>*:last-child:nth-child(odd)]:col-span-2 sm:[&>*:last-child:nth-child(odd)]:col-span-1",
                      metricColumns[content.metrics.length]
                    )}
                  >
                    {content.metrics.map((metric) => (
                      <div key={metric.label} className="flex flex-col-reverse justify-end gap-1 bg-popover p-4">
                        <dt className="text-xs leading-5 text-muted-foreground">{metric.label}</dt>
                        <dd className="font-display text-2xl font-semibold tracking-tight text-signal">
                          {metric.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                {content.caseStudy ? (
                  <ol className="relative space-y-6 border-l border-border pl-6">
                    {(["challenge", "approach", "result"] as const).map((step) => (
                      <li key={step} className="relative">
                        <span
                          aria-hidden
                          className={
                            step === "result"
                              ? "absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full bg-signal ring-4 ring-signal/20"
                              : "absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/20"
                          }
                        />
                        <p className="eyebrow">{t(`caseStudy.${step}`)}</p>
                        <p className="mt-2 text-[15px] leading-7 text-foreground/90">
                          {content.caseStudy![step]}
                        </p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="rounded-2xl border border-signal/25 bg-signal/5 p-5">
                    <p className="eyebrow text-signal">{t("impactEyebrow")}</p>
                    <p className="mt-2 text-[15px] leading-7 text-foreground/90">{content.impact}</p>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-8">
                  <div>
                    <p className="eyebrow">{common("roleLabel")}</p>
                    <p className="mt-2 text-sm">{content.role}</p>
                  </div>
                  <div>
                    <p className="eyebrow">Stack</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {content.microcopy ? (
                  <p className="text-sm text-muted-foreground">{content.microcopy}</p>
                ) : null}
              </div>
            </m.article>
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 border-t border-border bg-popover px-4 py-3 sm:px-5">
          {project.liveUrl ? (
            <Button asChild size="sm">
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                {t("cta.viewProject")}
                <ArrowUpRight />
              </a>
            </Button>
          ) : null}
          {project.demoPath ? (
            <Button asChild size="sm" variant="outline">
              <a href={`/${locale}${project.demoPath}/`}>
                <PlayCircle />
                {t("cta.viewDemo")}
              </a>
            </Button>
          ) : null}
          {project.codeUrl ? (
            <Button asChild size="sm" variant="outline">
              <a href={project.codeUrl} target="_blank" rel="noreferrer">
                <Github />
                {t("cta.viewCode")}
              </a>
            </Button>
          ) : null}
          <Button size="sm" variant={project.liveUrl ? "ghost" : "default"} onClick={goToContact} className="sm:ml-auto">
            <MessageSquare />
            {project.clientProject && project.codePrivate ? t("cta.requestDemo") : t("cta.similar")}
          </Button>
        </div>
      </m.div>
    </>
  );
}
