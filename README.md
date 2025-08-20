# Portfolio NG

A minimalist personal portfolio built with React 19, Vite 7, TanStack Router, and Tailwind CSS v4. Content is driven by static JSON files and rendered as accessible, fast pages.

## Features
- React 19 with Vite 7 and TanStack Router
- Tailwind CSS v4 (single index.css with @theme tokens)
- Static data: JSON files for About, Experience, Projects, Articles
- Markdown bullets rendered safely via marked + DOMPurify
- Reusable TechIcon component for technology icons (react-icons)
- GitHub Projects page with live repo fetch, language badges, topic icons and caching
- TypeScript strict mode
- Biome (formatter + linter) configured for code quality

## Project structure
```
.
├── index.html
├── public/
│   └── data/
│       ├── about.json
│       ├── experience.json
│       ├── projects.json (if any)
│       └── articles.json (if any)
├── src/
│   ├── main.tsx
│   ├── router.tsx
│   ├── index.css
│   ├── routes/
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Articles.tsx
│   │   └── About.tsx
│   └── ui/
│       ├── Layout.tsx
│       └── TechIcon.tsx
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
├── biome.json
├── package.json
└── .github/workflows/deploy.yml
```

## Data model
- Experience (`public/data/experience.json`)
  - Each item supports: id, title, company, period, location, bullets[], stack[]
  - stack is an array of tech names used to render icons at the bottom of cards
- About, Projects, Articles are similarly driven by JSON (or GitHub API for Projects)

## TechIcon component
A small reusable UI component that maps technology names to icons and labels.
- File: `src/ui/TechIcon.tsx`
- Props:
  - tech: string (technology key; e.g. "react", "nextjs", "docker")
  - variant: 'square' | 'inline' (default 'square')
  - tooltip?: boolean (default true for square)
  - className?: string
- Behavior:
  - Monochrome icon inside a bordered square for the "square" variant
  - Inline variant for compact, in-text usage (e.g. near project titles)
  - Tooltip via native title attribute

## Styling
- Tailwind v4 with a single `index.css`
- Custom tokens defined under `@theme` in `index.css`
- Colors defined in `tailwind.config.ts` for bg, fg, accent

## GitHub Projects page
- Fetches public repos from GitHub REST API
- Caches results in sessionStorage for 10 minutes
- Displays language badges (top 3 by bytes)
- Infers topics and shows compact inline tech icons near the title and as a list

## Commands
- Dev server:
  - pnpm dev
- Build:
  - pnpm build
- Preview:
  - pnpm preview
- Lint (Biome):
  - pnpm lint
- Format (Biome):
  - pnpm format

## Biome
- Config: `biome.json` (formatter + linter, recommended rules, a11y & security enabled)
- Respect .gitignore via `vcs.useIgnoreFile`
- VS Code: install the recommended extension `biomejs.biome`

## Accessibility & security
- Markdown bullets sanitized with DOMPurify before injection
- Tooltips rely on native title attribute to remain accessible
- Lint rules enforce a11y and security best practices (via Biome)

## Deployment
- Production build with Vite
- A GitHub Actions workflow lives in `.github/workflows/deploy.yml` (adjust as needed)
- The output is generated into `dist/` and can be published as static hosting

## Configuration
- Tailwind: `tailwind.config.ts`
- Router: `src/router.tsx` with routes for Home, Projects, Experience, Articles, About
- Vite: `vite.config.ts`

## Notes
- TypeScript is in strict mode
- Path aliases can be introduced later; current code uses relative imports for portability
- This project uses pnpm; yarn/npm should work with lockfile changes
