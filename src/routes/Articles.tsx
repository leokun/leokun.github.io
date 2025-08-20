import { useEffect, useState } from "react";
import { ArticleListSchema } from "@/lib/schemas";

type Article = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  href?: string;
};

export function Articles() {
  const [items, setItems] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/data/articles.json")
      .then((r) => r.json())
      .then((data) => {
        const parsed = ArticleListSchema.safeParse(data);
        setItems(parsed.success ? parsed.data : []);
      })
      .catch(() => setItems([]));
  }, []);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-accent">Articles</h1>
      <ul className="space-y-3">
        {items.map((a) => (
          <li key={a.id} className="border-2 border-accent/30 rounded p-4">
            <h3 className="font-semibold">
              {a.href ? (
                <a
                  className="hover:underline text-accent"
                  href={a.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {a.title}
                </a>
              ) : (
                a.title
              )}
            </h3>
            <div className="text-xs text-fg/60">{a.date}</div>
            <p className="text-sm text-fg/80 mt-1">{a.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
