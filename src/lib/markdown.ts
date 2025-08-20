import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

export function markdownToHtml(md: string): string {
  const raw = marked.parse(md, { breaks: true }) as string;
  return DOMPurify.sanitize(raw);
}
