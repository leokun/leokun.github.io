import { render, screen } from "@testing-library/react";
import { iconForTech, labelForTech, TechIcon } from "./TechIcon";

describe("TechIcon", () => {
  it("maps aliases correctly (next.js -> Next.js)", () => {
    expect(labelForTech("next.js")).toBe("Next.js");
    expect(labelForTech("NextJS")).toBe("Next.js");
    const Icon = iconForTech("docker");
    expect(typeof Icon).toBe("function");
  });

  it("renders inline variant with accessible name", () => {
    render(<TechIcon tech="react" variant="inline" />);
    const el = screen.getByRole("img", { name: "React" });
    expect(el).toBeInTheDocument();
  });
});
