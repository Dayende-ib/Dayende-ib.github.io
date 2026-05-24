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
  caseStudy?: {
    challenge: string;
    approach: string;
    result: string;
  };
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
      "Des campagnes Facebook & Instagram conçues pour déclencher de vraies conversations, pas juste des clics. 5 000+ échanges WhatsApp & Messenger générés, coût par conversation descendu à 0,18 $.",
    category: "ads",
    tags: ["Meta Ads", "Facebook Ads", "Instagram Ads", "Media Buying", "WhatsApp"],
    role: "Media Buying & Stratégie Ads",
    impact:
      "Impact: +3 600 000 impressions, 577 000+ Personnes touchées -> visibilité accrue; 5 000+ conversations WhatsApp & Messenger -> engagement direct; coût par conversation jusqu'à 0,18 $.",
    image: "/projects/campagne_ads.webp",
    blurDataURL: blurDataUrls[2],
    featured: false,
    clientProject: true,
    codePrivate: true
  },
  {
    id: "mindease",
    title: "MindEase – Plateforme Digitale de Soutien Émotionnel Préventif",
    description:
      "L'accès au soutien psychologique reste rare et souvent inadapté en Afrique de l'Ouest. MindEase propose un suivi émotionnel et des recommandations IA accessibles via mobile, web et WhatsApp - là où les gens sont déjà.",
    category: "mobile",
    tags: ["Flutter", "TypeScript", "Supabase", "WhatsApp API", "IA"],
    role: "Conception & développement",
    impact:
      "Impact: soutien psychologique accessible via 3 canaux (mobile, web, WhatsApp); recommandations IA personnalisées -> meilleure gestion du stress; contenus adaptés aux réalités locales -> adoption accrue.",
    image: "/projects/mindease.webp",
    liveUrl: "https://mindeasev1.vercel.app",
    blurDataURL: blurDataUrls[5],
    featured: true,
    caseStudy: {
      challenge:
        "Le soutien en santé mentale est quasi inexistant ou inadapté en Afrique de l'Ouest : outils trop occidentaux, barrières culturelles, faible accessibilité mobile et manque de ressources contextualisées.",
      approach:
        "Plateforme multi-canal (Flutter + web bêta + WhatsApp Cloud API) avec backend TypeScript/Supabase, suivi émotionnel interactif et IA pour personnaliser les recommandations selon le profil et le contexte local.",
      result:
        "Solution préventive accessible sans installation via WhatsApp, version web bêta ouverte, app mobile intuitive - avec une approche centrée sur l'utilisateur et les réalités communautaires locales."
    }
  },
    {
    id: "propiflow",
    title: "Propiflow - Système de Gestion Locative Intelligent",
    description:
      "Finis les tableurs épars et les appels pour rappeler les loyers. Propiflow centralise biens, locataires, contrats et maintenance dans un seul outil - avec une app mobile dédiée aux locataires.",
    category: "web",
    tags: ["Node.js", "Flutter", "PostgreSQL", "React.js"],
    role: "Conception & développement",
    impact:
      "Impact: gestion centralisée -> zéro tableur dispersé; app mobile locataires -> communication fluide; automatisation administrative -> gain de temps opérationnel.",
    image: "/projects/propiflow.webp",
    codeUrl: "https://github.com/Dayende-ib/rental-management",
    liveUrl: "https://propiflow.vercel.app/",
    blurDataURL: blurDataUrls[3],
    featured: true,
    caseStudy: {
      challenge:
        "La gestion locative reposait sur des tableurs épars, des appels téléphoniques et des contrats papier - aucun outil unifié pour propriétaires, gestionnaires et locataires.",
      approach:
        "Plateforme full-stack avec dashboard web d'administration (biens, locataires, contrats, loyers, maintenance) et application mobile Flutter pour les locataires.",
      result:
        "Gestion locative entièrement digitalisée : tâches administratives automatisées, suivi en temps réel des interventions et communication centralisée entre toutes les parties."
    }
  },
  {
    id: "kawari-finance-app",
    title: "Kawari Finance App",
    description:
      "Savoir ce qu'on dépense, c'est un début. Comprendre pourquoi et décider autrement, c'est là que Kawari intervient - visualisation des flux financiers et recommandations IA actionnables.",
    category: "web",
    tags: ["React", "MongoDB", "Finance", "IA"],
    role: "Conception & développement",
    impact:
      "Impact: visualisation budgétaire -> décisions plus claires; recommandations IA -> meilleure discipline financière.",
    image: "/projects/kawari.webp",
    liveUrl: "https://kawari-finance-app.vercel.app/",
    codeUrl: "https://github.com/Dayende-ib/Kawari-finance-app",
    blurDataURL: blurDataUrls[5],
    featured: true,
    caseStudy: {
      challenge: "Les utilisateurs n'avaient aucune visibilité sur leurs flux financiers réels et prenaient des décisions de dépenses sans données fiables.",
      approach: "Interface React centrée sur la lisibilité, avec une couche IA qui analyse les tendances de dépenses et génère des recommandations personnalisées.",
      result: "Visualisation budgétaire en temps réel et conseils IA actionnables pour une meilleure discipline financière."
    }
  },
  {
    id: "sud-stratvision",
    title: "SUD-StratVision - Logiciel de Pilotage Stratégique",
    description:
      "Quand les objectifs sont dans Excel et les missions par email, les décisions arrivent trop tard. SUD-StratVision regroupe tout en un dashboard : objectifs, performances, RH, congés et formations.",
    category: "web",
    tags: ["Laravel 11", "MySQL", "Data viz", "Dashboard"],
    role: "Développement full-stack",
    impact:
      "Impact: centralisation des objectifs -> décisions plus rapides; suivi RH -> gestion optimisée.",
    image: "/projects/sudstratvision.webp",
    blurDataURL: blurDataUrls[0],
    featured: true,
    clientProject: true,
    codePrivate: true,
    caseStudy: {
      challenge: "L'organisation utilisait des fichiers Excel dispersés pour suivre objectifs, congés et formations - aucune vue consolidée pour les décideurs.",
      approach: "Dashboard Laravel avec modules interconnectés (objectifs, RH, missions), contrôle d'accès par rôle et visualisations de données temps réel.",
      result: "Centralisation complète du pilotage, adoption immédiate par les équipes et décisions plus rapides grâce à des données fiables et accessibles."
    }
  },
  {
    id: "clinic-appointment-scheduler",
    title: "Clinic Appointment Scheduler",
    description:
      "Gérer les rendez-vous médicaux par téléphone, c'est des oublis, des conflits de planning et du stress de part et d'autre. Cette app Flutter offre une vue commune en temps réel à patients, médecins et admins.",
    category: "mobile",
    tags: ["Flutter", "Express", "MongoDB", "Sante"],
    role: "Développement mobile & API",
    impact:
      "Impact: digitalisation des rendez-vous -> parcours patient fluidifié; suivi en temps réel -> coordination clinique renforcée.",
    image: "/projects/caretime_clinic_appointment.png",
    codeUrl: "https://github.com/Dayende-ib/clinic-appointment-scheduler",
    blurDataURL: blurDataUrls[1],
    featured: true,
    caseStudy: {
      challenge: "La gestion des rendez-vous par téléphone et papier entraînait des oublis, des conflits de planning et une mauvaise coordination entre médecins et patients.",
      approach: "Application Flutter multi-rôles (patient, médecin, admin) avec une API Express/MongoDB gérant notifications, historiques et disponibilités en temps réel.",
      result: "Parcours de prise de rendez-vous entièrement digitalisé, réduction des conflits de planning et meilleure coordination clinique."
    }
  },
  {
    id: "offline-gpt",
    title: "Offline GPT",
    description:
      "Et si un assistant IA fonctionnait sans connexion internet ? Ce projet R&D explore l'exécution locale d'un LLM sur mobile - une piste concrète pour rendre l'IA accessible là où la connectivité n'est pas garantie.",
    category: "mobile",
    tags: ["Python", "IA", "Offline", "R&D", "Mobile"],
    role: "Conception & développement",
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
      "Publier manuellement sur Facebook et Instagram chaque semaine, c'est du temps perdu. Ce pipeline Make lit un Google Sheet, publie automatiquement sur les deux plateformes et met à jour le statut sans intervention humaine.",
    category: "ia",
    tags: ["Make", "Automation", "Social Media", "Google Sheets", "Facebook API"],
    role: "Développement & Automatisation",
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
      "On envoie un lien YouTube dans le bot, on reçoit un résumé clair en quelques secondes. Plus besoin de regarder une vidéo de 40 minutes pour en extraire l'essentiel.",
    category: "ia",
    tags: ["AI Automation", "Telegram Bot", "n8n", "YouTube API", "LLM"],
    role: "IA & Automatisation",
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
      "Un assistant RAG entraîné sur de vrais documents administratifs pour répondre aux questions des agents en quelques secondes. Conçu pour un contexte institutionnel local où les procédures changent souvent.",
    category: "web",
    tags: ["Laravel", "MySQL", "GovTech"],
    role: "Conception & développement",
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
      "Premier point de contact digital entre SUD Develop et ses clients potentiels. Site corporate multilingue avec présentation des divisions, actualités et module de demande de devis directement intégré.",
    category: "web",
    tags: ["HTML5", "Sass", "Bootstrap", "i18n"],
    role: "Développement full-stack",
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
      "Construit en 48 heures lors du Hackathon IA 2025, puis livré à l'Agence Nationale de la Météo du Burkina Faso. Il évalue automatiquement la qualité des données météorologiques avec des indicateurs fiables.",
    category: "ia",
    tags: ["Python", "Data", "Scraping", "Meteo"],
    role: "Conception & développement",
    impact:
      "Impact: évaluation continue -> qualité des données améliorée; indicateurs fiables -> décisions climatiques plus solides.",
    image: "/projects/anam_meteo.webp",
    blurDataURL: blurDataUrls[3]
  },
  {
    id: "cv-studio",
    title: "CV Studio",
    description:
      "Construire un CV qui se démarque ne devrait pas prendre une journée entière. CV Studio guide l'utilisateur étape par étape pour produire un document moderne et personnalisé - sans Word, sans galère.",
    category: "web",
    tags: ["React.js", "Web App", "UI/UX"],
    role: "Conception & développement",
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
      "Une bibliothèque bien gérée, ce sont des livres qui circulent vraiment. Ce système Laravel/MySQL suit les emprunts, les retours et les utilisateurs - avec des alertes automatiques pour éviter les pertes.",
    category: "web",
    tags: ["Laravel", "MySQL", "Bootstrap", "Education"],
    role: "Conception & développement",
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
      "Un site e-commerce construit de zéro en HTML/CSS/JS pur, sans framework. Un exercice volontaire pour maîtriser les fondamentaux du web avant d'aborder les stacks modernes.",
    category: "web",
    tags: ["HTML5", "CSS3", "JavaScript"],
    role: "Conception & développement",
    impact:
      "Impact: parcours d'achat simplifié -> conversion accrue; catalogue clair -> navigation rapide.",
    image: "/projects/ByteMarket.webp",
    blurDataURL: blurDataUrls[6]
  }
];