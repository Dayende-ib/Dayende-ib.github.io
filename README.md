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

## Personnalisation rapide
- Ajouter un projet : une entrée dans `src/data/projects.ts` + ses textes dans `messages/*.json` (`projects.items.<id>`, avec `metrics` et éventuellement `caseStudy`).
- Mettre un projet en étude de cas : ajouter son id à `caseStudyIds`.
- Relier une compétence à un projet : `src/data/skills.ts`.
- Coordonnées et réseaux : `src/data/site.ts`.
- Couleurs : variables `--primary` (bleu du logo) et `--signal` (résultats) dans `app/globals.css`.
- Métadonnées et SEO : `app/layout.tsx` et `app/[locale]/layout.tsx`.
