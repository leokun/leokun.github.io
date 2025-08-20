import React, { useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import { TechIcon } from '../ui/TechIcon'

type ExperienceItem = {
  id: string
  title: string
  company: string
  period: string
  location?: string
  bullets: string[]
  stack?: string[]
}

// Icônes de stack via composant réutilisable

export function Experience() {
  const [items, setItems] = useState<ExperienceItem[]>([])
  const [format, setFormat] = useState<'pdf' | 'png'>('pdf')

  const resumeHref = useMemo(() => `/cv/Léo Stewart DFS-ng-250731.${format}`, [format])

  useEffect(() => {
    fetch('/data/experience.json')
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]))
  }, [])

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-accent">Expérience</h1>
      <div className="space-y-4">
        {items.map((x) => (
          <article key={x.id} className="border-2 border-accent/30 rounded p-4">
            <header className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{x.title}</h3>
                <div className="text-xs italic text-fg/70">
                  <span className="text-accent-600">{x.company}</span>
                  {x.location ? <> — {x.location}</> : null}
                </div>
              </div>
              <span className="text-xs text-fg/60 whitespace-nowrap">{x.period}</span>
            </header>
            <ul className="list-disc pl-5 mt-2 text-sm text-fg/80 space-y-1">
              {x.bullets.map((b, i) => {
                const html = DOMPurify.sanitize(marked.parse(b, { breaks: true }) as string)
                return (
                  <li key={i} className="[&_a]:text-accent [&_a:hover]:underline [&_code]:text-accent-600">
                    <span dangerouslySetInnerHTML={{ __html: html }} />
                  </li>
                )
              })}
            </ul>
            {x.stack && x.stack.length > 0 ? (
              <div className="mt-3 pt-2 border-t border-accent/20 flex flex-wrap items-center gap-2.5">
                {x.stack.map((tech, idx) => (
                  <TechIcon key={idx} tech={tech} />
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
      <div className="mt-8 border-t border-accent/30 pt-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <label htmlFor="cv-format" className="text-sm text-fg/80">Télécharger mon CV:</label>
          <div className="flex items-center gap-3">
            <select
              id="cv-format"
              className="bg-bg border border-accent/30 rounded px-2 py-1 text-sm"
              value={format}
              onChange={(e) => setFormat(e.target.value as 'pdf' | 'png')}
            >
              <option value="pdf">PDF</option>
              <option value="png">PNG</option>
            </select>
            <a
              href={resumeHref}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-accent/40 hover:border-accent text-accent rounded px-3 py-1 text-sm"
            >
              Télécharger
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
