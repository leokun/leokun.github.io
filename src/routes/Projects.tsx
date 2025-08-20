import React, { useEffect, useMemo, useState } from 'react'
import { TechIcon } from '../ui/TechIcon'
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiGo,
  SiRust,
  SiOpenjdk,
  SiCplusplus,
  SiC,
  SiHtml5,
  SiCss3,
  SiGnubash,
  SiDocker,
  SiPhp,
  SiKotlin,
  SiSwift,
  SiDart,
  SiScala,
  SiHaskell,
  SiElixir,
  SiVuedotjs,
  SiSvelte,
  SiReact,
} from 'react-icons/si'
import { IconType } from 'react-icons'

type GitHubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  updated_at: string
  languages_url: string
  language: string | null
  fork: boolean
  topics?: string[]
}

type RepoWithLangs = GitHubRepo & { languages: string[] }

const OWNER = 'leokun'
const MAX_REPOS = 30 // limite pour réduire les appels /languages et rester sous la limite de rate
const CACHE_KEY = `gh_${OWNER}_repos_v2`
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

function languageBadge(lang: string) {
  const base = 'inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-[10px] font-medium border bg-fg/5 border-accent/20 text-fg/80'
  const map: Record<string, { icon: IconType; color?: string; label?: string }> = {
    TypeScript: { icon: SiTypescript, color: '#3178C6' },
    JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
    Python: { icon: SiPython, color: '#3776AB' },
    Go: { icon: SiGo, color: '#00ADD8' },
    Rust: { icon: SiRust, color: '#DEA584' },
  Java: { icon: SiOpenjdk, color: '#EA2D2E' },
    'C++': { icon: SiCplusplus, color: '#00599C', label: 'C++' },
    C: { icon: SiC, color: '#A8B9CC' },
    HTML: { icon: SiHtml5, color: '#E34F26' },
    CSS: { icon: SiCss3, color: '#1572B6' },
    Shell: { icon: SiGnubash, color: '#89E051' },
    Dockerfile: { icon: SiDocker, color: '#2496ED', label: 'Dockerfile' },
    PHP: { icon: SiPhp, color: '#777BB4' },
    Kotlin: { icon: SiKotlin, color: '#A97BFF' },
    Swift: { icon: SiSwift, color: '#FA7343' },
    Dart: { icon: SiDart, color: '#0175C2' },
    Scala: { icon: SiScala, color: '#DC322F' },
    Haskell: { icon: SiHaskell, color: '#5D4F85' },
    Elixir: { icon: SiElixir, color: '#4E2A8E' },
    Vue: { icon: SiVuedotjs, color: '#41B883', label: 'Vue' },
    Svelte: { icon: SiSvelte, color: '#FF3E00' },
    React: { icon: SiReact, color: '#61DAFB' },
  }
  const entry = map[lang] || { icon: SiReact }
  const Icon = entry.icon
  const label = entry.label || lang || 'Other'
  return (
    <span key={label} className={base} title={label}>
      <Icon style={{ color: entry.color ?? 'currentColor' }} />
      {label}
    </span>
  )
}

// Affichage des topics GitHub avec TechIcon

function inferTopics(repo: GitHubRepo): string[] {
  // Heuristique simple si topics non fournis: deviner à partir du nom/description
  const txt = `${repo.name} ${repo.description ?? ''}`.toLowerCase()
  const pool = [
    'react',
    'vite',
    'nextjs',
    'node',
    'tailwind',
    'graphql',
    'docker',
    'kubernetes',
    'aws',
    'vercel',
    'prisma',
    'jest',
    'vitest',
    'eslint',
    'prettier',
    'storybook',
  ]
  const found = pool.filter((k) => txt.includes(k))
  return found.slice(0, 6)
}

function RepoTopics({ repo }: { repo: GitHubRepo }) {
  const topics = (repo.topics && repo.topics.length > 0 ? repo.topics : inferTopics(repo)).slice(0, 8)
  if (topics.length === 0) return null
  return (
    <div className="mt-3 flex flex-wrap gap-2.5">
      {topics.map((t) => (
        <TechIcon key={t} tech={t} />
      ))}
    </div>
  )
}

async function fetchRepos(): Promise<GitHubRepo[]> {
  const url = `https://api.github.com/users/${OWNER}/repos?per_page=100&sort=updated`
  const r = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  if (!r.ok) throw new Error(`GitHub API error: ${r.status}`)
  const data = (await r.json()) as GitHubRepo[]
  // tri côté client par updated_at desc, puis limite
  return data
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, MAX_REPOS)
}

async function fetchLanguagesFor(repo: GitHubRepo): Promise<string[]> {
  try {
    const r = await fetch(repo.languages_url)
    if (!r.ok) return repo.language ? [repo.language] : []
    const langs = (await r.json()) as Record<string, number>
    const sorted = Object.entries(langs)
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name)
    return sorted.slice(0, 3)
  } catch {
    return repo.language ? [repo.language] : []
  }
}

export function Projects() {
  const [items, setItems] = useState<RepoWithLangs[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        // cache
        const now = Date.now()
        const cached = (() => {
          try {
            const raw = sessionStorage.getItem(CACHE_KEY)
            if (!raw) return null
            const parsed = JSON.parse(raw) as { ts: number; items: RepoWithLangs[] }
            if (now - parsed.ts < CACHE_TTL_MS) return parsed.items
            return null
          } catch {
            return null
          }
        })()

        const repos = cached ?? (await fetchRepos())
        const withLangs = Array.isArray(repos) && 'languages' in (repos[0] ?? {})
          ? (repos as RepoWithLangs[])
          : await Promise.all(
              (repos as GitHubRepo[]).map(async (r) => ({
                ...r,
                languages: await fetchLanguagesFor(r),
              }))
            )
        if (!cancelled) {
          setItems(withLangs)
          try {
            sessionStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ ts: now, items: withLangs })
            )
          } catch {}
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Erreur de chargement')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const content = useMemo(() => {
    if (loading) return <p className="text-sm text-fg/70">Chargement des projets…</p>
    if (error) return <p className="text-sm text-red-500">{error}</p>
    if (items.length === 0) return <p className="text-sm text-fg/70">Aucun dépôt public.</p>
    return (
      <ul className="grid md:grid-cols-2 gap-4">
        {items.map((p) => (
          <li key={p.id} className="border-2 border-accent/30 rounded p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <a
                    href={p.html_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:underline truncate"
                  >
                    {p.name}
                  </a>
                  {/* Inline tech icons for key stacks */}
                  {(() => {
                    const topics = (p.topics && p.topics.length > 0 ? p.topics : inferTopics(p)).map((t) => t.toLowerCase())
                    const picks = ['react', 'nextjs', 'docker'].filter((k) => topics.includes(k))
                    if (picks.length === 0) return null
                    return (
                      <span className="flex items-center gap-1.5 text-fg/80">
                        {picks.map((t) => (
                          <TechIcon key={t} tech={t} variant="inline" />
                        ))}
                      </span>
                    )
                  })()}
                </h3>
              </div>
              <span className="text-[10px] text-fg/60 whitespace-nowrap">
                {new Date(p.updated_at).toLocaleDateString('fr-FR')}
              </span>
            </div>
            <p className="text-sm text-fg/70 mt-1">{p.description ?? '—'}</p>
            {/* Langages */}
            {p.languages.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.languages.map((l) => languageBadge(l))}
              </div>
            )}
            {/* Technos (topics GitHub + heuristique) */}
            <RepoTopics repo={p} />
          </li>
        ))}
      </ul>
    )
  }, [items, loading, error])

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-accent">Projets</h1>
      {content}
    </section>
  )
}
