import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const base = process.env.SITE_URL || "https://leokun.github.io";
const routes = ["/", "/projets", "/experience", "/articles", "/a-propos"]; // static routes

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (p) => `  <url>
    <loc>${base}${p}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === "/" ? "1.0" : "0.6"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

const out = resolve(process.cwd(), "public", "sitemap.xml");
writeFileSync(out, xml);
console.log(`sitemap.xml written to ${out}`);
