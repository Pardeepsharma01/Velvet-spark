'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function BrandStory() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="story" ref={ref} className="bg-beige py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* ── Left: Image ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
            <img
              src="https://plus.unsplash.com/premium_photo-1669977749936-1343d0b0b4d9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Jewellery craftsmanship"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/15 to-transparent" />
          </div>

          {/* Offset decorative box */}
          <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 rounded-2xl border border-gold/20 -z-10" />

          {/* Small accent image */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -right-6 w-28 h-28 rounded-xl overflow-hidden shadow-xl border-2 border-ivory hidden md:block"
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1669977749936-1343d0b0b4d9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Jewellery detail"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* ── Right: Text ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          <span className="font-jost text-xs tracking-[0.2em] uppercase text-gold font-medium">
            Our Story
          </span>

          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-charcoal leading-[1.2]">
            Luxury Made<br />
            <span className="italic text-rose-gold">Accessible</span> to All
          </h2>

          {/* Gold divider */}
          <div className="w-12 h-px bg-gradient-to-r from-gold to-rose-gold" />

          <p className="font-jost text-base text-charcoal/60 font-light leading-relaxed">
            At Velvet Spark, we believe every woman deserves to feel adorned and celebrated — without compromise. Our collections are thoughtfully designed to bring the opulence of fine jewellery into your everyday life.
          </p>

          <p className="font-jost text-base text-charcoal/60 font-light leading-relaxed">
            Each piece is meticulously crafted using premium materials, ensuring lasting beauty that complements your unique radiance. From intimate gatherings to grand celebrations, Velvet Spark adorns every moment.
          </p>

          {/* Signature */}
          <div className="flex items-center gap-4 pt-2">
            <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center">
              <span className="font-playfair text-gold font-semibold text-lg">V</span>
            </div>
            <div>
              <p className="font-playfair italic text-charcoal text-sm">Founder, Velvet Spark</p>
              <p className="font-jost text-xs text-charcoal/40 tracking-wide mt-0.5">Since 2026</p>
            </div>
          </div>

          <motion.a
            href="#"
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 text-gold font-jost text-sm font-medium tracking-wide mt-2 w-fit border-b border-gold/40 pb-1 hover:border-gold transition-colors duration-200"
          >
            Discover Our Journey →
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}
