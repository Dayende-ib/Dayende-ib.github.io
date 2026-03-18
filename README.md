# Portfolio Next.js - Ibrahim Dayende

Portfolio personnel realise avec Next.js 15 (App Router), TypeScript et Tailwind CSS. Le site presente un parcours complet (hero, stats, services, projets filtres, a propos, contact) avec animations Framer Motion et une UI responsive, disponible en FR/EN.

## Fonctionnalites
- Sections modulaires: Hero, Stats, Services, Projets, A propos, Contact.
- Projets avec badges (phare, client, en cours), roles et impacts cause -> effet.
- CTA adaptes aux liens (voir le projet, demander une demo, voir le code).
- Filtrage des projets (web, mobile, ads, ia) avec donnees centralisees.
- Version FR/EN avec detection automatique (Accept-Language) et URLs propres (/fr, /en).
- Switch de langue FR | EN dans la navbar.
- Animations progressives et gestion du "reduced motion".
- Formulaire de contact avec validation cote client et message de succes.
- Navbar sticky + navigation ancres pour desktop et mobile.

## Stack
- Next.js 15, React 19.2.0, TypeScript
- Tailwind CSS + composants UI reutilisables
- Framer Motion pour les animations
- Lucide + utilities (clsx, tailwind-merge, CVA)
- next-intl pour l'i18n

## Structure du projet
- `app/` : layout racine et styles globaux.
- `app/[locale]/` : pages localisees (FR/EN).
- `i18n.ts` : configuration next-intl + fallback FR.
- `middleware.ts` : redirection locale automatique.
- `src/components/` : sections et composants UI.
- `src/components/LanguageSwitcher.tsx` : switch de langue.
- `src/data/projects.ts` : catalogue des projets + filtres.
- `messages/` : fichiers de traduction.
- `public/projects/` : images des projets.
- `public/cv/` : CV PDF.
- `tailwind.config.ts` : theme et styles.

## Demarrage local
```bash
npm install
npm run dev
```

Ouvrir `http://localhost:3000` (redirige vers `/fr` ou `/en` selon le navigateur).

## Envoi du formulaire (email)
Integration Web3Forms cote client.
Variables d'environnement necessaires:
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`

## Personnalisation rapide
- Metadonnees et SEO: `app/[locale]/layout.tsx`.
- Hero, services, about: `src/components/Hero.tsx`, `src/components/Services.tsx`, `src/components/About.tsx`.
- Projets: `src/data/projects.ts` + textes dans `messages/`.
- Coordonnees et liens: `src/components/ContactForm.tsx`.
- Redirection locale: `middleware.ts`.
- Traductions: `messages/fr.json` et `messages/en.json`.
