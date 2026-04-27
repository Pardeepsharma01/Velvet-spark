import Link from "next/link";
import { Container } from "@/components/ui/container";

// ─── Footer Link Groups ───────────────────────────────────────────────────────

const FOOTER_LINKS = [
  {
    heading: "Shop",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Necklaces", href: "/shop/necklaces" },
      { label: "Earrings", href: "/shop/earrings" },
      { label: "Bracelets", href: "/shop/bracelets" },
      { label: "Rings", href: "/shop/rings" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/story" },
      { label: "Press", href: "/press" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.545 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.132-1.867 3.132-4.562 0-2.386-1.715-4.054-4.163-4.054-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.774.741 2.276.082.1.094.187.07.288l-.276 1.131c-.044.18-.147.218-.339.131-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-charcoal dark:bg-charcoal-800 text-ivory">
      {/* ── Gold divider ─────────────────────────────────────────────── */}
      <div className="divider-gold" />

      <Container>
        <div className="py-12 md:py-16">
          {/* ── Top: Brand + Links ────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12">
            {/* Brand column */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <Link
                href="/"
                aria-label="Velvet Spark — Home"
                className="inline-block focus-visible:outline-none"
              >
                <span className="font-display text-2xl font-bold text-ivory leading-none">
                  Velvet <span className="text-gradient-gold">Spark</span>
                </span>
              </Link>

              <p className="text-sm text-charcoal-300 leading-relaxed max-w-xs">
                Premium artificial jewelry crafted with passion. Elegance you
                can wear every day, without compromise.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-1">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-charcoal-400 text-charcoal-300 hover:border-gold hover:text-gold transition-colors duration-200"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {FOOTER_LINKS.map((group) => (
              <div key={group.heading} className="flex flex-col gap-4">
                <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-gold">
                  {group.heading}
                </h3>
                <ul className="flex flex-col gap-2.5" role="list">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-charcoal-300 hover:text-ivory transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Bottom: Copyright + Legal ─────────────────────────────── */}
          <div className="mt-12 pt-8 border-t border-charcoal-400 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-charcoal-400">
              © {currentYear} Velvet Spark. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-charcoal-400 hover:text-charcoal-200 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
