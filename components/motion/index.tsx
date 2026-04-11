"use client";

import { motion, type Variant, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// VELVET SPARK — ANIMATION WRAPPERS
// Reusable, composable motion components. Keep animations subtle and elegant.
// ═══════════════════════════════════════════════════════════════════════════

// ─── Shared defaults ──────────────────────────────────────────────────────────

const defaultViewport = { once: true, margin: "-60px" };

// ─── FadeIn ───────────────────────────────────────────────────────────────────
// Fades from transparent to opaque. Direction optional.

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "whileInView"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
}

const directionOffset = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
};

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
  ...rest
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─── SlideUp ──────────────────────────────────────────────────────────────────
// Slides from below the fold. Stronger offset than FadeIn.

interface SlideUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function SlideUp({ children, delay = 0, duration = 0.6, className }: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── ScaleOnHover ─────────────────────────────────────────────────────────────
// Subtle scale + lift on hover. Perfect for cards and buttons.

interface ScaleOnHoverProps {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}

export function ScaleOnHover({ children, scale = 1.02, className }: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{ scale, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerChildren ─────────────────────────────────────────────────────────
// Container that staggers its children's entrance animations.
// Each direct child should be a motion element or wrapped in FadeIn/SlideUp.

interface StaggerChildrenProps {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}

export function StaggerChildren({
  children,
  stagger = 0.08,
  delay = 0,
  className,
}: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerItem ──────────────────────────────────────────────────────────────
// Used inside StaggerChildren. Each one fades in on its turn.

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedCounter ──────────────────────────────────────────────────────────
// Animates a number from 0 to target. Great for totals, badges, etc.

interface AnimatedCounterProps {
  value: number;
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: -8, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {value}
    </motion.span>
  );
}
