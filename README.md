# Portfolio Next.js - Ibrahim Dayende

Portfolio personnel réalisé avec Next.js (App Router, export statique), TypeScript, Tailwind CSS et Framer Motion, disponible en FR/EN et déployé sur GitHub Pages. Le parcours est pensé « résultats d'abord » : chaque compétence et chaque chiffre renvoie au projet qui le prouve.

## Fonctionnalités
- Parcours : Hero → Résultats → Compétences → Services & méthode → Études de cas → À propos → Témoignages → Articles → Contact.
- **Résultats** : bento de chiffres clés animés, chaque carte ouvre le projet correspondant.
- **Explorateur de compétences** : domaine → technologie → projets qui la prouvent (avec leur métrique principale).
- **Études de cas** empilées au scroll (desktop) avec défi / approche / résultat et métriques.
- **Fiche projet** accessible (focus piégé, Échap, flèches ← → pour naviguer) et partageable via `#project-<id>`.
- **Palette de commandes** (`Ctrl/⌘ K` ou `/`) : sections, projets, compétences, copier l'email, thème, langue.
- Formulaire de contact (Web3Forms) avec type de projet, pré-rempli depuis une fiche projet.
- Thème clair par défaut (bascule sombre mémorisée), tokens CSS, respect de `prefers-reduced-motion`.
- `/` affiche directement la version française, sans écran de redirection ; seuls les visiteurs anglophones (préférence enregistrée ou navigateur en anglais sans français) sont renvoyés vers `/en/` avant l'affichage (`src/components/EnglishRedirect.tsx`).
- Navigation avec section active, menu mobile plein écran, lien d'évitement clavier.

## Stack
- Next.js 16, React 19, TypeScript
- Tailwind CSS (tokens HSL dans `app/globals.css`) + composants UI (CVA)
- Framer Motion (chargé une fois via `LazyMotion`)
- next-intl pour l'i18n, next-themes pour le thème
- Polices : Inter, Bricolage Grotesque (titres), JetBrains Mono (libellés)

## Structure du projet
- `app/[locale]/page.tsx` : assemblage des sections.
- `src/components/sections/` : une section par fichier.
- `src/components/projects/` : fiche projet (`ProjectProvider`), études de cas, archive filtrable.
- `src/components/motion/` : primitives d'animation (révélation de texte, compteurs, marquee, effet magnétique...).
- `src/components/CommandPalette.tsx` : palette `Ctrl/⌘ K`.
- `src/data/projects.ts` : catalogue des projets (liens, tags, études de cas mises en avant).
- `src/data/skills.ts` : compétences par domaine, reliées aux projets.
- `src/data/site.ts` : coordonnées, sections, stack affichée.
- `messages/` : tous les textes FR/EN, y compris métriques et études de cas des projets.

## Démarrage local
```bash
npm install
npm run dev
```

Ouvrir `http://localhost:3000` (redirige vers `/fr` ou `/en` selon le navigateur).

## Envoi du formulaire (email)
Intégration Web3Forms côté client.
Variable d'environnement nécessaire :
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`

## CV sur demande
Le CV n'est **jamais publié** : le dépôt est public et le site statique, donc tout fichier en ligne serait téléchargeable par n'importe qui.
- Le visiteur remplit « Demander mon CV » (nom, email pro, entreprise, motif) : la demande arrive par email via Web3Forms, et le CV est envoyé à la main.
- Accès : bouton dans la section À propos, lien du pied de page, palette `Ctrl/⌘ K`, ou lien direct `https://ibrahimdayende.me/#cv` (pratique à envoyer à un recruteur).
- Garder le PDF hors du dépôt : `.gitignore` bloque `src/assets/*.pdf` et tout PDF dont le nom contient « CV ».
- Code : `src/components/CvRequest.tsx`.

## Mesure d'audience (Umami)
Umami Cloud, sans cookies (pas de bandeau de consentement), compatible GitHub Pages.
- Variable : `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (dans `.env.local`, et en *variable* de dépôt GitHub pour le déploiement).
- Sans cette variable, aucun script n'est chargé.
- Événements suivis : `cta-hero-contact`, `cta-nav-contact`, `contact-whatsapp`, `contact-linkedin`, `contact-github`, `contact-email-copy`, `contact-form-sent`, `cv-request-sent`, `project-open`.

## Performance
- Le premier écran (Hero, barre de navigation) s'anime en CSS pur (`.enter`, `.enter-word`, `.enter-reveal` dans `app/globals.css`) pour s'afficher sans attendre le JavaScript. Les fondus partent de 0.01 et non 0 : sinon Chrome ignore ces éléments pour le LCP.
- framer-motion est chargé après l'affichage (`src/components/motion/features.ts`).
- Seules les traductions utilisées par des composants client sont envoyées au navigateur (`src/components/LocaleProviders.tsx`) : ajouter tout nouveau namespace client à `pickClientMessages`.

## Personnalisation rapide
- Ajouter un projet : une entrée dans `src/data/projects.ts` + ses textes dans `messages/*.json` (`projects.items.<id>`, avec `metrics` et éventuellement `caseStudy`).
- Mettre un projet en étude de cas : ajouter son id à `caseStudyIds`.
- Relier une compétence à un projet : `src/data/skills.ts`.
- Coordonnées et réseaux : `src/data/site.ts`.
- Couleurs : variables `--primary` (bleu du logo) et `--signal` (résultats) dans `app/globals.css`.
- Métadonnées et SEO : `app/layout.tsx` et `app/[locale]/layout.tsx`.
