export const site = {
  name: "Ibrahim Dayende OUGDA",
  shortName: "Ibrahim Dayende",
  email: "dayendeib@gmail.com",
  // wa.me attend le numéro international sans "00" ni "+"
  whatsapp: "https://wa.me/22657760302",
  linkedin: "https://www.linkedin.com/in/ibrahimdayende",
  github: "https://github.com/Dayende-ib",
  timeZone: "Africa/Ouagadougou"
} as const;

export const sectionIds = [
  "accueil",
  "impact",
  "skills",
  "services",
  "projects",
  "about",
  "contact"
] as const;

export type SectionId = (typeof sectionIds)[number];

export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Laravel",
  "Node.js",
  "Flutter",
  "PostgreSQL",
  "Supabase",
  "MongoDB",
  "Python",
  "LLM · RAG",
  "n8n",
  "Make",
  "WhatsApp API",
  "Meta Ads",
  "Google Ads"
] as const;
