export type SkillDomainKey = "web" | "mobile" | "ai" | "growth";

export type Skill = {
  id: string;
  /** Libellé unique, ou par locale quand il se traduit */
  name: string | { fr: string; en: string };
  /** Projets (ids de src/data/projects.ts) qui prouvent la compétence */
  projects: string[];
};

export type SkillDomain = {
  key: SkillDomainKey;
  skills: Skill[];
};

export const skillDomains: SkillDomain[] = [
  {
    key: "web",
    skills: [
      { id: "react", name: "React", projects: ["propiflow", "kawari-finance-app", "cv-studio"] },
      { id: "laravel", name: "Laravel", projects: ["sud-stratvision", "bfa-administration-assistant", "gestion-bibliotheque"] },
      { id: "node", name: "Node.js · Express", projects: ["propiflow", "clinic-appointment-scheduler"] },
      { id: "typescript", name: "TypeScript", projects: ["mindease"] },
      { id: "sql", name: "PostgreSQL · MySQL", projects: ["propiflow", "sud-stratvision", "bfa-administration-assistant", "gestion-bibliotheque"] },
      { id: "nosql", name: "MongoDB · Supabase", projects: ["kawari-finance-app", "clinic-appointment-scheduler", "mindease"] },
      { id: "dashboards", name: { fr: "Dashboards & data viz", en: "Dashboards & data viz" }, projects: ["sud-stratvision", "kawari-finance-app"] },
      { id: "frontend", name: "HTML · CSS · JS", projects: ["bytemarket", "sud-develop-website"] }
    ]
  },
  {
    key: "mobile",
    skills: [
      { id: "flutter", name: "Flutter", projects: ["mindease", "propiflow", "clinic-appointment-scheduler"] },
      { id: "api", name: { fr: "API REST & temps réel", en: "REST & real-time APIs" }, projects: ["propiflow", "clinic-appointment-scheduler", "mindease"] },
      { id: "multirole", name: { fr: "Apps multi-rôles", en: "Multi-role apps" }, projects: ["clinic-appointment-scheduler", "propiflow"] },
      { id: "on-device", name: { fr: "IA embarquée hors-ligne", en: "Offline on-device AI" }, projects: ["offline-gpt"] }
    ]
  },
  {
    key: "ai",
    skills: [
      { id: "llm", name: "LLM · Agents", projects: ["telegram-youtube-summarizer", "offline-gpt", "bfa-administration-assistant"] },
      { id: "rag", name: "RAG", projects: ["bfa-administration-assistant"] },
      { id: "n8n", name: "n8n", projects: ["telegram-youtube-summarizer"] },
      { id: "make", name: "Make", projects: ["make-social-automation"] },
      { id: "python", name: "Python · Data", projects: ["anam-meteo-eval", "offline-gpt"] },
      { id: "whatsapp", name: "WhatsApp Cloud API", projects: ["mindease"] },
      { id: "reco", name: { fr: "Recommandations IA", en: "AI recommendations" }, projects: ["mindease", "kawari-finance-app"] }
    ]
  },
  {
    key: "growth",
    skills: [
      { id: "meta-ads", name: "Meta Ads", projects: ["meta-ads-conversations"] },
      { id: "media-buying", name: "Media buying", projects: ["meta-ads-conversations"] },
      { id: "conversational", name: { fr: "Acquisition conversationnelle", en: "Conversational acquisition" }, projects: ["meta-ads-conversations", "mindease"] },
      { id: "social-automation", name: { fr: "Automatisation social media", en: "Social media automation" }, projects: ["make-social-automation"] },
      { id: "lead-gen", name: { fr: "Sites qui génèrent des leads", en: "Lead-generating websites" }, projects: ["sud-develop-website"] }
    ]
  }
];

export const getSkillName = (skill: Skill, locale: string) =>
  typeof skill.name === "string" ? skill.name : skill.name[locale === "en" ? "en" : "fr"];

export const allSkills = skillDomains.flatMap((domain) =>
  domain.skills.map((skill) => ({ ...skill, domain: domain.key }))
);
