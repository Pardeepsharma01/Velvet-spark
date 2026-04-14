"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { signOut } from "@/app/auth/actions";
import type { User } from "@supabase/supabase-js";

// ─── Avatar Initials ──────────────────────────────────────────────────────────

function AvatarInitials({ name, email }: { name?: string; email?: string }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : email?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="w-20 h-20 rounded-full bg-gold/15 border-2 border-gold/40 flex items-center justify-center">
      <span className="font-display text-2xl font-bold text-gradient-gold">
        {initials}
      </span>
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/auth/login?redirectTo=/profile");
        return;
      }
      setUser(data.user);
      setLoading(false);
    });
  }, [router]);

  if (loading) {
    return (
      <Section spacing="xl">
        <Container size="sm">
          <div className="flex justify-center items-center min-h-[40vh]">
            <span className="h-8 w-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
          </div>
        </Container>
      </Section>
    );
  }

  const name = user?.user_metadata?.full_name as string | undefined;
  const email = user?.email;
  const joinedAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <Section spacing="xl">
      <Container size="sm">
        <div className="max-w-lg mx-auto">

          {/* Page heading */}
          <h1 className="font-display text-3xl font-bold text-charcoal dark:text-ivory mb-8 text-center">
            My Profile
          </h1>

          {/* Profile card */}
          <div className="bg-white dark:bg-charcoal-700 rounded-2xl shadow-card-lg border border-border p-8">

            {/* Avatar + name */}
            <div className="flex flex-col items-center gap-3 mb-8 pb-8 border-b border-border">
              <AvatarInitials name={name} email={email} />
              <div className="text-center">
                <h2 className="font-display text-xl font-semibold text-charcoal dark:text-ivory">
                  {name ?? "Velvet Spark Customer"}
                </h2>
                {joinedAt && (
                  <p className="text-xs text-charcoal-400 dark:text-charcoal-300 mt-1">
                    Member since {joinedAt}
                  </p>
                )}
              </div>
            </div>

            {/* Account details */}
            <div className="flex flex-col gap-4 mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">
                Account Details
              </h3>

              {/* Name row */}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-charcoal-400 dark:text-charcoal-300 font-medium">
                  Full Name
                </span>
                <span className="text-sm text-charcoal dark:text-ivory font-medium">
                  {name ?? "—"}
                </span>
              </div>

              {/* Email row */}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-charcoal-400 dark:text-charcoal-300 font-medium">
                  Email Address
                </span>
                <span className="text-sm text-charcoal dark:text-ivory font-medium">
                  {email}
                </span>
              </div>

              {/* Auth provider */}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-charcoal-400 dark:text-charcoal-300 font-medium">
                  Sign-in Method
                </span>
                <span className="text-sm text-charcoal dark:text-ivory font-medium capitalize">
                  {user?.app_metadata?.provider ?? "email"}
                </span>
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-col gap-2 mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">
                Quick Access
              </h3>
              {[
                { label: "My Orders", href: "/orders" },
                { label: "My Wishlist", href: "/wishlist" },
                { label: "Change Password", href: "/auth/update-password" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border border-border hover:border-gold/40 hover:bg-gold/5 transition-colors group"
                >
                  <span className="text-sm text-charcoal dark:text-ivory group-hover:text-gold transition-colors">
                    {item.label}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-charcoal-400 group-hover:text-gold transition-colors"
                    aria-hidden="true"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Sign out */}
            <form action={signOut}>
              <Button
                type="submit"
                variant="outline"
                size="md"
                fullWidth
                className="border-destructive/50 text-destructive hover:bg-destructive hover:text-white hover:border-destructive"
              >
                Sign Out
              </Button>
            </form>
          </div>

        </div>
      </Container>
    </Section>
  );
}
/////////////////////////////
// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   FadeIn,
//   SlideUp,
//   StaggerChildren,
//   StaggerItem,
//   ScaleOnHover,
// } from "@/components/motion";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface Order {
//   id: string;
//   productName: string;
//   price: string;
//   status: "Delivered" | "Pending" | "Processing";
//   image: string;
//   date: string;
// }

// interface WishlistItem {
//   id: string;
//   name: string;
//   price: string;
//   image: string;
// }

// // ─── Mock Data ────────────────────────────────────────────────────────────────

// const orders: Order[] = [
//   {
//     id: "#VS-1024",
//     productName: "Celestial Diamond Choker",
//     price: "₹4,299",
//     status: "Delivered",
//     image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop",
//     date: "12 Mar 2025",
//   },
//   {
//     id: "#VS-1019",
//     productName: "Rose Gold Halo Earrings",
//     price: "₹2,149",
//     status: "Delivered",
//     image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=200&fit=crop",
//     date: "28 Feb 2025",
//   },
//   {
//     id: "#VS-1031",
//     productName: "Pearl Cascade Bracelet",
//     price: "₹3,599",
//     status: "Pending",
//     image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=200&h=200&fit=crop",
//     date: "05 Apr 2025",
//   },
//   {
//     id: "#VS-1035",
//     productName: "Golden Arch Necklace",
//     price: "₹5,799",
//     status: "Processing",
//     image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop",
//     date: "10 Apr 2025",
//   },
// ];

