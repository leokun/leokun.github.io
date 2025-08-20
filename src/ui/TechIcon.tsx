import type { IconType } from "react-icons";
import { FaCode, FaMicrosoft } from "react-icons/fa";
import {
  SiAmazon,
  SiApache,
  SiBootstrap,
  SiCss3,
  SiDocker,
  SiDotnet,
  SiEslint,
  SiFastapi,
  SiGo,
  SiGraphql,
  SiJest,
  SiJquery,
  SiKubernetes,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPrettier,
  SiPrisma,
  SiPytest,
  SiPython,
  SiReact,
  SiSalesforce,
  SiSqlalchemy,
  SiStorybook,
  SiSymfony,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
  SiZendesk,
} from "react-icons/si";

const ICONS: Record<string, IconType> = {
  // langages / runtimes
  typescript: SiTypescript,
  go: SiGo,
  python: SiPython,
  php: SiPhp,
  "c#": SiDotnet,
  csharp: SiDotnet,

  // frontend / libs
  react: SiReact,
  nextjs: SiNextdotjs,
  "next.js": SiNextdotjs,
  jest: SiJest,
  mui: SiMui,
  jquery: SiJquery,
  css: SiCss3,
  bootstrap: SiBootstrap,

  // backend / framework
  nestjs: SiNestjs,
  fastapi: SiFastapi,
  sqlalchemy: SiSqlalchemy,
  pytest: SiPytest,
  symfony: SiSymfony,

  // tooling
  turborepo: SiTurborepo,
  vite: SiVite,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  docker: SiDocker,
  eslint: SiEslint,
  prettier: SiPrettier,
  storybook: SiStorybook,

  // runtime / node
  node: SiNodedotjs,
  nodejs: SiNodedotjs,

  // db
  mongodb: SiMongodb,
  mysql: SiMysql,

  // vendors / cloud / autres
  microsoft: FaMicrosoft,
  salesforce: SiSalesforce,
  zendesk: SiZendesk,
  apache: SiApache,
  graphql: SiGraphql,
  kubernetes: SiKubernetes,
  k8s: SiKubernetes,
  aws: SiAmazon,
  amazon: SiAmazon,
  vercel: SiVercel,
  prisma: SiPrisma,
  vitest: SiVitest,
};

const LABELS: Record<string, string> = {
  typescript: "TypeScript",
  go: "Go",
  mongodb: "MongoDB",
  react: "React",
  nestjs: "NestJS",
  turborepo: "Turborepo",
  symfony: "Symfony",
  python: "Python",
  php: "PHP",
  docker: "Docker",
  salesforce: "Salesforce",
  microsoft: "Microsoft",
  zendesk: "Zendesk",
  nextjs: "Next.js",
  "next.js": "Next.js",
  jest: "Jest",
  mui: "MUI",
  fastapi: "FastAPI",
  sqlalchemy: "SQLAlchemy",
  pytest: "pytest",
  mysql: "MySQL",
  jquery: "jQuery",
  css: "CSS",
  "c#": "C#",
  csharp: "C#",
  apache: "Apache",
  vite: "Vite",
  tailwind: "Tailwind CSS",
  tailwindcss: "Tailwind CSS",
  graphql: "GraphQL",
  node: "Node.js",
  nodejs: "Node.js",
  kubernetes: "Kubernetes",
  k8s: "Kubernetes",
  aws: "AWS",
  amazon: "AWS",
  vercel: "Vercel",
  prisma: "Prisma",
  vitest: "Vitest",
  eslint: "ESLint",
  prettier: "Prettier",
  storybook: "Storybook",
  bootstrap: "Bootstrap",
};

function normalize(raw: string): string {
  const s = raw.trim().toLowerCase();
  if (s === "next.js") return "nextjs";
  if (s === "node.js") return "node";
  if (s === "csharp") return "c#";
  return s;
}

export function iconForTech(tech: string): IconType {
  const key = normalize(tech);
  return ICONS[key] ?? FaCode;
}

export function labelForTech(tech: string): string {
  const key = normalize(tech);
  return LABELS[key] ?? tech;
}

export type TechIconProps = {
  tech: string;
  variant?: "square" | "inline";
  tooltip?: boolean;
  className?: string;
};

export function TechIcon({
  tech,
  variant = "square",
  tooltip = variant === "square",
  className,
}: TechIconProps) {
  const Icon = iconForTech(tech);
  const label = labelForTech(tech);
  if (variant === "inline") {
    return (
      <span
        className={["inline-flex items-center", className].filter(Boolean).join(" ")}
        title={label}
      >
        <Icon className="w-4 h-4 align-middle" />
      </span>
    );
  }
  return (
    <span
      className={[
        "relative group inline-flex items-center justify-center w-7 h-7 rounded border border-accent/30 text-accent/90",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      title={label}
    >
      <Icon className="w-4 h-4" />
      {tooltip && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5 text-[10px] bg-accent text-bg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-100 z-10 shadow"
        >
          {label}
        </span>
      )}
    </span>
  );
}
