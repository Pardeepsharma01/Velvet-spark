// ─── Auth Layout ──────────────────────────────────────────────────────────────
// Shared wrapper for all /auth/* pages.
// Minimal, centered layout — no Navbar/Footer clutter on auth pages.

import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-ivory dark:bg-charcoal">
      {/* Minimal header */}
      <header className="flex items-center justify-center h-16 border-b border-gold/20">
        <Link
          href="/"
          className="font-display text-2xl font-bold text-charcoal dark:text-ivory"
          aria-label="Velvet Spark — Home"
        >
          Velvet <span className="text-gradient-gold">Spark</span>
        </Link>
      </header>

      {/* Auth form area */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>

      {/* Minimal footer */}
      <footer className="flex items-center justify-center h-12 border-t border-gold/20">
        <p className="text-xs text-charcoal-400 dark:text-charcoal-300">
          © {new Date().getFullYear()} Velvet Spark. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
