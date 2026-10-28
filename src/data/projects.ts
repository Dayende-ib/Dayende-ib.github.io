export type ProjectCategory = "web" | "mobile" | "ads" | "ia";

export type ProjectFilterKey = "all" | ProjectCategory;

/**
 * Les textes (titre, description, impact, rôle, métriques, étude de cas)
 * vivent dans messages/{fr,en}.json sous projects.items.<id>.
 */
export type Project = {
  id: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  liveUrl?: string;
  codeUrl?: string;
  /** Page de démo interne, préfixée par la locale */
  demoPath?: string;
  featured?: boolean;
  clientProject?: boolean;
  codePrivate?: boolean;
  award?: boolean;
  /** Projet réalisé dans le cadre des études */
  academic?: boolean;
  status?: "wip";
};

export const projectFilters: ProjectFilterKey[] = ["all", "web", "mobile", "ia", "ads"];

/** Études de cas mises en avant (cartes empilées), dans l'ordre d'affichage */
export const caseStudyIds = [
  "meta-ads-conversations",
  "anam-meteo-eval",
  "mindease",
  "sud-stratvision"
] as const;

export const projects: Project[] = [
  {
    id: "meta-ads-conversations",
    category: "ads",
    tags: ["Meta Ads", "Facebook Ads", "Instagram Ads", "Media Buying", "WhatsApp"],
    image: "/projects/campagne_ads.webp",
    featured: true,
    clientProject: true,
    codePrivate: true
  },
  {
    id: "anam-meteo-eval",
    category: "ia",
    tags: ["Python", "Data", "Scraping", "Météo"],
    image: "/projects/anam_meteo.webp",
    featured: true,
    award: true
  },
  {
    id: "mindease",
    category: "mobile",
    tags: ["Flutter", "TypeScript", "Supabase", "WhatsApp API", "IA"],
    image: "/projects/mindease.webp",
    liveUrl: "https://mindeasev1.vercel.app",
    demoPath: "/mindeasedemo",
    featured: true
  },
  {
    id: "sud-stratvision",
    category: "web",
    tags: ["Laravel 11", "MySQL", "Data viz", "Dashboard"],
    image: "/projects/sudstratvision.webp",
    featured: true,
    clientProject: true,
    codePrivate: true
  },
  {
    id: "propiflow",
    category: "web",
    tags: ["Node.js", "Flutter", "PostgreSQL", "React.js"],
    image: "/projects/propiflow.webp",
    academic: true,
    codeUrl: "https://github.com/Dayende-ib/rental-management",
    liveUrl: "https://propiflow.vercel.app/",
    featured: true
  },
  {
    id: "kawari-finance-app",
    category: "web",
    tags: ["React", "MongoDB", "Finance", "IA"],
    image: "/projects/kawari.webp",
    liveUrl: "https://kawari-finance-app.vercel.app/",
    codeUrl: "https://github.com/Dayende-ib/Kawari-finance-app",
    featured: true
  },
  {
    id: "clinic-appointment-scheduler",
    category: "mobile",
    tags: ["Flutter", "Express", "MongoDB", "Santé"],
    image: "/projects/caretime_clinic_appointment.png",
    academic: true,
    codeUrl: "https://github.com/Dayende-ib/clinic-appointment-scheduler",
    featured: true
  },
  {
    id: "telegram-youtube-summarizer",
    category: "ia",
    tags: ["AI Automation", "Telegram Bot", "n8n", "YouTube API", "LLM"],
    image: "/projects/n8n_automation.webp",
    codePrivate: true
  },
  {
    id: "bfa-administration-assistant",
    category: "ia",
    tags: ["RAG", "Laravel", "MySQL", "GovTech"],
    image: "/projects/rag_administration.webp",
    liveUrl: "https://huggingface.co/spaces/Dayende/frontend-rag",
    codeUrl: "https://github.com/Dayende-ib/BFA-administration-assistant"
  },
  {
    id: "make-social-automation",
    category: "ia",
    tags: ["Make", "Automation", "Social Media", "Google Sheets", "Facebook API"],
    image: "/projects/make_automation.webp",
    clientProject: true,
    codePrivate: true
  },
  {
    id: "offline-gpt",
    category: "mobile",
    tags: ["Python", "IA", "Offline", "R&D", "Mobile"],
    image: "/projects/offline_gpt.webp",
    codeUrl: "https://github.com/Dayende-ib/Offline_GPT",
    status: "wip"
  },
  {
    id: "sud-develop-website",
    category: "web",
    tags: ["HTML5", "Sass", "Bootstrap", "i18n"],
    image: "/projects/suddevelp.webp",
    liveUrl: "https://www.suddevelop.com",
    clientProject: true,
    codePrivate: true
  },
  {
    id: "cv-studio",
    category: "web",
    tags: ["React.js", "Web App", "UI/UX"],
    image: "/projects/cvstudio.webp",
    liveUrl: "https://live-cv-studio.vercel.app/"
  },
  {
    id: "gestion-bibliotheque",
    category: "web",
    tags: ["Laravel", "MySQL", "Bootstrap", "Education"],
    image: "/projects/library_management.webp",
    academic: true,
    codeUrl: "https://github.com/Dayende-ib/gestion-bibliotheque"
  },
  {
    id: "bytemarket",
    category: "web",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: "/projects/ByteMarket.webp",
    academic: true
  }
];

export const projectsById = Object.fromEntries(
  projects.map((project) => [project.id, project])
) as Record<string, Project>;
