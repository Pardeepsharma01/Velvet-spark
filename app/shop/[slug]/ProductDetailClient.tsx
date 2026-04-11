"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { FadeIn, SlideUp } from "@/components/motion";
import { useProtectedActions } from "@/hooks/useProtectedActions";
import type { Product } from "@/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

// ─── Image Gallery ────────────────────────────────────────────────────────────

function ImageGallery({ images, name }: { images: Product["images"]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      {/* Thumbnail list */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        {images.length > 0 ? images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`
              flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 overflow-hidden transition-all duration-200
              ${i === activeIndex ? "border-gold" : "border-border hover:border-gold/40"}
            `}
          >
            <div className="w-full h-full bg-ivory dark:bg-charcoal-600 flex items-center justify-center">
              <span className="text-gold/40 text-lg">✦</span>
            </div>
          </button>
        )) : (
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 border-gold bg-ivory dark:bg-charcoal-600 flex items-center justify-center">
            <span className="text-gold/40 text-lg">✦</span>
          </div>
        )}
      </div>

      {/* Main image with crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 aspect-square rounded-xl bg-ivory dark:bg-charcoal-600 border border-border overflow-hidden flex items-center justify-center"
        >
          <span className="font-display text-6xl text-gold/20 select-none">✦</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── ProductDetailClient ──────────────────────────────────────────────────────

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const pathname = usePathname();
  const { handleAddToCart, handleToggleWishlist } = useProtectedActions();
  const [addedToCart, setAddedToCart] = useState(false);

  const hasDiscount = product.originalPrice && product.discountPercent;
  const inStock = product.stock > 0;

  function onAddToCart() {
    handleAddToCart(product, pathname);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  const accordionItems = [
    { title: "Description", content: product.description },
    {
      title: "Material & Care",
      content: `Material: ${product.material.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}. Store in a dry place away from moisture. Avoid contact with perfumes and chemicals. Clean gently with a soft cloth.`,
    },
    {
      title: "Shipping & Returns",
      content: "Free shipping on orders above ₹999. Standard delivery: 5-7 business days. Express delivery: 2-3 business days. Easy 7-day return policy — no questions asked.",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

        {/* ── Left: Gallery ────────────────────────────────────────────── */}
        <FadeIn direction="left">
          <ImageGallery images={product.images} name={product.name} />
        </FadeIn>

        {/* ── Right: Details ───────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">

          {/* Badges */}
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-2 flex-wrap">
              {product.isNewArrival && (
                <span className="px-2.5 py-1 rounded-md bg-gold text-white text-2xs font-bold uppercase tracking-wider">New Arrival</span>
              )}
              {product.isBestseller && (
                <span className="px-2.5 py-1 rounded-md bg-charcoal text-ivory text-2xs font-bold uppercase tracking-wider">Bestseller</span>
              )}
              {hasDiscount && (
                <span className="px-2.5 py-1 rounded-md bg-rose-gold text-white text-2xs font-bold uppercase tracking-wider">{product.discountPercent}% OFF</span>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <span className="text-xs uppercase tracking-widest text-gold font-semibold">
              {product.category}
            </span>
          </FadeIn>

          <SlideUp delay={0.2}>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal dark:text-ivory leading-tight">
              {product.name}
            </h1>
          </SlideUp>

          {/* Rating */}
          <FadeIn delay={0.25}>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    stroke="currentColor" strokeWidth="1.5"
                    className={i < Math.floor(product.rating) ? "text-gold" : "text-charcoal-200"} aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-charcoal-400">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-sm text-charcoal-400 dark:text-charcoal-300 leading-relaxed">
              {product.shortDescription}
            </p>
          </FadeIn>

          {/* Price */}
          <FadeIn delay={0.35}>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-charcoal dark:text-ivory">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-charcoal-400 line-through">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
            </div>
          </FadeIn>

          {/* Stock */}
          <FadeIn delay={0.4}>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className="text-sm text-charcoal-400">
                {inStock ? `In stock (${product.stock} left)` : "Out of stock"}
              </span>
            </div>
          </FadeIn>

          {/* Desktop Actions */}
          <FadeIn delay={0.45}>
            <div className="hidden sm:flex flex-row gap-3 mt-2">
              <Button variant="primary" size="lg" fullWidth disabled={!inStock} onClick={onAddToCart}>
                <AnimatePresence mode="wait">
                  <motion.span key={addedToCart ? "added" : "add"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                    {addedToCart ? "✓ Added to Cart" : inStock ? "Add to Cart" : "Out of Stock"}
                  </motion.span>
                </AnimatePresence>
              </Button>
              <Button variant="outline" size="lg" onClick={() => handleToggleWishlist(product, pathname)} className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                Wishlist
              </Button>
            </div>
          </FadeIn>

          <div className="divider-gold" />

          <FadeIn delay={0.5}>
            <Accordion items={accordionItems} />
          </FadeIn>

          {product.tags.length > 0 && (
            <FadeIn delay={0.55}>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>
          )}
        </div>
      </div>

      {/* ── Mobile Sticky Cart Bar ──────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 dark:bg-charcoal/95 backdrop-blur-md border-t border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-sans text-xs text-charcoal-400 truncate">{product.name}</p>
            <p className="font-display text-lg font-bold text-charcoal dark:text-ivory">{formatPrice(product.price)}</p>
          </div>
          <Button variant="primary" size="md" disabled={!inStock} onClick={onAddToCart} className="flex-shrink-0">
            {addedToCart ? "✓ Added" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </>
  );
}
