"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectWishlistItems, removeFromWishlist, clearWishlist } from "@/store/wishlistSlice";
import { addToCart } from "@/store/cartSlice";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectWishlistItems);

  if (items.length === 0) {
    return (
      <Section spacing="xl">
        <Container size="sm">
          <FadeIn>
            <div className="flex flex-col items-center justify-center text-center py-20">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-5xl mb-4 block"
                aria-hidden="true"
              >
                ♡
              </motion.span>
              <h1 className="font-display text-3xl font-bold text-charcoal dark:text-ivory mb-3">
                Your wishlist is empty
              </h1>
              <p className="text-sm text-charcoal-400 mb-6">
                Start saving your favourite pieces here.
              </p>
              <Button variant="primary" size="md" asChild>
                <Link href="/shop">Browse Collection</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>
    );
  }

  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col gap-6">
          <FadeIn>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal dark:text-ivory">My Wishlist</h1>
                <p className="text-sm text-charcoal-400 mt-1">{items.length} item{items.length !== 1 && "s"} saved</p>
              </div>
              <button onClick={() => dispatch(clearWishlist())} className="text-xs text-destructive hover:text-destructive/80 font-medium transition-colors">Clear Wishlist</button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence>
              {items.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="relative group/card"
                >
                  <ProductCard product={product} />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-white/95 dark:from-charcoal-700/95 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-b-xl flex gap-2">
                    <button onClick={(e) => { e.preventDefault(); dispatch(addToCart(product)); }}
                      className="flex-1 h-8 rounded-lg bg-gold text-white text-xs font-medium hover:bg-gold-700 transition-colors">Add to Cart</button>
                    <button onClick={(e) => { e.preventDefault(); dispatch(removeFromWishlist(product.id)); }}
                      className="h-8 w-8 flex items-center justify-center rounded-lg border border-destructive/40 text-destructive hover:bg-destructive hover:text-white transition-all" aria-label="Remove from wishlist">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
