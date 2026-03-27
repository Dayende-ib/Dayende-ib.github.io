  export type ProjectCategory = "web" | "mobile" | "ads" | "ia";

export type ProjectFilterKey = "all" | ProjectCategory;

export type ProjectFilter = {
  key: ProjectFilterKey;
  label: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  role: string;
  impact: string;
  image: string;
  liveUrl?: string;
  codeUrl?: string;
  blurDataURL: string;
  featured?: boolean;
  clientProject?: boolean;
  codePrivate?: boolean;
  status?: "wip";
  ctaSecondary?: { label: string; href: string };
  microcopy?: string;
  codeLabel?: string;
};

export const projectFilters: ProjectFilter[] = [
  { key: "all", label: "Tous" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
  { key: "ads", label: "Ads" },
  { key: "ia", label: "IA" }
];

const blurDataUrls = [
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMicgaGVpZ2h0PScyMCc+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSdnJyB4MT0nMCcgeDI9JzEnIHkxPScwJyB5Mj0nMSc+PHN0b3Agc3RvcC1jb2xvcj0nIzdDM0FFRCcvPjxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nIzIyRDNFRScvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSczMicgaGVpZ2h0PScyMCcgZmlsbD0ndXJsKCNnKScvPjwvc3ZnPg==",
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMicgaGVpZ2h0PScyMCc+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSdnJyB4MT0nMCcgeDI9JzEnIHkxPScwJyB5Mj0nMSc+PHN0b3Agc3RvcC1jb2xvcj0nIzIyRDNFRScvPjxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nI0Y0NzJCNicvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSczMicgaGVpZ2h0PScyMCcgZmlsbD0ndXJsKCNnKScvPjwvc3ZnPg==",
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMicgaGVpZ2h0PScyMCc+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSdnJyB4MT0nMCcgeDI9JzEnIHkxPScwJyB5Mj0nMSc+PHN0b3Agc3RvcC1jb2xvcj0nIzdDM0FFRCcvPjxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nI0Y0NzJCNicvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSczMicgaGVpZ2h0PScyMCcgZmlsbD0ndXJsKCNnKScvPjwvc3ZnPg==",
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMicgaGVpZ2h0PScyMCc+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSdnJyB4MT0nMCcgeDI9JzEnIHkxPScwJyB5Mj0nMSc+PHN0b3Agc3RvcC1jb2xvcj0nIzBFQTVFOScvPjxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nIzdDM0FFRCcvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSczMicgaGVpZ2h0PScyMCcgZmlsbD0ndXJsKCNnKScvPjwvc3ZnPg==",
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMicgaGVpZ2h0PScyMCc+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSdnJyB4MT0nMCcgeDI9JzEnIHkxPScwJyB5Mj0nMSc+PHN0b3Agc3RvcC1jb2xvcj0nI0Y0NzJCNicvPjxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nIzdDM0FFRCcvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSczMicgaGVpZ2h0PScyMCcgZmlsbD0ndXJsKCNnKScvPjwvc3ZnPg==",
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMicgaGVpZ2h0PScyMCc+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSdnJyB4MT0nMCcgeDI9JzEnIHkxPScwJyB5Mj0nMSc+PHN0b3Agc3RvcC1jb2xvcj0nIzIyRDNFRScvPjxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nIzBFQTVFOScvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSczMicgaGVpZ2h0PScyMCcgZmlsbD0ndXJsKCNnKScvPjwvc3ZnPg==",
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMicgaGVpZ2h0PScyMCc+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSdnJyB4MT0nMCcgeDI9JzEnIHkxPScwJyB5Mj0nMSc+PHN0b3Agc3RvcC1jb2xvcj0nIzdDM0FFRCcvPjxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nIzIyRDNFRScvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSczMicgaGVpZ2h0PScyMCcgZmlsbD0ndXJsKCNnKScvPjwvc3ZnPg==",
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMicgaGVpZ2h0PScyMCc+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSdnJyB4MT0nMCcgeDI9JzEnIHkxPScwJyB5Mj0nMSc+PHN0b3Agc3RvcC1jb2xvcj0nIzIyRDNFRScvPjxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nI0Y0NzJCNicvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSczMicgaGVpZ2h0PScyMCcgZmlsbD0ndXJsKCNnKScvPjwvc3ZnPg=="
];

export const projects: Project[] = [
  {
    id: "meta-ads-conversations",
    title: "Campagnes Meta Ads - Génération de conversations & engagement",
    description:
      "Gestion et optimisation de campagnes Facebook & Instagram orientées conversations WhatsApp & Messenger et engagement. Budgets quotidiens et globaux, suivi CPC, coût par conversation, couverture, impressions et optimisations continues.",
    category: "ads",
    tags: ["Meta Ads", "Facebook Ads", "Instagram Ads", "Media Buying", "WhatsApp"],
    role: "Media Buyer & Campaign Manager",
    impact:
      "Impact: +3 600 000 impressions, 577 000+ Personnes touchées -> visibilité accrue; 5 000+ conversations WhatsApp & Messenger -> engagement direct; coût par conversation jusqu'à 0,18 $.",
    image: "/projects/campagne_ads.webp",
    blurDataURL: blurDataUrls[2],
    featured: false,
    clientProject: true,
    codePrivate: true
  },
  {
    id: "kawari-finance-app",
    title: "Kawari Finance App",
    description:
      "Application de gestion financière pour suivre les dépenses, revenus et visualiser le budget avec une IA financière.",
    category: "web",
    tags: ["React", "MongoDB", "Finance", "IA"],
    role: "End-to-end (solo)",
    impact:
      "Impact: visualisation budgétaire -> décisions plus claires; recommandations IA -> meilleure discipline financière.",
    image: "/projects/kawari.webp",
    liveUrl: "https://kawari-finance-app.vercel.app/",
    codeUrl: "https://github.com/Dayende-ib/Kawari-finance-app",
    blurDataURL: blurDataUrls[5],
    featured: true
  },
  {
    id: "sud-stratvision",
    title: "SUD-StratVision - Logiciel de Pilotage Stratégique",
    description:
      "Logiciel de pilotage stratégique centralisant objectifs, performances, congés, formations et missions via un tableau de bord interactif.",
    category: "web",
    tags: ["Laravel 11", "MySQL", "Data viz", "Dashboard"],
    role: "Full-stack & integration",
    impact:
      "Impact: centralisation des objectifs -> décisions plus rapides; suivi RH -> gestion optimisée.",
    image: "/projects/sudstratvision.webp",
    blurDataURL: blurDataUrls[0],
    featured: true,
    clientProject: true,
    codePrivate: true
  },
  {
    id: "clinic-appointment-scheduler",
    title: "Clinic Appointment Scheduler",
    description:
      "Application mobile pour la prise, la gestion et le suivi des rendez-vous médicaux côté patients, médecins et administrateurs.",
    category: "mobile",
    tags: ["Flutter", "Express", "MongoDB", "Sante"],
    role: "Mobile & API integration",
    impact:
      "Impact: digitalisation des rendez-vous -> parcours patient fluidifié; suivi en temps réel -> coordination clinique renforcée.",
    image: "/projects/caretime_clinic_appointment.png",
    codeUrl: "https://github.com/Dayende-ib/clinic-appointment-scheduler",
    blurDataURL: blurDataUrls[1],
    featured: true
  },
  {
    id: "offline-gpt",
    title: "Offline GPT",
    description:
      "Projet de recherche visant à exécuter un assistant de type GPT en environnement local, sans connexion Internet.",
    category: "mobile",
    tags: ["Python", "IA", "Offline", "R&D", "Mobile"],
    role: "End-to-end (solo)",
    impact:
      "Impact: solutions IA hors ligne -> accessibilité accrue en contexte de faible connectivité.",
    image: "/projects/offline_gpt.webp",
    codeUrl: "https://github.com/Dayende-ib/Offline_GPT",
    blurDataURL: blurDataUrls[3],
    status: "wip",
    ctaSecondary: { label: "Discuter du projet", href: "#contact" },
    microcopy: "Projet en cours - contributions et retours bienvenus.",
    codeLabel: "Voir le code"
  },
  {
    id: "make-social-automation",
    title: "Automatisation de publication Social Media (Facebook & Instagram)",
    description:
      "Automatisation complète de publication via Make, depuis Google Sheets vers Facebook Pages et Instagram Business, avec mise à jour de statut.",
    category: "ia",
    tags: ["Make", "Automation", "Social Media", "Google Sheets", "Facebook API"],
    role: "Automation Specialist & Developer",
    impact:
      "Impact: gain de temps massif -> opérations rapides; réduction des erreurs -> qualité stable; publication multi-plateformes -> workflow scalable.",
    image: "/projects/make_automation.webp",
    blurDataURL: blurDataUrls[4],
    clientProject: true,
    codePrivate: true
  },
  {
    id: "telegram-youtube-summarizer",
    title: "Bot Telegram IA - Résumé automatique de vidéos YouTube",
    description:
      "Bot Telegram détectant les liens YouTube, récupérant la transcription, nettoyant le texte, générant un résumé IA et renvoyant une réponse claire.",
    category: "ia",
    tags: ["AI Automation", "Telegram Bot", "n8n", "YouTube API", "LLM"],
    role: "IA Developer & Automation Engineer",
    impact:
      "Impact: résumés automatisés -> gain de temps; veille accélérée -> apprentissage efficace; architecture modulaire -> évolution facile.",
    image: "/projects/n8n_automation.webp",
    blurDataURL: blurDataUrls[1],
    featured: true,
    codePrivate: true
  },
  {
    id: "bfa-administration-assistant",
    title: "BFA Administration Assistant",
    description:
      "Assistant administratif numérique facilitant la gestion des tâches et données administratives dans un contexte institutionnel local.",
    category: "web",
    tags: ["Laravel", "MySQL", "GovTech"],
    role: "End-to-end (solo)",
    impact:
      "Impact: réduction des tâches manuelles -> gain de temps agents; processus formalisés -> service plus fiable.",
    image: "/projects/rag_administration.webp",
    liveUrl: "https://huggingface.co/spaces/Dayende/frontend-rag",
    codeUrl: "https://github.com/Dayende-ib/BFA-administration-assistant",
    blurDataURL: blurDataUrls[4]
  },
  {
    id: "sud-develop-website",
    title: "SUD Develop Website",
    description:
      "Site web corporate multilingue présentant les divisions, produits, actualités et services avec un module de demande de devis.",
    category: "web",
    tags: ["HTML5", "Sass", "Bootstrap", "i18n"],
    role: "Full-stack & integration",
    impact:
      "Impact: visibilité digitale renforcée -> demandes qualifiées; offre clarifiée -> conversion améliorée.",
    image: "/projects/suddevelp.webp",
    liveUrl: "https://www.suddevelop.com",
    blurDataURL: blurDataUrls[2],
    clientProject: true,
    codePrivate: true
  },
  {
    id: "anam-meteo-eval",
    title: "ANAM Meteo Eval",
    description:
      "Projet d'analyse et d'évaluation des données météo pour mesurer leur qualité, fiabilité et cohérence.",
    category: "ia",
    tags: ["Python", "Data", "Scraping", "Meteo"],
    role: "End-to-end (solo)",
    impact:
      "Impact: évaluation continue -> qualité des données améliorée; indicateurs fiables -> décisions climatiques plus solides.",
    image: "/projects/anam_meteo.webp",
    blurDataURL: blurDataUrls[3]
  },
  {
    id: "cv-studio",
    title: "CV Studio",
    description:
      "Application web permettant de créer et personnaliser des CV modernes via une interface interactive.",
    category: "web",
    tags: ["React.js", "Web App", "UI/UX"],
    role: "End-to-end (solo)",
    impact:
      "Impact: valorisation des profils -> employabilité renforcée; création guidée -> expérience utilisateur fluide.",
    image: "/projects/cvstudio.webp",
    liveUrl: "https://live-cv-studio.vercel.app/",
    blurDataURL: blurDataUrls[0],
    featured: true
  },
  {
    id: "gestion-bibliotheque",
    title: "Gestion de Bibliotheque",
    description:
      "Système de gestion de bibliothèque permettant le suivi des livres, emprunts et utilisateurs via une interface sécurisée.",
    category: "web",
    tags: ["Laravel", "MySQL", "Bootstrap", "Education"],
    role: "End-to-end (solo)",
    impact:
      "Impact: suivi des emprunts -> réduction des pertes; opérations automatisées -> gain de temps.",
    image: "/projects/library_management.webp",
    codeUrl: "https://github.com/Dayende-ib/gestion-bibliotheque",
    blurDataURL: blurDataUrls[7]
  },
  {
    id: "bytemarket",
    title: "ByteMarket",
    description:
      "Site e-commerce développé en HTML/CSS/JS vanilla, avec une navigation produits claire et une expérience d'achat fluide.",
    category: "web",
    tags: ["HTML5", "CSS3", "JavaScript"],
    role: "End-to-end (solo)",
    impact:
      "Impact: parcours d'achat simplifié -> conversion accrue; catalogue clair -> navigation rapide.",
    image: "/projects/ByteMarket.webp",
    blurDataURL: blurDataUrls[6]
  }
];