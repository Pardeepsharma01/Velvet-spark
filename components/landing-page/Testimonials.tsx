'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const reviews = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    review:
      'Absolutely obsessed with my Velvet Spark necklace! The quality is stunning — my friends couldn\'t believe it wasn\'t real gold. Will definitely be ordering again.',
    avatar: 'PS',
    piece: 'Gold Layered Necklace',
  },
  {
    name: 'Anjali Mehta',
    location: 'Delhi',
    rating: 5,
    review:
      'I\'ve been searching for tarnish-free earrings forever. These are the real deal — worn them every day for 3 months and they still look brand new. Absolutely love Velvet Spark!',
    avatar: 'AM',
    piece: 'Rose Gold Drop Earrings',
  },
  {
    name: 'Kavya Reddy',
    location: 'Bangalore',
    rating: 5,
    review:
      'Ordered a bracelet set for my sister\'s birthday and she was absolutely delighted. The packaging was gorgeous, the quality was impeccable. This brand is truly premium.',
    avatar: 'KR',
    piece: 'Pearl Bracelet Set',
  },
  {
    name: 'Sneha Iyer',
    location: 'Chennai',
    rating: 5,
    review:
      'The customer service and product quality are both exceptional. My earrings arrived beautifully packaged and they sparkle like diamonds. Worth every penny!',
    avatar: 'SI',
    piece: 'Crystal Stud Earrings',
  },
]

// function Stars({ count }) {
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-gold text-gold" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const paginate = (dir: number) => {
    setDirection(dir)
    setCurrent((prev) => (prev + dir + reviews.length) % reviews.length)
  }

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000)
    return () => clearInterval(timer)
  }, [])

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  }

  return (
    <section className="bg-ivory py-24 md:py-32 overflow-hidden">
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
            What Our Customers Say
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-charcoal mt-3">
            Loved & Adored
          </h2>
          <div className="flex justify-center mt-5">
            <div className="w-12 h-px bg-gradient-to-r from-gold to-rose-gold" />
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-beige rounded-2xl p-8 md:p-12 border border-gold/10"
            >
              {/* Quote mark */}
              <div className="font-playfair text-7xl text-gold/20 leading-none mb-2 select-none">"</div>

              <Stars count={reviews[current].rating} />

              <p className="font-jost text-base md:text-lg text-charcoal/65 font-light leading-relaxed mt-5 mb-8">
                {reviews[current].review}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold to-rose-gold flex items-center justify-center">
                    <span className="font-playfair text-white text-sm font-semibold">
                      {reviews[current].avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-jost text-sm font-medium text-charcoal">
                      {reviews[current].name}
                    </p>
                    <p className="font-jost text-xs text-charcoal/45 mt-0.5">
                      {reviews[current].location}
                    </p>
                  </div>
                </div>
                <span className="font-jost text-xs text-gold/70 italic tracking-wide border border-gold/20 px-3 py-1.5 rounded-full">
                  {reviews[current].piece}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
              onClick={() => paginate(-1)}
              className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-200 group"
            >
              <ChevronLeft size={16} className="text-gold group-hover:text-white transition-colors" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-gold/25 hover:bg-gold/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
              onClick={() => paginate(1)}
              className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-200 group"
            >
              <ChevronRight size={16} className="text-gold group-hover:text-white transition-colors" />
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  )
}
