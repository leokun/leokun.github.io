import { markdownToHtml } from "./markdown";

describe("markdownToHtml", () => {
  it("convertit le markdown de base et supprime les scripts", () => {
    const md = "Hello **world** <script>alert('x')</script>";
    const html = markdownToHtml(md);
    expect(html).toContain("<p>Hello <strong>world</strong>");
    expect(html).not.toContain("<script>");
  });
});
