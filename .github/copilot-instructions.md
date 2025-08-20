# Copilot Instructions for this Repo

These instructions help AI coding agents work productively in this codebase.

## Big picture
- Stack: React 19 + Vite 7 + TypeScript (strict) + TanStack Router + Tailwind CSS v4.
- Static content is under `public/data/*.json` (about, experience, articles, projects). Pages read these at runtime via `fetch` from `/data/...`.
- Routes are in `src/router.tsx` and page components live in `src/routes/*`.
- Styling is in a single `src/index.css` using Tailwind v4 with `@theme` tokens. Colors are also mirrored in `tailwind.config.ts`.
- Technology icons are centralized by `src/ui/TechIcon.tsx`; use it instead of duplicating icon logic.
- Markdown in Experience bullets is rendered via `marked` and sanitized with DOMPurify (see `src/lib/markdown.ts` used by `Experience.tsx`). Never inject raw HTML.

## Conventions and patterns
- No French in code (variables, comments, tests). French is allowed in JSX/HTML visible content only.
- Prefer path alias `@/*` (configured in `vite.config.ts` and `tsconfig.json`).
- Use `TechIcon` for any tech/topic iconography; extend the `ICONS` and `LABELS` maps there when adding new tech.
- GitHub projects page (`src/routes/Projects.tsx`) fetches repos live, caches in `sessionStorage` (10 min), shows language badges and inferred topics via `inferTopics`.
- Accessibility: tooltips use native `title` plus small popover on hover for square icons; keep aria-friendly labels.
- Security: sanitize all markdown using `markdownToHtml` (DOMPurify + marked). Avoid `dangerouslySetInnerHTML` unless sanitized.

## Workflows
- Install: `pnpm install`
- Dev: `pnpm dev`
- Build: `pnpm build` (tsc project refs + vite build)
- Preview: `pnpm preview`
- Lint/format (Biome): `pnpm lint` / `pnpm lint:fix`
- Tests (Vitest): `pnpm test` or `pnpm test:watch`. JSDOM env; setup in `vitest.setup.ts`. Test files live beside sources: `src/**/*.{test,spec}.{ts,tsx}`.

## Files to know
- `src/router.tsx`: Route tree using TanStack Router (Home, Projects, Experience, Articles, About).
- `src/ui/Layout.tsx`: Shell and navigation (French labels in JSX are expected).
- `src/ui/TechIcon.tsx`: Source of truth for tech icon mapping and labels; supports `square` and `inline` variants.
- `src/routes/Experience.tsx`: Renders experience items from `/public/data/experience.json`, uses `markdownToHtml` for bullets, shows `stack` icons.
- `src/routes/Projects.tsx`: GitHub integration, `languageBadge`, topic icons, `inferTopics` utility (exported for tests).
- `src/lib/markdown.ts`: `markdownToHtml(md)` utility for safe markdown -> HTML.
- `src/index.css`: Tailwind v4 tokens with `@theme` and custom base styles.
- `.github/workflows/deploy.yml`: CI to build and deploy to GitHub Pages.

## External APIs and deps
- GitHub REST API: `https://api.github.com/users/${OWNER}/repos` with pagination and language endpoints per repo.
- Icons: `react-icons` (Si*, Fa*). Add new tech by updating `ICONS`/`LABELS` in `TechIcon.tsx`.
- DOMPurify (`isomorphic-dompurify`) and `marked` for markdown rendering.
- Biome for lint/format; config in `biome.json` (a11y/security rules enabled).

## Testing guidance
- Use Vitest with JSDOM. Example tests exist: `src/ui/TechIcon.test.tsx`, `src/routes/Projects.test.ts`, `src/lib/markdown.test.ts`.
- Import utilities directly (e.g., `inferTopics`, `markdownToHtml`) and keep test descriptions in English.

## Gotchas
- Only JSX/HTML visible strings may be French. Translate all comments/identifiers to English.
- Tailwind v4 uses `@theme` in `index.css`; some tools may warn about unknown at-rules—disabled via Biome ignore.
- Projects page may hit API rate limits; respect the caching and keep MAX_REPOS reasonable.

## Example changes
- Adding a new tech icon: update `ICONS` and `LABELS` in `TechIcon.tsx`, then use `<TechIcon tech="kubernetes" />` where needed.
- Rendering new markdown content: import `markdownToHtml` and pass sanitized HTML to `dangerouslySetInnerHTML`.
