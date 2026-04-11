import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { getFeaturedProducts } from "@/lib/data/products";
import {
  FadeIn,
  SlideUp,
  StaggerChildren,
  StaggerItem,
} from "@/components/motion";
import Link from "next/link";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";
import Hero from "@/components/landing-page/Hero";
import BrandStory from "@/components/landing-page/BrandStory";
import Collections from "@/components/landing-page/Collections";
import Testimonials from "@/components/landing-page/Testimonials";
import Newsletter from "@/components/landing-page/Newsletter";
import WhyUs from "@/components/landing-page/WhyUs";

// ─── Category data ────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    name: "Necklaces",
    slug: "necklaces",
    icon: "✦",
    description: "Layered chains & pendants",
  },
  {
    name: "Earrings",
    slug: "earrings",
    icon: "✧",
    description: "Studs, drops & hoops",
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    icon: "❋",
    description: "Cuffs, chains & charms",
  },
  {
    name: "Rings",
    slug: "rings",
    icon: "◈",
    description: "Bands, solitaires & stackable",
  },
  {
    name: "Sets",
    slug: "sets",
    icon: "❖",
    description: "Complete curated sets",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const { data: featured } = await getFeaturedProducts();

  return (
    // <>
    //   {/* ═══════════ HERO ═══════════════════════════════════════════════ */}
    //   <Section
    //     spacing="xl"
    //     className="flex items-center min-h-[75vh]"
    //     bg="gold-subtle"
    //   >
    //     <Container>
    //       <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
    //         <FadeIn delay={0.1}>
    //           <span className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/5 text-gold text-xs font-semibold uppercase tracking-widest">
    //             New Collection · Spring 2026
    //           </span>
    //         </FadeIn>

    //         <SlideUp delay={0.2}>
    //           <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal dark:text-ivory leading-[1.1]">
    //             Wear the <span className="text-gradient-gold">Elegance</span>
    //             <br />
    //             of Every Moment
    //           </h1>
    //         </SlideUp>

    //         <FadeIn delay={0.4}>
    //           <p className="text-base md:text-lg text-charcoal-400 dark:text-charcoal-300 leading-relaxed max-w-lg">
    //             Premium artificial jewelry designed for the modern woman.
    //             Luxurious styles, everyday wearability, and timeless beauty —
    //             all without compromise.
    //           </p>
    //         </FadeIn>

    //         <FadeIn delay={0.55}>
    //           <div className="flex flex-col sm:flex-row gap-3 mt-2">
    //             <Button variant="primary" size="lg" asChild>
    //               <Link href="/shop">Shop the Collection</Link>
    //             </Button>
    //             <Button variant="outline" size="lg" asChild>
    //               <Link href="/new-arrivals">New Arrivals</Link>
    //             </Button>
    //           </div>
    //         </FadeIn>
    //       </div>
    //     </Container>
    //   </Section>

    //   {/* ═══════════ CATEGORIES ═════════════════════════════════════════ */}
    //   <Section spacing="lg" bg="ivory">
    //     <Container>
    //       <div className="flex flex-col items-center gap-10">
    //         <FadeIn>
    //           <div className="text-center max-w-md">
    //             <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal dark:text-ivory mb-3">
    //               Shop by Category
    //             </h2>
    //             <p className="text-sm text-charcoal-400 dark:text-charcoal-300">
    //               Discover our curated collections across every category
    //             </p>
    //           </div>
    //         </FadeIn>

    //         <StaggerChildren
    //           stagger={0.06}
    //           className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full"
    //         >
    //           {CATEGORIES.map((cat) => (
    //             <StaggerItem key={cat.slug}>
    //               <Link
    //                 href={`/shop?category=${cat.slug}`}
    //                 className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-white dark:bg-charcoal-700 border border-border hover:border-gold/40 hover:shadow-card hover:-translate-y-1 transition-all duration-300"
    //               >
    //                 <span
    //                   className="text-3xl group-hover:scale-110 transition-transform duration-300"
    //                   aria-hidden="true"
    //                 >
    //                   {cat.icon}
    //                 </span>
    //                 <div className="text-center">
    //                   <h3 className="font-sans text-sm font-semibold text-charcoal dark:text-ivory group-hover:text-gold transition-colors">
    //                     {cat.name}
    //                   </h3>
    //                   <p className="text-2xs text-charcoal-400 dark:text-charcoal-300 mt-0.5">
    //                     {cat.description}
    //                   </p>
    //                 </div>
    //               </Link>
    //             </StaggerItem>
    //           ))}
    //         </StaggerChildren>
    //       </div>
    //     </Container>
    //   </Section>

    //   {/* ═══════════ FEATURED PRODUCTS ══════════════════════════════════ */}
    //   <Section spacing="lg">
    //     <Container>
    //       <div className="flex flex-col gap-10">
    //         <FadeIn>
    //           <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
    //             <div>
    //               <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal dark:text-ivory mb-2">
    //                 Featured Picks
    //               </h2>
    //               <p className="text-sm text-charcoal-400 dark:text-charcoal-300">
    //                 Our most loved pieces, hand-picked for you
    //               </p>
    //             </div>
    //             <Button variant="outline" size="sm" asChild>
    //               <Link href="/shop">View All →</Link>
    //             </Button>
    //           </div>
    //         </FadeIn>

    //         <StaggerChildren
    //           stagger={0.08}
    //           className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
    //         >
    //           {featured?.map((product) => (
    //             <StaggerItem key={product.id}>
    //               <ProductCard product={product} />
    //             </StaggerItem>
    //           ))}
    //         </StaggerChildren>
    //       </div>
    //     </Container>
    //   </Section>

    //   {/* ═══════════ CTA BANNER ═════════════════════════════════════════ */}
    //   <Section spacing="lg" bg="charcoal">
    //     <Container>
    //       <FadeIn>
    //         <div className="flex flex-col items-center text-center gap-6 py-8">
    //           <h2 className="font-display text-3xl md:text-4xl font-bold text-ivory">
    //             Elegance Delivered to Your{" "}
    //             <span className="text-gradient-gold">Doorstep</span>
    //           </h2>
    //           <p className="text-sm text-charcoal-300 max-w-md leading-relaxed">
    //             Free shipping on orders above ₹999. Easy 7-day returns. Every
    //             piece beautifully gift-boxed.
    //           </p>
    //           <Button variant="primary" size="lg" asChild>
    //             <Link href="/shop">Start Shopping</Link>
    //           </Button>
    //         </div>
    //       </FadeIn>
    //     </Container>
    //   </Section>
    // </>
    ///////////////////////////
    <main className="bg-ivory overflow-x-hidden">
      {/* <Navbar /> */}
      <Hero />
      <BrandStory />
      <Collections />
      <WhyUs />
      <Testimonials />
      <Newsletter />
      {/* <Footer /> */}
    </main>
  );
}
