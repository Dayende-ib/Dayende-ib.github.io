"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Bot, Code2, Megaphone, Smartphone, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import AnimatedSection from "@/components/AnimatedSection";
import { SELECT_SKILL_EVENT } from "@/components/CommandPalette";
import Container from "@/components/Container";
import { easeOutExpo } from "@/components/motion/easing";
import { useProjectModal } from "@/components/projects/ProjectProvider";
import { useProjectContent } from "@/components/projects/useProjectContent";
import SectionHeading from "@/components/SectionHeading";
import { projectsById } from "@/data/projects";
import { allSkills, getSkillName, skillDomains, type SkillDomain, type SkillDomainKey } from "@/data/skills";
import { cn } from "@/lib/utils";

const domainIcons: Record<SkillDomainKey, typeof Code2> = {
  web: Code2,
  mobile: Smartphone,
  ai: Bot,
  growth: Megaphone
};

// Sur desktop, deux colonnes indépendantes : déplier une carte ne crée pas de vide à côté
const columns: SkillDomainKey[][] = [
  ["web", "growth"],
  ["mobile", "ai"]
];
const mobileOrder: Record<SkillDomainKey, string> = {
  web: "order-1",
  mobile: "order-2",
  ai: "order-3",
  growth: "order-4"
};

const MAX_DEPTH = 4;
const MAX_THUMBS = 4;

type SelectSkillDetail = { domain: SkillDomainKey; skill?: string };

const uniqueProjects = (domain: SkillDomain) =>
  Array.from(new Set(domain.skills.flatMap((skill) => skill.projects))).filter((id) => projectsById[id]);

const totalProjects = new Set(allSkills.flatMap((skill) => skill.projects)).size;

