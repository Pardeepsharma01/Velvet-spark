'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Variants } from 'framer-motion'



// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   show: (i = 0) => ({
//     opacity: 1, y: 0,
//     transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 },
//   }),
// }

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: {
      duration: 0.75,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      delay: i * 0.12
    },
  }),
}

export default function Hero() {
  return (
    <section className="relative  bg-ivory overflow-hidden flex items-center ">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-beige via-ivory to-transparent" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-gradient-to-tr from-blush/60 to-transparent" />
        <div className="absolute top-1/3 right-[28%] w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-[15%] w-48 h-48 rounded-full bg-rose-gold/8 blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-0 pb-16 w-full grid md:grid-cols-2 gap-12 items-center ">

        {/* ── Left: Text ── */}
        <div className="flex flex-col gap-6 ">
          {/* Pill badge */}
          <motion.div
            variants={fadeUp} custom={0} initial="hidden" animate="show"
            className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 rounded-full px-4 py-2 w-fit"
          >
            <Sparkles size={13} className="text-gold" />
            <span className="font-jost text-xs tracking-[0.15em] uppercase text-gold font-medium">
              New Collection 2026
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp} custom={1} initial="hidden" animate="show"
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-semibold text-charcoal leading-[1.1] tracking-tight"
          >
            Where Elegance<br />
            <span className="italic text-gold">Meets</span> Everyday
          </motion.h1>

          {/* Divider */}
          <motion.div
            variants={fadeUp} custom={2} initial="hidden" animate="show"
            className="w-16 h-px bg-gradient-to-r from-gold to-rose-gold"
          />

          {/* Subheading */}
          <motion.p
            variants={fadeUp} custom={3} initial="hidden" animate="show"
            className="font-jost text-base md:text-lg text-charcoal/60 font-light leading-relaxed max-w-md"
          >
            Premium Artificial Jewellery — Crafted to Dazzle. Each piece tells a story of beauty, craftsmanship, and timeless elegance.
          </motion.p>

          {/* CTAs */}
          {/* <motion.div
            variants={fadeUp} custom={4} initial="hidden" animate="show"
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <motion.a
              href="#collections"
              whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(212,175,55,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-gold text-white font-jost text-sm font-medium tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300"
            >
              Shop Now
              <ArrowRight size={15} />
            </motion.a>
            <motion.a
              href="#story"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border border-charcoal/25 text-charcoal font-jost text-sm font-medium tracking-[0.1em] uppercase px-8 py-4 hover:border-gold hover:text-gold transition-all duration-300"
            >
              Our Story
            </motion.a>
          </motion.div> */}

           <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={4}
      className="flex flex-col sm:flex-row gap-3 mt-2"
    >
      {/* Primary Button */}
      <motion.div
        whileHover={{
          scale: 1.04,
          boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
        }}
        whileTap={{ scale: 0.97 }}
      >
        <Button asChild size="lg">
          <Link href="/shop" className="flex items-center gap-2">
            Shop the Collection
            <ArrowRight size={16} />
          </Link>
        </Button>
      </motion.div>

      {/* Outline Button */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button variant="outline" size="lg" asChild>
          <Link href="/new-arrivals">New Arrivals</Link>
        </Button>
      </motion.div>
    </motion.div>
          
          
          
          
              {/* <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/shop">Shop the Collection</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/new-arrivals">New Arrivals</Link>
                </Button>
              </div> */}

              
            

          {/* Stats */}
          <motion.div
            variants={fadeUp} custom={5} initial="hidden" animate="show"
            className="flex gap-8 pt-4 border-t border-charcoal/10"
          >
            {[['10K+', 'Happy Customers'], ['500+', 'Unique Designs'], ['4.9★', 'Rating']].map(([num, label]) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-playfair text-2xl font-semibold text-gold">{num}</span>
                <span className="font-jost text-xs text-charcoal/50 tracking-wide">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Image ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          {/* Decorative ring */}
          <div className="absolute w-[420px] h-[420px] md:w-[500px] md:h-[500px] rounded-full border border-gold/15 animate-pulse" />
          <div className="absolute w-[360px] h-[360px] md:w-[440px] md:h-[440px] rounded-full border border-rose-gold/10" />

          {/* Floating image wrapper */}
          <div className="animate-float relative z-10 w-[300px] h-[380px] md:w-[360px] md:h-[460px]">
            {/* Shimmer glow behind */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/20 via-transparent to-rose-gold/15 blur-2xl scale-110 animate-shimmer" />

            {/* Image card */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Premium Artificial Jewellery"
                className="w-full h-full object-cover object-center"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-5 -left-8 bg-ivory border border-gold/30 rounded-xl px-5 py-3 shadow-lg"
            >
              <p className="font-playfair text-xs italic text-charcoal/70">New Arrivals</p>
              <p className="font-jost text-sm font-medium text-gold mt-0.5">Spring 2026</p>
            </motion.div>

            {/* Floating mini badge */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-6 bg-rose-gold/10 border border-rose-gold/25 rounded-full px-4 py-2"
            >
              <p className="font-jost text-xs text-rose-gold font-medium tracking-wide">✦ Handcrafted</p>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-jost text-[10px] tracking-[0.2em] uppercase text-charcoal/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div> */}
    </section>
  )
}
