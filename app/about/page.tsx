// "use client";

// // import { FadeIn, SlideUp, StaggerChildren, StaggerItem } from "@/components/motion/page";
// import { FadeIn, SlideUp, StaggerChildren, StaggerItem } from "@/components/motion";

// export default function AboutPage() {
//   return (
//     <main className="bg-background text-foreground">

//       {/* ═════════ HERO ═════════ */}
//       <section className="py-24 px-6 text-center">
//         <FadeIn direction="up">
//           <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
//             The Spark Behind{" "}
//             <span className="text-gradient-gold">Velvet Spark</span>
//           </h1>
//         </FadeIn>

//         <FadeIn direction="up" delay={0.1}>
//           <p className="mt-6 text-foreground/70 max-w-2xl mx-auto text-base md:text-lg">
//             A journey of elegance, craftsmanship, and timeless artificial jewellery
//             designed to redefine everyday luxury.
//           </p>
//         </FadeIn>
//       </section>

//       {/* ═════════ PHILOSOPHY ═════════ */}
//       <section className="py-24 px-6 md:px-16">
//         <div className="grid md:grid-cols-2 gap-12 items-center">

//           {/* IMAGE */}
//           <FadeIn direction="left">
//             <div className="h-[420px] bg-muted border border-gold/20 rounded-md flex items-center justify-center">
//               <span className="text-foreground/40">Jewelry Image</span>
//             </div>
//           </FadeIn>

//           {/* TEXT */}
//           <FadeIn direction="right">
//             <h2 className="font-display text-3xl md:text-4xl">
//               Brand Philosophy
//             </h2>

//             <p className="mt-6 text-foreground/70 leading-relaxed">
//               At <span className="text-gold font-medium">Velvet Spark</span>, we believe luxury is not about price —
//               it is about emotion, detail, and presence.
//             </p>

//             <ul className="mt-6 space-y-3 text-foreground/80">
//               <li>✨ Luxury that feels accessible</li>
//               <li>💎 Elegance crafted in every detail</li>
//               <li>🪡 Precision-driven craftsmanship</li>
//             </ul>
//           </FadeIn>
//         </div>
//       </section>

//       {/* ═════════ CORE VALUES (STAGGERED) ═════════ */}
//       <section className="py-24 px-6 md:px-16 bg-muted/40">

//         <FadeIn direction="up">
//           <h2 className="text-center font-display text-3xl md:text-4xl mb-12">
//             Our Core Values
//           </h2>
//         </FadeIn>

//         <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

//           <StaggerItem>
//             <div className="p-6 rounded-md border border-gold/20 bg-background hover:shadow-sm transition">
//               <h3 className="font-display text-xl text-gold">Quality</h3>
//               <p className="mt-3 text-sm text-foreground/70">
//                 Premium materials with lasting shine
//               </p>
//             </div>
//           </StaggerItem>

//           <StaggerItem>
//             <div className="p-6 rounded-md border border-gold/20 bg-background hover:shadow-sm transition">
//               <h3 className="font-display text-xl text-gold">Authenticity</h3>
//               <p className="mt-3 text-sm text-foreground/70">
//                 Honest craftsmanship in every piece
//               </p>
//             </div>
//           </StaggerItem>

//           <StaggerItem>
//             <div className="p-6 rounded-md border border-gold/20 bg-background hover:shadow-sm transition">
//               <h3 className="font-display text-xl text-gold">Design</h3>
//               <p className="mt-3 text-sm text-foreground/70">
//                 Modern elegance with timeless appeal
//               </p>
//             </div>
//           </StaggerItem>

//           <StaggerItem>
//             <div className="p-6 rounded-md border border-gold/20 bg-background hover:shadow-sm transition">
//               <h3 className="font-display text-xl text-gold">Customer First</h3>
//               <p className="mt-3 text-sm text-foreground/70">
//                 Experience built around trust
//               </p>
//             </div>
//           </StaggerItem>

//         </StaggerChildren>
//       </section>

//       {/* ═════════ FOUNDER NOTE ═════════ */}
//       <section className="py-24 px-6 md:px-16">

//         <SlideUp>
//           <div className="bg-muted border border-gold/10 rounded-md p-10 md:p-16 text-center">
//             <h2 className="font-display text-3xl md:text-4xl">
//               Founder’s Note
//             </h2>

//             <p className="mt-6 text-foreground/70 max-w-3xl mx-auto leading-relaxed">
//               Velvet Spark was born from a vision — to make luxury jewelry feel personal,
//               emotional, and timeless. Every piece is crafted with passion and precision.
//             </p>

