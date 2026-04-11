import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  bg?: "transparent" | "ivory" | "white" | "charcoal" | "gold-subtle";
  as?: "section" | "div" | "article" | "main";
}

const spacings = {
  none: "",
  sm:   "py-8 md:py-12",
  md:   "py-12 md:py-16",
  lg:   "py-16 md:py-24",
  xl:   "py-24 md:py-32",
} as const;

const backgrounds = {
  transparent:   "bg-transparent",
  ivory:         "bg-ivory dark:bg-charcoal-800",
  white:         "bg-white dark:bg-charcoal-700",
  charcoal:      "bg-charcoal dark:bg-charcoal-600",
  "gold-subtle": "bg-gold/5 dark:bg-gold/10",
} as const;

export function Section({
  className,
  spacing = "lg",
  bg = "transparent",
  as: Tag = "section",
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn("w-full", spacings[spacing], backgrounds[bg], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
