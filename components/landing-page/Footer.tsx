'use client'

import { motion } from 'framer-motion'
import { Instagram, Facebook } from 'lucide-react'

// Pinterest icon (not in lucide)
function PinterestIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.135-1.867 3.135-4.56 0-2.384-1.714-4.052-4.161-4.052-2.833 0-4.496 2.124-4.496 4.32 0 .856.33 1.772.741 2.272a.3.3 0 0 1 .069.284c-.076.312-.243.995-.276 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.938.29 1.931.446 2.962.446 5.522 0 10-4.477 10-10S17.522 2 12 2z"/>
    </svg>
  )
}

const footerLinks = {
  Shop: ['Necklaces', 'Earrings', 'Bracelets', 'Rings', 'New Arrivals'],
  Company: ['About Us', 'Lookbook', 'Blog', 'Careers', 'Press'],
  Support: ['FAQs', 'Track Order', 'Returns', 'Size Guide', 'Contact Us'],
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-ivory/10">

          {/* Brand col */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <a href="#" className="font-playfair text-2xl font-semibold tracking-wide">
              Velvet<span className="text-gold">Spark</span>
            </a>
            <p className="font-jost text-sm text-ivory/50 font-light leading-relaxed max-w-xs">
              Premium artificial jewellery crafted to elevate your everyday style. Luxury that doesn't cost a fortune.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-1">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: PinterestIcon, label: 'Pinterest' },
                { Icon: Facebook, label: 'Facebook' },
              ].map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full border border-ivory/15 flex items-center justify-center text-ivory/50 hover:text-gold hover:border-gold transition-all duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <h4 className="font-jost text-xs font-medium tracking-[0.18em] uppercase text-gold">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-jost text-sm text-ivory/45 hover:text-ivory transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-playfair italic text-gold text-sm">
            Velvet Spark — Shine Without Limits
          </p>
          <p className="font-jost text-xs text-ivory/30">
            © {new Date().getFullYear()} Velvet Spark. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
