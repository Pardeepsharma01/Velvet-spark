import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

// ─── Container ────────────────────────────────────────────────────────────────
// Max-width wrapper that centers content and applies horizontal padding.
// Follows the 8px grid: px-4 (16px) on mobile, px-8 (32px) on md+

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Control the max-width breakpoint */
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const maxWidths = {
  sm:   "max-w-2xl",    // 672px
  md:   "max-w-4xl",    // 896px
  lg:   "max-w-6xl",    // 1152px
  xl:   "max-w-site",   // 1280px (custom token)
  full: "max-w-full",
} as const;

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "xl", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto px-4 sm:px-6 md:px-8",
          maxWidths[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export { Container };