// const wishlist: WishlistItem[] = [
//   {
//     id: "w1",
//     name: "Moonlit Solitaire Ring",
//     price: "₹3,199",
//     image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop",
//   },
//   {
//     id: "w2",
//     name: "Ivory Drape Necklace",
//     price: "₹4,899",
//     image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=300&h=300&fit=crop",
//   },
//   {
//     id: "w3",
//     name: "Velvet Band Cuff",
//     price: "₹1,999",
//     image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=300&h=300&fit=crop",
//   },
//   {
//     id: "w4",
//     name: "Aurora Drop Earrings",
//     price: "₹2,699",
//     image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=300&h=300&fit=crop",
//   },
// ];

// // ─── Status Badge ─────────────────────────────────────────────────────────────

// function StatusBadge({ status }: { status: Order["status"] }) {
//   const styles = {
//     Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
//     Pending: "bg-amber-50 text-amber-700 border-amber-200",
//     Processing: "bg-blue-50 text-blue-700 border-blue-200",
//   };
//   return (
//     <span
//       className={cn(
//         "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
//         styles[status]
//       )}
//     >
//       <span
//         className={cn("w-1.5 h-1.5 rounded-full", {
//           "bg-emerald-500": status === "Delivered",
//           "bg-amber-500": status === "Pending",
//           "bg-blue-500": status === "Processing",
//         })}
//       />
//       {status}
//     </span>
//   );
// }

// // ─── Section Heading ─────────────────────────────────────────────────────────

// function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
//   return (
//     <FadeIn direction="up" className="mb-8">
//       <div className="flex flex-col gap-1">
//         <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
//           {title}
//         </h2>
//         {subtitle && (
//           <p className="text-sm text-muted-foreground font-sans">{subtitle}</p>
//         )}
//         <div className="divider-gold mt-3 max-w-[120px]" />
//       </div>
//     </FadeIn>
//   );
// }

// // ─── Profile Detail Row ───────────────────────────────────────────────────────

// function DetailRow({ label, value, icon }: { label: string; value: string; icon: string }) {
//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-4 border-b border-border last:border-0">
//       <div className="flex items-center gap-2 w-40 shrink-0">
//         <span className="text-base">{icon}</span>
//         <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground font-sans">
//           {label}
//         </span>
//       </div>
//       <span className="text-foreground font-sans text-sm sm:text-base pl-6 sm:pl-0">{value}</span>
//     </div>
//   );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────

// export default function ProfilePage() {
//   const [wishlistItems, setWishlistItems] = useState(wishlist);

//   const removeWishlist = (id: string) => {
//     setWishlistItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   return (
//     <main className="min-h-screen bg-background text-foreground font-sans">
//       {/* ── Decorative top bar ── */}
//       <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />

//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20">

//         {/* ══════════════════════════════════════════════════════
//             1. PROFILE HERO
//         ══════════════════════════════════════════════════════ */}
//         <FadeIn direction="up" duration={0.6}>
//           <section className="flex flex-col items-center text-center gap-6 py-8">
//             {/* Avatar */}
//             <div className="relative">
//               <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-[#C9A84C]/30 shadow-lg ring-2 ring-[#C9A84C]/10">
//                 <img
//                   src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face"
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               {/* Gold glow ring */}
//               <div className="absolute inset-0 rounded-full ring-1 ring-[#C9A84C]/20 scale-110 pointer-events-none" />
//               {/* Online dot */}
//               <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-background" />
//             </div>

//             {/* Name & tagline */}
//             <div className="space-y-2">
//               <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
//                 Aanya <span className="text-gradient-gold">Sharma</span>
//               </h1>
//               <p className="text-muted-foreground text-sm font-sans tracking-wide">
//                 aanya.sharma@gmail.com · Member since 2023
//               </p>
//               <div className="flex items-center justify-center gap-1 mt-1">
//                 {[...Array(5)].map((_, i) => (
//                   <svg key={i} className="w-3.5 h-3.5 text-[#C9A84C]" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//                 <span className="text-xs text-muted-foreground ml-1">Velvet Gold Member</span>
//               </div>
//             </div>

//             <Button variant="primary" size="md" className="mt-2 gap-2">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//               </svg>
//               Edit Profile
//             </Button>
//           </section>
//         </FadeIn>

//         {/* ══════════════════════════════════════════════════════
//             2. PROFILE DETAILS
//         ══════════════════════════════════════════════════════ */}
//         <section>
//           <SectionHeading title="Profile Details" subtitle="Your personal information" />
//           <SlideUp delay={0.1}>
//             <div className="bg-card border border-border rounded-md shadow-sm px-6 py-2">
//               <DetailRow icon="👤" label="Full Name" value="Aanya Sharma" />
//               <DetailRow icon="✉️" label="Email" value="aanya.sharma@gmail.com" />
//               <DetailRow icon="📞" label="Phone" value="+91 98765 43210" />
//               <DetailRow icon="📍" label="Address" value="42, Rosewater Lane, Jaipur, Rajasthan – 302001" />
//             </div>
//           </SlideUp>
//         </section>

