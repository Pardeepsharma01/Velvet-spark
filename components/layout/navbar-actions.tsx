// "use client";

// import Link from "next/link";
// import { useAuth } from "@/hooks/useAuth";
// import { useAppSelector } from "@/store/hooks";
// import { selectCartCount } from "@/store/cartSlice";

// // ─── NavbarActions ────────────────────────────────────────────────────────────
// // Client component — reads live auth state + cart count from Redux.
// // Rendered inside the server Navbar component.

// export function NavbarActions() {
//   const { user, isLoggedIn, loading } = useAuth();
//   const cartCount = useAppSelector(selectCartCount);

//   // Derive initials for avatar
//   const name = user?.user_metadata?.full_name as string | undefined;
//   const initials = name
//     ? name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
//     : user?.email?.[0]?.toUpperCase() ?? "?";

//   return (
//     <div className="flex items-center gap-2 sm:gap-3">

//       {/* ── Search ─────────────────────────────────────────────────── */}
//       <button
//         aria-label="Search"
//         className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-charcoal-400 dark:text-charcoal-200 hover:text-gold hover:bg-gold/10 transition-colors duration-200"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//           <circle cx="11" cy="11" r="8" />
//           <path d="m21 21-4.35-4.35" />
//         </svg>
//       </button>

//       {/* ── Cart ───────────────────────────────────────────────────── */}
//       <Link
//         href="/cart"
//         aria-label={`Cart — ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
//         className="relative flex h-9 w-9 items-center justify-center rounded-lg text-charcoal-400 dark:text-charcoal-200 hover:text-gold hover:bg-gold/10 transition-colors duration-200"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//           <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
//           <line x1="3" y1="6" x2="21" y2="6" />
//           <path d="M16 10a4 4 0 0 1-8 0" />
//         </svg>
//         {cartCount > 0 && (
//           <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-white text-2xs font-bold leading-none">
//             {cartCount > 99 ? "99+" : cartCount}
//           </span>
//         )}
//       </Link>

//       {/* ── Auth ───────────────────────────────────────────────────── */}
//       {loading ? (
//         // Skeleton placeholder — prevents layout shift
//         <div className="hidden sm:block h-9 w-20 rounded-lg bg-gold/10 animate-pulse" />
//       ) : isLoggedIn ? (
//         // Avatar link → profile page
//         <Link
//           href="/profile"
//           aria-label="My profile"
//           className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 border border-gold/40 hover:border-gold hover:bg-gold/25 transition-all duration-200"
//         >
//           <span className="text-xs font-bold text-gradient-gold font-display">
//             {initials}
//           </span>
//         </Link>
//       ) : (
//         // Sign In button
//         <Link
//           href="/auth/login"
//           className="hidden sm:inline-flex items-center justify-center h-9 px-4 rounded-lg border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-white transition-all duration-200"
//         >
//           Sign In
//         </Link>
//       )}

//       {/* ── Mobile menu toggle ──────────────────────────────────────── */}
//       <button
//         aria-label="Open menu"
//         className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg text-charcoal-400 dark:text-charcoal-200 hover:text-gold hover:bg-gold/10 transition-colors duration-200"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//           <line x1="4" y1="6" x2="20" y2="6" />
//           <line x1="4" y1="12" x2="20" y2="12" />
//           <line x1="4" y1="18" x2="20" y2="18" />
//         </svg>
//       </button>

//     </div>
//   );
// }
/////////////////////////
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "@/hooks/useAuth";
import { useAuth } from "@/providers/AuthProvider";
import { useAppSelector } from "@/store/hooks";
import { selectCartCount } from "@/store/cartSlice";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function NavbarActions() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoggedIn, loading } = useAuth();
  const cartCount = useAppSelector(selectCartCount);

  // Close drawer on route change
  useEffect(() => setIsOpen(false), [pathname]);

  // Prevent scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : (user?.email?.[0]?.toUpperCase() ?? "?");

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {/* ── Search & Cart (Always Visible) ─────────────────────────── */}
      <div className="flex items-center gap-1">
        <button className="h-10 w-10 flex items-center justify-center rounded-full text-foreground/70 hover:text-gold hover:bg-gold/10 transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>

        <Link
          href="/cart"
          className="relative h-10 w-10 flex items-center justify-center rounded-full text-foreground/70 hover:text-gold hover:bg-gold/10 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* ── Desktop Auth ───────────────────────────────────────────── */}
      <div className="hidden sm:block">
        {loading ? (
          <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
        ) : isLoggedIn ? (
          <Link
            href="/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-xs font-bold text-primary hover:bg-primary/10"
          >
            {initials}
          </Link>
        ) : (
          <Link
            href="/auth/login"
            className="hidden sm:inline-flex items-center justify-center h-9 px-4 rounded-lg border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-white transition-all duration-200"
          >
            Sign In
          </Link>
        )}
      </div>

      {/* ── Hamburger Button ───────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex md:hidden h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary"
        aria-label="Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {/* ── Framer Motion Drawer ───────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm md:hidden"
            />

            {/* Side Panel */}
            {/* ── Mobile Drawer Panel ─────────────────────────────────────── */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              /* Yahan humne bg-ivory/100 (solid) aur h-screen (full height) fix kiya hai */
              className="fixed inset-y-0 right-0 z-[101] w-full max-w-[300px] bg-[#FFFFF0] dark:bg-[#1A1A1A] h-screen shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full overflow-y-auto">
                {/* Header: Close Button & Logo */}
                <div className="flex items-center justify-between p-6 border-b border-gold/10">
                  <span className="font-display text-xl font-bold">
                    Velvet <span className="text-gradient-gold">Spark</span>
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gold/10 text-charcoal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 p-6">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className="block py-4 text-lg font-medium border-b border-gold/5 text-charcoal hover:text-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Bottom Section: Auth */}
                <div className=" p-6 bg-gold/5">
                  {isLoggedIn ? (
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 p-4 rounded-xl border border-gold/20 bg-white dark:bg-charcoal/50"
                    >
                      <div className="h-10 w-10 rounded-full bg-gold flex items-center justify-center text-white font-bold">
                        {initials}
                      </div>
                      <span className="font-bold text-charcoal">
                        My Account
                      </span>
                    </Link>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="flex h-12 w-full items-center justify-center rounded-lg bg-gold text-white font-bold shadow-md"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
