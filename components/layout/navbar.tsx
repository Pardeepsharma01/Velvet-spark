import Link from "next/link";
import { Container } from "@/components/ui/container";
import { NavbarActions } from "@/components/layout/navbar-actions";

// ─── Nav Links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",         href: "/" },
  { label: "Shop",         href: "/shop" },
  { label: "About",        href: "/about" },
  { label: "Contact",      href: "/contact" },
] as const;

// ─── Navbar (Server Component) ────────────────────────────────────────────────
// Static shell: logo + nav links (server-rendered, fast).
// NavbarActions is a client island that handles live auth + cart count.

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full  border-gold/20 bg-ivory/90 dark:bg-charcoal/90 backdrop-blur-md">
      <Container>
        <nav
          className="flex items-center justify-between h-16 md:h-20"
          aria-label="Main navigation"
        >
          {/* ── Logo ────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none"
            aria-label="Velvet Spark — Home"
          >
            <span className="font-display text-2xl font-bold text-charcoal dark:text-ivory leading-none tracking-tight">
              Velvet{" "}
              <span className="text-gradient-gold">Spark</span>
            </span>
          </Link>

          {/* ── Desktop Navigation ──────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-sm font-medium text-charcoal-400 dark:text-charcoal-200 hover:text-gold dark:hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Client island: search, cart badge, auth ──────────────── */}
          <NavbarActions />

        </nav>
      </Container>
    </header>
  );
}