//         {/* ══════════════════════════════════════════════════════
//             3. ORDER HISTORY
//         ══════════════════════════════════════════════════════ */}
//         <section>
//           <SectionHeading
//             title="Order History"
//             subtitle={`${orders.length} orders placed`}
//           />
//           <StaggerChildren stagger={0.1} delay={0.05} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {orders.map((order) => (
//               <StaggerItem key={order.id}>
//                 <ScaleOnHover scale={1.015}>
//                   <div className="group flex gap-4 bg-card border border-border rounded-md p-4 shadow-sm hover:border-[#C9A84C]/40 hover:shadow-md transition-all duration-300">
//                     {/* Image */}
//                     <div className="w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden shrink-0 border border-border">
//                       <img
//                         src={order.image}
//                         alt={order.productName}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                       />
//                     </div>
//                     {/* Info */}
//                     <div className="flex flex-col justify-between flex-1 min-w-0">
//                       <div>
//                         <p className="font-display font-semibold text-sm md:text-base text-foreground leading-tight truncate">
//                           {order.productName}
//                         </p>
//                         <p className="text-xs text-muted-foreground mt-0.5 font-sans">
//                           {order.id} · {order.date}
//                         </p>
//                       </div>
//                       <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
//                         <span className="text-[#C9A84C] font-semibold text-sm font-sans">
//                           {order.price}
//                         </span>
//                         <StatusBadge status={order.status} />
//                       </div>
//                     </div>
//                   </div>
//                 </ScaleOnHover>
//               </StaggerItem>
//             ))}
//           </StaggerChildren>
//         </section>

//         {/* ══════════════════════════════════════════════════════
//             4. WISHLIST
//         ══════════════════════════════════════════════════════ */}
//         <section>
//           <SectionHeading
//             title="My Wishlist"
//             subtitle={`${wishlistItems.length} saved items`}
//           />
//           {wishlistItems.length === 0 ? (
//             <FadeIn direction="up">
//               <div className="text-center py-16 text-muted-foreground font-sans text-sm">
//                 <span className="text-4xl block mb-3">♡</span>
//                 Your wishlist is empty. Explore our collections.
//               </div>
//             </FadeIn>
//           ) : (
//             <StaggerChildren
//               stagger={0.08}
//               delay={0.05}
//               className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4"
//             >
//               {wishlistItems.map((item) => (
//                 <StaggerItem key={item.id}>
//                   <ScaleOnHover scale={1.02}>
//                     <div className="group relative bg-card border border-border rounded-md overflow-hidden shadow-sm hover:border-[#C9A84C]/40 hover:shadow-md transition-all duration-300">
//                       {/* Remove button */}
//                       <button
//                         onClick={() => removeWishlist(item.id)}
//                         aria-label="Remove from wishlist"
//                         className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-rose-500 hover:border-rose-300 transition-colors duration-200 text-base leading-none"
//                       >
//                         ♡
//                       </button>
//                       {/* Image */}
//                       <div className="aspect-square overflow-hidden">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                         />
//                       </div>
//                       {/* Details */}
//                       <div className="p-3 space-y-1">
//                         <p className="font-display font-semibold text-xs md:text-sm text-foreground leading-snug line-clamp-2">
//                           {item.name}
//                         </p>
//                         <p className="text-[#C9A84C] font-semibold text-xs font-sans">{item.price}</p>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           fullWidth
//                           className="mt-1 text-xs h-8"
//                         >
//                           Add to Cart
//                         </Button>
//                       </div>
//                     </div>
//                   </ScaleOnHover>
//                 </StaggerItem>
//               ))}
//             </StaggerChildren>
//           )}
//         </section>

//         {/* ══════════════════════════════════════════════════════
//             5. LOGOUT
//         ══════════════════════════════════════════════════════ */}
//         <FadeIn direction="up" delay={0.1}>
//           <section className="flex flex-col items-center gap-4 pt-4 pb-12">
//             <div className="divider-gold w-full max-w-xs" />
//             <p className="text-xs text-muted-foreground font-sans tracking-wide text-center">
//               You are signed in as <span className="text-[#C9A84C]">aanya.sharma@gmail.com</span>
//             </p>
//             <Button
//               variant="ghost"
//               size="md"
//               className="border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/5 hover:border-[#C9A84C]/70 gap-2"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               Sign Out
//             </Button>
//             <p className="text-[10px] text-muted-foreground/50 font-sans tracking-widest uppercase">
//               Velvet Spark · Luxury Jewellery
//             </p>
//           </section>
//         </FadeIn>

//       </div>
//     </main>
//   );
// }