//             <p className="mt-6 text-gradient-gold font-medium">
//               “Elegance is not worn, it is felt.”
//             </p>
//           </div>
//         </SlideUp>

//       </section>

//     </main>
//   );
// }
///////////////////////
"use client";

import React from "react";
import Image from "next/image";
import { 
  FadeIn, 
  StaggerChildren, 
  StaggerItem, 
  SlideUp 
} from "@/components/motion"; // Aapke path ke mutabik
import { Diamond, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  const coreValues = [
    {
      title: "Uncompromising Quality",
      description: "Each piece is crafted with precision using high-grade materials that mimic the brilliance of real diamonds.",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    },
    {
      title: "Authentic Design",
      description: "Our jewelry tells a story of heritage blended with modern aesthetics, unique to the Velvet Spark signature.",
      icon: <Diamond className="w-6 h-6 text-primary" />,
    },
    {
      title: "Timeless Elegance",
      description: "We believe in beauty that transcends trends. Our designs are made to be cherished for generations.",
      icon: <Sparkles className="w-6 h-6 text-primary" />,
    },
    {
      title: "Customer First",
      description: "A luxury experience isn't just about the product, but the personalized care we provide to our patrons.",
      icon: <UserCheck className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <main className="bg-background min-h-screen">
      
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 flex flex-col items-center justify-center text-center px-4">
        <FadeIn direction="up" duration={0.8}>
          <span className="uppercase tracking-[0.3em] text-sm text-primary mb-4 block font-medium">
            Est. 2026
          </span>
          <h1 className="max-w-4xl mx-auto">
            The <span className="text-gradient-gold">Spark</span> Behind Velvet
          </h1>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg font-sans">
            Redefining luxury through artificial jewelry that carries the soul of craftsmanship 
            and the brilliance of a thousand stars.
          </p>
        </FadeIn>
      </section>

      {/* ─── Brand Philosophy Section ────────────────────────────── */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left" className="relative aspect-[4/5] overflow-hidden rounded-md border border-border shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1697684459917-e91efb33a337?w=1374&q=80" // Replace with real jewelry craft image
              alt="Artisanal Jewelry Crafting"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </FadeIn>
          
          <FadeIn direction="right" className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-foreground">Our{" "}
                <span className="text-gradient-gold">Philosophy</span>
                </h2>
              <div className="h-px w-24 bg-primary" />
            </div>
            <p className="text-foreground text-lg leading-relaxed font-sans">
              At Velvet Spark, we believe that luxury should be an experience, not just a price tag. 
              Our journey started with a simple vision: to create jewelry that empowers 
              individuals to shine without compromise.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every curve, every stone, and every polish is a testament to our dedication 
              to excellence. We merge traditional artisanal techniques with contemporary 
              designs to bring you "Affordable Opulence."
            </p>
            {/* <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:opacity-90 transition-all shadow-md">
              Discover Collections
            </button> */}
            <Button variant="primary" size="lg" >
              Discover Collections
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* ─── Core Values (Grid) ──────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white/30">
        <div className="container mx-auto px-4 text-center mb-16">
          <FadeIn>
            <h2 className="mb-4">Our {""}
                <span className="text-gradient-gold">Core {" "}</span>
                Values</h2>
            <p className="text-muted-foreground">The pillars that define the Velvet Spark experience.</p>
          </FadeIn>
        </div>

        <StaggerChildren className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <StaggerItem key={index} className="p-8 bg-background border border-primary/20 rounded-md hover:border-primary transition-colors group">
              <div className="mb-6 p-3 w-fit bg-muted rounded-full group-hover:bg-primary/10 transition-colors">
                {value.icon}
              </div>
              <h4 className="mb-3 text-foreground">{value.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ─── Founder's Note ──────────────────────────────────────── */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <SlideUp className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-display italic text-3xl md:text-4xl text-foreground">
              "Jewelry is a piece of art that becomes a part of you. With Velvet Spark, 
              we wanted to create art that is accessible yet remains incredibly personal."
            </h2>
            <div className="divider-gold max-w-[200px] mx-auto" />
            <div className="space-y-2">
              <p className="font-display text-xl text-primary tracking-wide">— THE FOUNDER'S VISION</p>
              <p className="text-muted-foreground text-sm uppercase tracking-widest">Velvet Spark Studio</p>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* ─── Footer Spacing ──────────────────────────────────────── */}
      {/* <div className="py-12 border-t border-border/50 text-center">
        <p className="text-xs text-muted-foreground tracking-widest uppercase">
          © 2026 Velvet Spark Luxury Artificial Jewelry
        </p>
      </div> */}

    </main>
  );
};

export default AboutPage;