"use client"

import { motion } from 'framer-motion'

interface LoaderProps {
  text?: string
  showBrand?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { outer: 56, mid: 44, inner: 30, gem: 7 },
  md: { outer: 80, mid: 62, inner: 44, gem: 10 },
  lg: { outer: 104, mid: 82, inner: 58, gem: 13 },
}

export default function VelvetLoader({
  text = 'Loading',
  showBrand = true,
  size = 'md',
}: LoaderProps) {
  const s = sizes[size]

  return (
    <div className="flex flex-col items-center justify-center gap-7">
      {/* Brand name */}
      {showBrand && (
        <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-gold font-medium">
          Velvet Spark
        </p>
      )}

      {/* Rings */}
      <div className="relative flex items-center justify-center"
        style={{ width: s.outer, height: s.outer }}>

        {/* Gold spinner — clockwise */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full"
          style={{
            border: '1.5px solid transparent',
            borderTopColor: '#C9A84C',
            borderRightColor: 'rgba(201,168,76,0.3)',
          }}
        />

        {/* Outer pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full border border-gold/20"
        />

        {/* Mid ring wrapper */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="relative rounded-full border border-rose-gold/25 flex items-center justify-center"
          style={{ width: s.mid, height: s.mid }}
        >
          {/* Rose gold spinner — counter-clockwise */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full"
            style={{
              border: '1.5px solid transparent',
              borderBottomColor: '#B76E79',
              borderLeftColor: 'rgba(183,110,121,0.2)',
            }}
          />

          {/* Inner ring + diamond gem */}
          <div
            className="rounded-full border border-gold/15 flex items-center justify-center"
            style={{ width: s.inner, height: s.inner }}
          >
            <div
              className="bg-gold rotate-45 opacity-90"
              style={{ width: s.gem, height: s.gem }}
            />
          </div>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex gap-2 items-center">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay }}
            className="w-[5px] h-[5px] rounded-full"
            style={{ background: ['#C9A84C', '#C0956A', '#B76E79'][i] }}
          />
        ))}
      </div>

      {/* Text */}
      {text && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="font-sans text-[11px] tracking-[0.22em] uppercase text-charcoal/40"
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}