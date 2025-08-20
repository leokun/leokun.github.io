import { inferTopics } from "./Projects";

type MinimalRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  updated_at: string;
  languages_url: string;
  language: string | null;
  fork: boolean;
  topics?: string[];
};

describe("inferTopics", () => {
  it("detects simple keywords", () => {
    const t = inferTopics({
      id: 1,
      name: "awesome-react-app",
      description: "Using vite and tailwind",
      html_url: "",
      updated_at: new Date().toISOString(),
      languages_url: "",
      language: "TypeScript",
      fork: false,
      topics: [],
    } as MinimalRepo);
    expect(t).toEqual(["react", "vite", "tailwind"]);
  });
});
