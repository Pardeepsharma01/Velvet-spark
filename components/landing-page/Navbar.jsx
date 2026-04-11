'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'

const navLinks = ['Collections', 'About', 'Lookbook', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-md border-b border-gold/20 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-playfair text-2xl font-semibold tracking-wide text-charcoal">
            Velvet<span className="text-gold">Spark</span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="font-jost text-xs font-medium tracking-[0.15em] uppercase text-charcoal/70 hover:text-gold transition-colors duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative"
            >
              <ShoppingBag size={20} className="text-charcoal/70 hover:text-gold transition-colors" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-white text-[9px] rounded-full flex items-center justify-center font-jost font-medium">
                0
              </span>
            </motion.button>
            <motion.a
              href="#"
              whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(212,175,55,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="bg-gold text-white font-jost text-xs font-medium tracking-[0.12em] uppercase px-6 py-3 transition-all duration-200"
            >
              Shop Now
            </motion.a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-charcoal"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ivory/98 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMenuOpen(false)}
                className="font-playfair text-2xl text-charcoal hover:text-gold transition-colors"
              >
                {link}
              </motion.a>
            ))}
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="bg-gold text-white font-jost text-sm tracking-widest uppercase px-10 py-4 mt-4"
            >
              Shop Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
