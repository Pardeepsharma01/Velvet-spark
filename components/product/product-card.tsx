"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import Image from "next/image";
// ─── Helper ───────────────────────────────────────────────────────────────────

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

// ─── Product Card ─────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.discountPercent;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className={cn(
        "group flex flex-col bg-white dark:bg-charcoal-700 rounded-xl border border-border overflow-hidden",
        "hover:shadow-card-lg hover:border-gold/30 transition-all duration-300",
        className
      )}
    >
      {/* ── Image ────────────────────────────────────────────────────── */}
      <div className="relative aspect-square bg-ivory dark:bg-charcoal-600 overflow-hidden">
        {/* Placeholder — will be replaced with real <Image> when product photos exist */}
        <div className="w-full h-full flex items-center justify-center">
          {/* <span className="font-display text-4xl text-gold/30 select-none">
            ✦
          </span> */}
            {product?.images?.[0]?.url ? (
    <Image
      src={product.images[0].url}
      alt={product.images[0].alt}
      fill
      sizes="100vw"
      className="object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <span>✦</span>
    </div>
  )}

        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-md bg-rose-gold text-white text-2xs font-bold uppercase tracking-wider">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 rounded-md bg-gold text-white text-2xs font-bold uppercase tracking-wider">
              New
            </span>
          )}
          {product.isBestseller && !product.isNewArrival && (
            <span className="px-2 py-0.5 rounded-md bg-charcoal text-ivory text-2xs font-bold uppercase tracking-wider">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist icon overlay */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Will be wired to useProtectedActions in future
          }}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm border border-border hover:border-gold/40 hover:text-rose-gold transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* ── Details ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5 p-4">
        {/* Category */}
        <span className="text-2xs uppercase tracking-widest text-gold font-semibold">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="font-sans text-sm font-medium text-charcoal dark:text-ivory line-clamp-1 group-hover:text-gold transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.5"
                className={i < Math.floor(product.rating) ? "text-gold" : "text-charcoal-200"}
                aria-hidden="true"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="text-2xs text-charcoal-400 dark:text-charcoal-300">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="font-sans text-base font-bold text-charcoal dark:text-ivory">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-charcoal-400 line-through">
              {formatPrice(product.originalPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn(
      "flex flex-col bg-white dark:bg-charcoal-700 rounded-xl border border-border overflow-hidden animate-pulse",
      className
    )}>
      <div className="aspect-square bg-ivory dark:bg-charcoal-600" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3 w-16 bg-gold/15 rounded" />
        <div className="h-4 w-3/4 bg-charcoal-100 dark:bg-charcoal-600 rounded" />
        <div className="h-3 w-24 bg-charcoal-100 dark:bg-charcoal-600 rounded" />
        <div className="h-5 w-20 bg-charcoal-100 dark:bg-charcoal-600 rounded mt-1" />
      </div>
    </div>
  );
}
