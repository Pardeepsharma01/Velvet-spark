import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium select-none cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // ── Velvet Spark brand variants ────────────────────────────────
        /** Solid gold — primary CTA */
        primary:
          "bg-gold text-white border border-gold rounded-lg hover:bg-gold-700 hover:border-gold-700 shadow-gold-sm hover:shadow-gold focus-visible:ring-gold",
        /** Outline gold — secondary action */
        outline:
          "bg-transparent text-gold border border-gold rounded-lg hover:bg-gold hover:text-white focus-visible:ring-gold",
        /** Rose Gold — highlighted action */
        rose:
          "bg-rose-gold text-white border border-rose-gold rounded-lg hover:bg-rose-gold-600 focus-visible:ring-rose-gold",
        /** Ghost — tertiary / nav */
        ghost:
          "bg-transparent text-charcoal border border-transparent rounded-lg hover:bg-gold/10 hover:text-gold focus-visible:ring-gold",
        /** Dark — inverted on light background */
        dark:
          "bg-charcoal text-ivory border border-charcoal rounded-lg hover:bg-charcoal-600 focus-visible:ring-charcoal",
        // ── Legacy shadcn variants (kept for auth components) ──────────
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 rounded-md",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 rounded-md",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
        // legacy shadcn sizes
        default: "h-9 px-4 py-2 text-sm",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
