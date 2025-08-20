import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { About } from "./routes/About";
import { Articles } from "./routes/Articles";
import { Experience } from "./routes/Experience";
import { Home } from "./routes/Home";
import { Projects } from "./routes/Projects";
import { Layout } from "./ui/Layout";

const rootRoute = createRootRoute({
  component: () => <Layout />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Home />,
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projets",
  component: () => <Projects />,
});

const experienceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/experience",
  component: () => <Experience />,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/a-propos",
  component: () => <About />,
});

const articlesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/articles",
  component: () => <Articles />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  projectsRoute,
  experienceRoute,
  aboutRoute,
  articlesRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
