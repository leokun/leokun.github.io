import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

export function markdownToHtml(md: string): string {
  const raw = marked.parse(md, { breaks: true }) as string;
  return DOMPurify.sanitize(raw, {
    ALLOWED_TAGS: ["p", "a", "em", "strong", "code", "ul", "ol", "li", "br"],
    ALLOWED_ATTR: ["href", "rel", "target"],
    FORCE_BODY: true,
  });
}
