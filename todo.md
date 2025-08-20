## Qualité du code et DX
 - Tests: ajouter Vitest + React Testing Library (TechIcon, parsing markdown, Projects data flow).
 - CI: workflow GitHub Actions pour pnpm install, lint (Biome), typecheck, build sur PR/push.
 - Hooks Git: pre-commit (Biome format/lint) avec simple-git-hooks/lefthook.
 - Aliases: activer l’alias "@/"" dans Vite (resolve.alias) pour aligner tsconfig et éviter les imports relatifs.
 - Schémas de données: définir des JSON Schema pour public/data/*.json + validation dev (zod) et types TS partagés.

## Accessibilité
 - Tooltips: remplacer title par un couple aria-describedby + id, visible au focus clavier.
 - Focus states: styles visibles (outline/offset) sur les éléments interactifs.
 - Contraste: vérifier le contraste des états “text-accent/90” et “fg/70”.

## Performance
  - GitHub API: utiliser ETag/If-None-Match ou un token en variable d’env (limiter le rate limit); prévoir fallback JSON  statique généré à la build (workflow qui “hydrate” un projects.cache.json).
  - Assets: précharger la CSS et police (font-display: swap) si police custom; compresser images (CV PNG).
  - Lighthouse: automatiser un rapport en CI (budget/perf assertions).

## Sécurité
 - DOMPurify: figer une config (ALLOWED_TAGS/ATTR) et tests minimalistes anti-XSS.
 - En-têtes: documenter une CSP stricte et security headers pour l’hébergeur (GH Pages ou proxy).

## SEO et contenu
 - Métadonnées: Open Graph/Twitter Cards, title/description par page.
 - Sitemap: générer sitemap.xml + mise à jour via workflow.
 - Schema.org JSON‑LD (Person, CreativeWork pour projets).
 - i18n: bascule fr/en des textes et datas (simple toggle + fichiers JSON locaux).

## UI/UX
 - Composants: factoriser “Card” (bordure/typographie/paddings) pour Projets/Expérience.
 - Icônes stack: option couleur par techno (prop facultative) + grouper/ordonner les stacks.
 - Loading states: skeletons cohérents pour lists; afficher des erreurs contextualisées (rate limit, offline).

## Outillage CSS
 - Biome CSS: mettre une règle d’override globale pour ignorer @theme Tailwind v4 (au lieu de commentaires inline).
 - Design tokens: documenter rapidement les tokens @theme (palette, font sizes) dans le README.

## Déploiement
 - GH Pages workflow: activer cache pnpm + cache build si possible, et vérifs (lint/build) avant publish.
 - Option PWA: manifest minimal + service worker pour offline/caching (facultatif).

## Maintenance
 - Dépendances: activer Renovate ou Dependabot (pnpm) pour mises à jour automatiques PR.
 - Documentation: CONTRIBUTING.md (scripts, conventions de commit, process release) + section “Runbook”.