"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Bot, Code2, Megaphone, Smartphone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import AnimatedSection from "@/components/AnimatedSection";
import { SELECT_SKILL_EVENT } from "@/components/CommandPalette";
import Container from "@/components/Container";
import { easeOutExpo } from "@/components/motion/easing";
import { useProjectModal } from "@/components/projects/ProjectProvider";
import { useProjectContent } from "@/components/projects/useProjectContent";
import SectionHeading from "@/components/SectionHeading";
import { projectsById } from "@/data/projects";
import { getSkillName, skillDomains, type SkillDomainKey } from "@/data/skills";
import { cn } from "@/lib/utils";

const domainIcons: Record<SkillDomainKey, typeof Code2> = {
  web: Code2,
  mobile: Smartphone,
  ai: Bot,
  growth: Megaphone
};

type SelectSkillDetail = { domain: SkillDomainKey; skill?: string };

export default function Skills() {
  const t = useTranslations("skills");
  const projectsT = useTranslations("projects");
  const locale = useLocale();
  const getContent = useProjectContent();
  const { openProject } = useProjectModal();
  const [domainKey, setDomainKey] = useState<SkillDomainKey>("web");
  const [skillId, setSkillId] = useState<string | null>(null);

  // Sélection pilotée depuis la palette ⌘K ou les cartes Impact
  useEffect(() => {
    const onSelect = (event: Event) => {
      const { domain, skill } = (event as CustomEvent<SelectSkillDetail>).detail;
      setDomainKey(domain);
      setSkillId(skill ?? null);
    };
    window.addEventListener(SELECT_SKILL_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SKILL_EVENT, onSelect);
  }, []);

  const domain = skillDomains.find((item) => item.key === domainKey) ?? skillDomains[0];
  const activeSkill = domain.skills.find((skill) => skill.id === skillId);

  const projectIds = useMemo(() => {
    const ids = activeSkill ? activeSkill.projects : domain.skills.flatMap((skill) => skill.projects);
    return Array.from(new Set(ids)).filter((id) => projectsById[id]);
  }, [activeSkill, domain]);

  const selectDomain = (key: SkillDomainKey) => {
    setDomainKey(key);
    setSkillId(null);
  };

  return (
    <section id="skills" className="py-14 sm:py-20">
      <Container className="space-y-8 sm:space-y-10">
        <SectionHeading index="02" eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <AnimatedSection>
          <div role="tablist" aria-label={t("eyebrow")} className="grid grid-cols-2 gap-1.5 rounded-3xl border border-border bg-card p-1.5 lg:grid-cols-4">
            {skillDomains.map((item) => {
              const Icon = domainIcons[item.key];
              const isActive = item.key === domainKey;
              return (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  id={`skills-tab-${item.key}`}
                  aria-selected={isActive}
                  aria-controls="skills-panel"
                  onClick={() => selectDomain(item.key)}
                  className={cn(
                    "relative flex items-center gap-3 rounded-[1.1rem] px-4 py-3 text-left transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive ? (
                    <m.span
                      layoutId="skills-domain"
                      className="absolute inset-0 -z-0 rounded-[1.1rem] bg-accent ring-1 ring-border"
                      transition={{ type: "spring", stiffness: 350, damping: 32 }}
                    />
                  ) : null}
                  <Icon className={cn("relative h-5 w-5 shrink-0", isActive && "text-primary")} />
                  <span className="relative min-w-0">
                    <span className="block text-sm font-medium leading-tight sm:text-base">{t(`domains.${item.key}.label`)}</span>
                    <span className="block font-mono text-[11px] text-muted-foreground">
                      {t("skillCount", { count: item.skills.length })}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        <div
          id="skills-panel"
          role="tabpanel"
          aria-labelledby={`skills-tab-${domainKey}`}
          className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
        >
          <AnimatedSection className="h-full">
            <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-5 sm:p-6">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={domainKey}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                  className="space-y-3"
                >
                  <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {t(`domains.${domainKey}.title`)}
                  </h3>
                  <p className="leading-7 text-muted-foreground">{t(`domains.${domainKey}.description`)}</p>
                  <p className="flex items-start gap-2 text-sm font-medium text-signal">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                    {t(`domains.${domainKey}.proof`)}
                  </p>
                </m.div>
              </AnimatePresence>

              <div className="mt-6 border-t border-border pt-5">
                <p className="eyebrow mb-3">{t("pickSkill")}</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    aria-pressed={!skillId}
                    onClick={() => setSkillId(null)}
                    className={cn(
                      "rounded-full border px-3.5 py-2 text-sm transition-all",
                      !skillId
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    )}
                  >
                    {t("allInDomain")}
                  </button>
                  {domain.skills.map((skill) => {
                    const isActive = skill.id === skillId;
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setSkillId(isActive ? null : skill.id)}
                        className={cn(
                          "flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-all",
                          isActive
                            ? "border-foreground bg-foreground text-background"
                            : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                        )}
                      >
                        {getSkillName(skill, locale)}
                        <span
                          className={cn(
                            "rounded-full px-1.5 font-mono text-[10px]",
                            isActive ? "bg-background/20" : "bg-accent"
                          )}
                        >
                          {skill.projects.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="h-full">
            <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-2 sm:p-3">
              <div className="flex items-center justify-between px-3 pb-2 pt-2">
                <p className="eyebrow">
                  {activeSkill ? t("provenBy", { skill: getSkillName(activeSkill, locale) }) : t("projectsTitle")}
                </p>
                <p className="font-mono text-xs text-muted-foreground" aria-live="polite">
                  {projectsT("count", { count: projectIds.length })}
                </p>
              </div>
              <m.ul layout className="space-y-1">
                <AnimatePresence mode="popLayout" initial={false}>
                  {projectIds.map((id, index) => {
                    const project = projectsById[id];
                    const content = getContent(id);
                    const metric = content.metrics[0];
                    return (
                      <m.li
                        key={id}
                        layout
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.45, delay: index * 0.04, ease: easeOutExpo }}
                      >
                        <button
                          type="button"
                          onClick={() => openProject(id)}
                          className="group flex w-full items-center gap-4 rounded-2xl p-2.5 text-left transition-colors hover:bg-accent"
                        >
                          <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                            <Image
                              src={project.image}
                              alt=""
                              fill
                              sizes="80px"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium">{content.title}</span>
                            {metric ? (
                              <span className="mt-0.5 block truncate text-sm text-muted-foreground">
                                <span className="font-semibold text-signal">{metric.value}</span> {metric.label}
                              </span>
                            ) : null}
                          </span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground" />
                        </button>
                      </m.li>
                    );
                  })}
                </AnimatePresence>
              </m.ul>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
