"use client";

import { useTranslations } from "next-intl";

export type ProjectMetric = { value: string; label: string };

export type ProjectCaseStudy = {
  challenge: string;
  approach: string;
  result: string;
};

/** Lit les textes traduits d'un projet (messages projects.items.<id>). */
export function useProjectContent() {
  const t = useTranslations("projects");

  return (id: string) => {
    const key = `items.${id}`;
    const optional = (field: string) => (t.has(`${key}.${field}`) ? t(`${key}.${field}`) : undefined);

    return {
      title: t(`${key}.title`),
      description: t(`${key}.description`),
      impact: t(`${key}.impact`),
      role: t(`${key}.role`),
      microcopy: optional("microcopy"),
      metrics: t.has(`${key}.metrics`) ? (t.raw(`${key}.metrics`) as ProjectMetric[]) : [],
      caseStudy: t.has(`${key}.caseStudy`)
        ? (t.raw(`${key}.caseStudy`) as ProjectCaseStudy)
        : undefined
    };
  };
}
