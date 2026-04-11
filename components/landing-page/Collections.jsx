'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

const collections = [
  {
    title: 'Necklaces',
    subtitle: '48 Designs',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80',
    tag: 'Bestseller',
  },
  {
    title: 'Earrings',
    subtitle: '72 Designs',
    image: 'https://images.unsplash.com/photo-1714733831162-0a6e849141be?q=80&w=1435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tag: 'New',
  },
  {
    title: 'Bracelets',
    subtitle: '36 Designs',
    image: 'https://images.unsplash.com/photo-1721206624492-3d05631471ea?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tag: 'Trending',
  },
]

function CollectionCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative cursor-pointer"
    >
      {/* Image container */}
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-beige">
        <motion.img
          src={item.image}
          alt={item.title}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-full object-cover"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/35 transition-all duration-500" />

        {/* View Collection button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-ivory text-charcoal font-jost text-sm font-medium tracking-[0.1em] uppercase px-6 py-3 rounded-none shadow-lg"
          >
            View Collection
            <ArrowRight size={14} />
          </motion.button>
        </div>

        {/* Tag */}
        <div className="absolute top-4 left-4 bg-gold text-white font-jost text-[10px] font-medium tracking-[0.12em] uppercase px-3 py-1.5 rounded-full">
          {item.tag}
        </div>
      </div>

      {/* Card text */}
      <div className="pt-4 flex items-end justify-between">
        <div>
          <h3 className="font-playfair text-xl font-semibold text-charcoal group-hover:text-gold transition-colors duration-200">
            {item.title}
          </h3>
          <p className="font-jost text-sm text-charcoal/45 mt-1 tracking-wide">{item.subtitle}</p>
        </div>
        <motion.div
          whileHover={{ x: 4 }}
          className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300"
        >
          <ArrowRight size={14} className="text-gold group-hover:text-white transition-colors duration-300" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Collections() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="collections" className="bg-ivory py-24 md:py-32">
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
            Curated For You
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-charcoal mt-3 leading-tight">
            Featured Collections
          </h2>
          <p className="font-jost text-base text-charcoal/50 mt-4 max-w-md mx-auto font-light">
            Explore our most-loved categories, each crafted with precision and passion.
          </p>
          <div className="flex justify-center mt-5">
            <div className="w-12 h-px bg-gradient-to-r from-gold to-rose-gold" />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((item, i) => (
            <CollectionCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.03, boxShadow: '0 6px 24px rgba(212,175,55,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border border-gold text-gold font-jost text-sm font-medium tracking-[0.12em] uppercase px-10 py-4 hover:bg-gold hover:text-white transition-all duration-300"
          >
            View All Collections
            <ArrowRight size={14} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}
