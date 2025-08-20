import { Link, Outlet, useRouter } from "@tanstack/react-router";

export function Layout() {
  const _router = useRouter();
  return (
    <div className="min-h-full grid grid-rows-[auto,1fr,auto]">
      <header className="border-b-2 border-accent/30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-accent font-bold">
            &lt;Leo.Dev /&gt;
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link to="/projets" className="hover:text-accent">
              Projets
            </Link>
            <Link to="/experience" className="hover:text-accent">
              Expérience
            </Link>
            <Link to="/articles" className="hover:text-accent">
              Articles
            </Link>
            <Link to="/a-propos" className="hover:text-accent">
              À propos
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t-2 border-accent/30 text-xs text-fg/70">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Leo — Portfolio</span>
          <span>Propulsé par React • Vite • TanStack Router • Tailwind</span>
        </div>
      </footer>
    </div>
  );
}
