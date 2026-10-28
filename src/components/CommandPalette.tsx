"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  ArrowRight,
  AtSign,
  Code2,
  CornerDownLeft,
  FolderOpen,
  Github,
  Hash,
  Languages,
  Linkedin,
  MessageCircle,
  Moon,
  Search
} from "lucide-react";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";

import { trackEvent } from "@/components/Analytics";
import { easeOutExpo } from "@/components/motion/easing";
import { useProjectModal } from "@/components/projects/ProjectProvider";
import { buildLocalePath, rememberLocale } from "@/components/LanguageSwitcher";
import { toast } from "@/components/Toaster";
import { projects } from "@/data/projects";
import { sectionIds, site } from "@/data/site";
import { allSkills, getSkillName } from "@/data/skills";
import { cn } from "@/lib/utils";

export const OPEN_PALETTE_EVENT = "portfolio:open-palette";
export const SELECT_SKILL_EVENT = "portfolio:select-skill";

export const openCommandPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));

type Group = "sections" | "projects" | "skills" | "actions";

type Command = {
  id: string;
  group: Group;
  label: string;
  hint?: string;
  keywords: string;
  icon: ComponentType<{ className?: string }>;
  run: () => void;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const scrollToSection = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function CommandPalette() {
  const t = useTranslations("palette");
  const nav = useTranslations("navbar.links");
  const projectsT = useTranslations("projects");
  const skillsT = useTranslations("skills");
  const common = useTranslations("common");
  const locale = useLocale();
  const { resolvedTheme, setTheme } = useTheme();
  const { openProject } = useProjectModal();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const show = useCallback(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    returnFocusRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isTyping = target.closest("input, textarea, [contenteditable=true]");
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) hide();
        else show();
      } else if (event.key === "/" && !isTyping && !open) {
        event.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_PALETTE_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_PALETTE_EVENT, show);
    };
  }, [open, show, hide]);

  const commands = useMemo<Command[]>(() => {
    const otherLocale = locale === "fr" ? "en" : "fr";
    const external = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");

    return [
      ...sectionIds.map((id) => ({
        id: `section-${id}`,
        group: "sections" as const,
        label: nav(id === "accueil" ? "home" : id),
        keywords: id,
        icon: Hash,
        run: () => scrollToSection(id)
      })),
      ...projects.map((project) => ({
        id: `project-${project.id}`,
        group: "projects" as const,
        label: projectsT(`items.${project.id}.title`),
        hint: projectsT(`categories.${project.category}`),
        keywords: project.tags.join(" "),
        icon: FolderOpen,
        run: () => openProject(project.id)
      })),
      ...allSkills.map((skill) => ({
        id: `skill-${skill.id}`,
        group: "skills" as const,
        label: getSkillName(skill, locale),
        hint: t("skillHint", { count: skill.projects.length }),
        keywords: skillsT(`domains.${skill.domain}.label`),
        icon: Code2,
        run: () => {
          scrollToSection("skills");
          window.dispatchEvent(
            new CustomEvent(SELECT_SKILL_EVENT, { detail: { domain: skill.domain, skill: skill.id } })
          );
        }
      })),
      {
        id: "action-email",
        group: "actions",
        label: t("actions.copyEmail"),
        hint: site.email,
        keywords: "email mail contact",
        icon: AtSign,
        run: async () => {
          try {
            await navigator.clipboard.writeText(site.email);
            toast(common("emailCopied"));
            trackEvent("contact-email-copy");
          } catch {
            window.location.href = `mailto:${site.email}`;
          }
        }
      },
      {
        id: "action-whatsapp",
        group: "actions",
        label: t("actions.whatsapp"),
        keywords: "whatsapp message contact",
        icon: MessageCircle,
        run: external(site.whatsapp)
      },
      {
        id: "action-linkedin",
        group: "actions",
        label: t("actions.linkedin"),
        keywords: "linkedin cv",
        icon: Linkedin,
        run: external(site.linkedin)
      },
      {
        id: "action-github",
        group: "actions",
        label: t("actions.github"),
        keywords: "github code",
        icon: Github,
        run: external(site.github)
      },
      {
        id: "action-theme",
        group: "actions",
        label: t("actions.theme"),
        keywords: "theme dark light sombre clair",
        icon: Moon,
        run: () => setTheme(resolvedTheme === "light" ? "dark" : "light")
      },
      {
        id: "action-language",
        group: "actions",
        label: t("actions.language"),
        keywords: "langue language english francais",
        icon: Languages,
        run: () => {
          rememberLocale(otherLocale);
          window.location.href = buildLocalePath(window.location.pathname, otherLocale);
        }
      }
    ];
  }, [locale, nav, projectsT, skillsT, t, common, openProject, resolvedTheme, setTheme]);

  const filtered = useMemo(() => {
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    if (!tokens.length) return commands;
    return commands.filter((command) => {
      const haystack = normalize(`${command.label} ${command.hint ?? ""} ${command.keywords}`);
      return tokens.every((token) => haystack.includes(token));
    });
  }, [commands, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const runCommand = (command: Command) => {
    setOpen(false);
    // Laisse la palette se fermer avant de déclencher l'action
    requestAnimationFrame(() => command.run());
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && filtered[activeIndex]) {
      event.preventDefault();
      runCommand(filtered[activeIndex]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      hide();
    } else if (event.key === "Tab") {
      event.preventDefault();
    }
  };

  const groups = (["sections", "projects", "skills", "actions"] as const)
    .map((group) => ({
      group,
      items: filtered.filter((command) => command.group === group)
    }))
    .filter(({ items }) => items.length);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <m.div
            key="palette-backdrop"
            className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={hide}
            aria-hidden
          />
          <m.div
            key="palette"
            role="dialog"
            aria-modal="true"
            aria-label={t("trigger")}
            className="fixed inset-x-3 top-[10vh] z-[101] mx-auto flex max-h-[70vh] max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl shadow-black/40"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder={t("placeholder")}
                className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={filtered[activeIndex] ? `palette-${filtered[activeIndex].id}` : undefined}
                aria-autocomplete="list"
              />
              <kbd className="hidden rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
                ESC
              </kbd>
            </div>

            <div ref={listRef} id="palette-list" role="listbox" className="flex-1 overflow-y-auto p-2">
              {groups.length === 0 ? (
                <p className="px-3 py-10 text-center text-sm text-muted-foreground">
                  {t("empty", { query })}
                </p>
              ) : (
                groups.map(({ group, items }) => (
                  <div key={group} role="group" aria-label={t(`groups.${group}`)} className="pb-2">
                    <p className="eyebrow px-3 pb-1.5 pt-2 text-[10px]">{t(`groups.${group}`)}</p>
                    {items.map((command) => {
                      const index = filtered.indexOf(command);
                      const isActive = index === activeIndex;
                      const Icon = command.icon;
                      return (
                        <div
                          key={command.id}
                          id={`palette-${command.id}`}
                          role="option"
                          aria-selected={isActive}
                          data-index={index}
                          onPointerMove={() => setActiveIndex(index)}
                          onClick={() => runCommand(command)}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                            isActive ? "bg-accent text-foreground" : "text-muted-foreground"
                          )}
                        >
                          <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
                          <span className="min-w-0 flex-1 truncate">{command.label}</span>
                          {command.hint ? (
                            <span className="hidden shrink-0 font-mono text-[11px] text-muted-foreground sm:block">
                              {command.hint}
                            </span>
                          ) : null}
                          <ArrowRight
                            className={cn("h-3.5 w-3.5 shrink-0 transition-opacity", isActive ? "opacity-100" : "opacity-0")}
                          />
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="hidden items-center gap-4 border-t border-border px-4 py-2.5 font-mono text-[10px] text-muted-foreground sm:flex">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-border px-1">↑↓</kbd>
                {t("hints.navigate")}
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-border px-1">
                  <CornerDownLeft className="inline h-2.5 w-2.5" />
                </kbd>
                {t("hints.select")}
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-border px-1">esc</kbd>
                {t("hints.close")}
              </span>
            </div>
          </m.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
