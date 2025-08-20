import { useEffect, useState } from "react";
import { AboutSchema } from "@/lib/schemas";

type AboutData = {
  intro: string;
  bio: string;
  links: { label: string; href: string }[];
};

export function About() {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch("/data/about.json")
      .then((r) => r.json())
      .then((data) => {
        const parsed = AboutSchema.safeParse(data);
        setData(parsed.success ? parsed.data : null);
      })
      .catch(() => setData(null));
  }, []);

  if (!data) return <p>Chargement…</p>;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-accent">À propos</h1>
      <p className="max-w-prose text-fg/80">{data.intro}</p>
      <div className="code-block text-sm whitespace-pre-wrap">{data.bio}</div>
      <ul className="flex flex-wrap gap-3 text-sm">
        {data.links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
