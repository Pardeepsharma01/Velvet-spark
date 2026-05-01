'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ShieldCheck, Gem, Sparkles, RotateCcw } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Tarnish-Free Quality',
    desc: 'Crafted with premium anti-tarnish coatings that maintain brilliance for years without any special care.',
  },
  {
    icon: Gem,
    title: 'Affordable Luxury',
    desc: 'Experience the elegance of fine jewellery at a fraction of the cost, without compromising on beauty.',
  },
  {
    icon: Sparkles,
    title: 'Trendy Designs',
    desc: 'Stay ahead with our ever-evolving collection inspired by global fashion weeks and runway trends.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    desc: 'Shop with complete confidence. Hassle-free 15-day returns with no questions asked.',
  },
]

export default function WhyUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-blush py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-jost text-xs tracking-[0.2em] uppercase text-gold font-medium">
            The Velvet Spark Promise
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-charcoal mt-3 leading-tight">
            Why Choose Us?
          </h2>
          <div className="flex justify-center mt-5">
            <div className="w-12 h-px bg-gradient-to-r from-gold to-rose-gold" />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(212,175,55,0.12)' }}
              className="bg-ivory rounded-2xl p-8 flex flex-col gap-5 border border-gold/10 transition-all duration-300 cursor-default"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <feat.icon
                  size={22}
                  className="text-gold"
                  strokeWidth={1.5}
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="font-playfair text-lg font-semibold text-charcoal">
                  {feat.title}
                </h3>
                <p className="font-jost text-sm text-charcoal/55 font-light leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              {/* Bottom accent */}
              <div className="w-8 h-px bg-gold/40 mt-auto" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
