"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/store/cartSlice";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FadeIn, SlideUp } from "@/components/motion";
import Image from "next/image";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const count = useAppSelector(selectCartCount);

  const deliveryFee = total >= 999 ? 0 : 79;
  const grandTotal = total + deliveryFee;

  if (items.length === 0) {
    return (
      <Section spacing="xl">
        <Container size="sm">
          <FadeIn>
            <div className="flex flex-col items-center justify-center text-center py-20">
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-5xl mb-4 block"
                aria-hidden="true"
              >
                🛒
              </motion.span>
              <h1 className="font-display text-3xl font-bold text-charcoal dark:text-ivory mb-3">
                Your cart is empty
              </h1>
              <p className="text-sm text-charcoal-400 mb-6">
                Discover our beautiful collection and add something special.
              </p>
              <Button variant="primary" size="md" asChild>
                <Link href="/shop">Continue Shopping</Link>
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
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Cart" }]}
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal dark:text-ivory">
                Shopping Cart
              </h1>
              <button
                onClick={() => dispatch(clearCart())}
                className="text-xs text-destructive hover:text-destructive/80 font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── Cart items ─────────────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      x: -60,
                      transition: { duration: 0.25 },
                    }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="flex gap-4 p-4 bg-white dark:bg-charcoal-700 rounded-xl border border-border"
                  >
                    {/* <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg bg-ivory dark:bg-charcoal-600 flex items-center justify-center">
                      <span className="text-2xl text-gold/30">✦</span>
                    </div> */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg bg-ivory dark:bg-charcoal-600 relative overflow-hidden border border-border">
                      {item.product.images && item.product.images.length > 0 ? (
                        <Image
                          src={item.product.images[0].url} // Product ki pahli image
                          alt={item.product.name}
                          fill
                          sizes="(max-width: 640px) 80px, 96px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-2xl text-gold/30">✦</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            href={`/shop/${item.product.slug}`}
                            className="font-sans text-sm font-medium text-charcoal dark:text-ivory hover:text-gold transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-2xs text-gold uppercase tracking-widest mt-0.5">
                            {item.product.category}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            dispatch(removeFromCart(item.product.id))
                          }
                          aria-label={`Remove ${item.product.name}`}
                          className="flex-shrink-0 p-1 text-charcoal-400 hover:text-destructive transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  productId: item.product.id,
                                  quantity: item.quantity - 1,
                                }),
                              )
                            }
                            className="h-8 w-8 flex items-center justify-center text-charcoal-400 hover:bg-gold/10 hover:text-gold transition-colors"
                            aria-label="Decrease"
                          >
                            −
                          </button>
                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                            className="h-8 w-10 flex items-center justify-center text-sm font-medium text-charcoal dark:text-ivory border-x border-border"
                          >
                            {item.quantity}
                          </motion.span>
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  productId: item.product.id,
                                  quantity: item.quantity + 1,
                                }),
                              )
                            }
                            disabled={item.quantity >= item.product.stock}
                            className="h-8 w-8 flex items-center justify-center text-charcoal-400 hover:bg-gold/10 hover:text-gold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            aria-label="Increase"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-sans text-sm font-bold text-charcoal dark:text-ivory">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ── Summary ────────────────────────────────────────────── */}
            <div className="lg:col-span-1">
              <FadeIn direction="right" delay={0.2}>
                <div className="bg-white dark:bg-charcoal-700 rounded-xl border border-border p-6 sticky top-24 flex flex-col gap-4">
                  <h2 className="font-display text-lg font-bold text-charcoal dark:text-ivory">
                    Order Summary
                  </h2>
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between text-charcoal-400">
                      <span>
                        Subtotal ({count} item{count !== 1 ? "s" : ""})
                      </span>
                      <span className="text-charcoal dark:text-ivory font-medium">
                        {formatPrice(total)}
                      </span>
                    </div>
                    <div className="flex justify-between text-charcoal-400">
                      <span>Delivery</span>
                      <span
                        className={
                          deliveryFee === 0
                            ? "text-green-600 font-medium"
                            : "text-charcoal dark:text-ivory font-medium"
                        }
                      >
                        {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                      </span>
                    </div>
                    {deliveryFee > 0 && (
                      <p className="text-2xs text-charcoal-400">
                        Free delivery on orders above ₹999
                      </p>
                    )}
                  </div>
                  <div className="divider-gold" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-sm font-semibold text-charcoal dark:text-ivory">
                      Total
                    </span>
                    <motion.span
                      key={grandTotal}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="font-display text-2xl font-bold text-charcoal dark:text-ivory"
                    >
                      {formatPrice(grandTotal)}
                    </motion.span>
                  </div>
                  <Link href="/checkout">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      className="mt-2"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link
                    href="/shop"
                    className="text-center text-xs text-gold hover:text-gold-700 font-medium transition-colors"
                  >
                    Continue Shopping →
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