function DomainCard({
  domain,
  activeSkill,
  highlighted,
  onToggleSkill
}: {
  domain: SkillDomain;
  activeSkill: string | null;
  highlighted: boolean;
  onToggleSkill: (id: string | null) => void;
}) {
  const t = useTranslations("skills");
  const locale = useLocale();
  const getContent = useProjectContent();
  const { openProject } = useProjectModal();
  const Icon = domainIcons[domain.key];
  const selected = domain.skills.find((skill) => skill.id === activeSkill);
  const proofProjects = uniqueProjects(domain);
  const panelId = `skills-proof-${domain.key}`;

  return (
    <article
      id={`skills-${domain.key}`}
      className={cn(
        "spotlight-card scroll-mt-28 rounded-3xl border bg-card p-5 transition-[border-color,box-shadow] duration-500 sm:p-6",
        mobileOrder[domain.key],
        highlighted ? "border-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.15)]" : "border-border"
      )}
    >
      <header className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="eyebrow">{t(`domains.${domain.key}.label`)}</p>
          <h3 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl">
            {t(`domains.${domain.key}.title`)}
          </h3>
        </div>
      </header>

      <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{t(`domains.${domain.key}.description`)}</p>
      <p className="mt-2 flex items-start gap-2 text-sm font-medium text-signal">
        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
        {t(`domains.${domain.key}.proof`)}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label={t("techLabel")}>
        {domain.skills.map((skill) => {
          const isActive = skill.id === activeSkill;
          const name = getSkillName(skill, locale);
          const depth = Math.min(skill.projects.length, MAX_DEPTH);
          return (
            <li key={skill.id}>
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={panelId}
                aria-label={t("skillAria", { skill: name, count: skill.projects.length })}
                onClick={() => onToggleSkill(isActive ? null : skill.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full border py-1.5 pl-3 pr-2.5 text-sm transition-all duration-200",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background/60 hover:-translate-y-0.5 hover:border-foreground/30"
                )}
              >
                {name}
                <span aria-hidden className="flex gap-0.5">
                  {Array.from({ length: MAX_DEPTH }, (_, index) => (
                    <span
                      key={index}
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-colors",
                        index < depth
                          ? isActive
                            ? "bg-background"
                            : "bg-primary"
                          : isActive
                            ? "bg-background/25"
                            : "bg-border"
                      )}
                    />
                  ))}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Preuves de la technologie sélectionnée, affichées juste sous les puces */}
      <div id={panelId} aria-live="polite">
        <AnimatePresence initial={false} mode="wait">
          {selected ? (
            <m.div
              key={selected.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-2xl border border-border bg-background/60 p-2">
                <div className="flex items-center justify-between px-2 py-1">
                  <p className="eyebrow text-[10px]">{t("provenBy", { skill: getSkillName(selected, locale) })}</p>
                  <button
                    type="button"
                    onClick={() => onToggleSkill(null)}
                    aria-label={t("close")}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <ul>
                  {selected.projects
                    .filter((id) => projectsById[id])
                    .map((id, index) => {
                      const content = getContent(id);
                      const metric = content.metrics[0];
                      return (
                        <m.li
                          key={id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.1 + index * 0.05, ease: easeOutExpo }}
                        >
                          <button
                            type="button"
                            onClick={() => openProject(id)}
                            className="group/row flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-accent"
                          >
                            <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                              <Image src={projectsById[id].image} alt="" fill sizes="56px" className="object-cover" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium">{content.title}</span>
                              {metric ? (
                                <span className="block truncate text-xs text-muted-foreground">
                                  <span className="font-semibold text-signal">{metric.value}</span> {metric.label}
                                </span>
                              ) : null}
                            </span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover/row:rotate-45 group-hover/row:text-foreground" />
                          </button>
                        </m.li>
                      );
                    })}
                </ul>
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Tous les projets du domaine, en vignettes cliquables */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
        <p className="text-xs text-muted-foreground">{t("proofLabel", { count: proofProjects.length })}</p>
        <div className="flex items-center">
          {proofProjects.slice(0, MAX_THUMBS).map((id, index) => {
            const title = getContent(id).title;
            return (
              <button
                key={id}
                type="button"
                onClick={() => openProject(id)}
                title={title}
                aria-label={title}
                className={cn(
                  "relative h-9 w-9 overflow-hidden rounded-full border-2 border-card bg-muted transition-transform duration-200 hover:z-10 hover:-translate-y-1 hover:scale-110",
                  index > 0 && "-ml-2.5"
                )}
              >
                <Image src={projectsById[id].image} alt="" fill sizes="36px" className="object-cover" />
              </button>
            );
          })}
          {proofProjects.length > MAX_THUMBS ? (
            <button
              type="button"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="-ml-2.5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-card bg-accent font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
              aria-label={t("moreProjects", { count: proofProjects.length - MAX_THUMBS })}
            >
              +{proofProjects.length - MAX_THUMBS}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function Skills() {
  const t = useTranslations("skills");
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [highlighted, setHighlighted] = useState<SkillDomainKey | null>(null);
  const highlightTimer = useRef<number | undefined>(undefined);

  // Sélection pilotée depuis la palette ⌘K ou les cartes Résultats
  useEffect(() => {
    const onSelect = (event: Event) => {
      const { domain, skill } = (event as CustomEvent<SelectSkillDetail>).detail;
      setActiveSkill(skill ?? null);
      setHighlighted(domain);
      window.clearTimeout(highlightTimer.current);
      highlightTimer.current = window.setTimeout(() => setHighlighted(null), 1800);
      requestAnimationFrame(() =>
        document.getElementById(`skills-${domain}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
      );
    };
    window.addEventListener(SELECT_SKILL_EVENT, onSelect);
    return () => {
      window.removeEventListener(SELECT_SKILL_EVENT, onSelect);
      window.clearTimeout(highlightTimer.current);
    };
  }, []);

  const domainsByKey = Object.fromEntries(skillDomains.map((domain) => [domain.key, domain])) as Record<
    SkillDomainKey,
    SkillDomain
  >;

  const summary = [
    { value: allSkills.length, label: t("summary.technologies") },
    { value: totalProjects, label: t("summary.projects") },
    { value: skillDomains.length, label: t("summary.domains") }
  ];

  return (
    <section id="skills" className="py-14 sm:py-20">
      <Container className="space-y-8 sm:space-y-10">
        <SectionHeading
          index="02"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          aside={
            <dl className="flex gap-6 sm:gap-8">
              {summary.map((item) => (
                <div key={item.label} className="flex flex-col-reverse justify-end">
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd className="font-display text-3xl font-semibold tracking-tight">{item.value}</dd>
                </div>
              ))}
            </dl>
          }
        />

        <AnimatedSection>
          <p className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            <span aria-hidden className="flex gap-0.5">
              {[true, true, true, false].map((filled, index) => (
                <span key={index} className={cn("h-1.5 w-1.5 rounded-full", filled ? "bg-primary" : "bg-border")} />
              ))}
            </span>
            {t("legend")}
          </p>
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start">
            {columns.map((column, index) => (
              <div key={index} className="contents lg:flex lg:flex-col lg:gap-4">
                {column.map((key) => (
                  <DomainCard
                    key={key}
                    domain={domainsByKey[key]}
                    activeSkill={activeSkill}
                    highlighted={highlighted === key}
                    onToggleSkill={setActiveSkill}
                  />
                ))}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
