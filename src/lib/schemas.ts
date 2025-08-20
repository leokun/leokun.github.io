import { z } from "zod";

export const ExperienceItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  period: z.string(),
  location: z.string().optional(),
  bullets: z.array(z.string()),
  stack: z.array(z.string()).optional(),
});
export const ExperienceListSchema = z.array(ExperienceItemSchema);

export const AboutSchema = z.object({
  intro: z.string(),
  bio: z.string(),
  links: z.array(z.object({ label: z.string(), href: z.string().url() })),
});

export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  excerpt: z.string(),
  href: z.string().url().optional(),
});
export const ArticleListSchema = z.array(ArticleSchema);
