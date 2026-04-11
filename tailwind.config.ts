import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Brand Color Palette ───────────────────────────────────────────
      colors: {
        // Ivory — primary background & surface
        ivory: {
          50: "#FFFFF5",
          100: "#FEFEF0",
          200: "#FDFDE6",
          300: "#FAFAD2",
          DEFAULT: "#FFFFF0",
        },
        // Gold — primary accent / CTA
        gold: {
          50: "#FFF9E6",
          100: "#FFF0BF",
          200: "#FFE080",
          300: "#FFD040",
          400: "#FFC107",
          DEFAULT: "#C9A84C",
          600: "#A07830",
          700: "#7A5820",
          800: "#543C14",
          900: "#2E2008",
        },
        // Rose Gold — secondary accent / badges / highlights
        "rose-gold": {
          50: "#FFF0EE",
          100: "#FFE0DC",
          200: "#FFBBB3",
          300: "#F4978E",
          DEFAULT: "#B76E79",
          500: "#9D5260",
          600: "#7F3848",
          700: "#5C2233",
        },
        // Charcoal — text & dark surfaces
        charcoal: {
          50: "#F5F5F5",
          100: "#EBEBEB",
          200: "#D1D1D1",
          300: "#ABABAB",
          400: "#858585",
          DEFAULT: "#2C2C2C",
          600: "#1E1E1E",
          700: "#141414",
          800: "#0A0A0A",
        },
        // Semantic tokens (mapped to CSS vars for shadcn compat)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },

      // ─── Typography ────────────────────────────────────────────────────
      fontFamily: {
        // Display / headings — elegant serif (via next/font CSS var)
        display: ["var(--font-playfair)", "Georgia", "serif"],
        // Body / UI — clean sans-serif (via next/font CSS var)
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },

      // ─── Font Sizes (8px grid aligned) ────────────────────────────────
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],     // 10px
        xs:   ["0.75rem",  { lineHeight: "1rem" }],      // 12px
        sm:   ["0.875rem", { lineHeight: "1.25rem" }],   // 14px
        base: ["1rem",     { lineHeight: "1.5rem" }],    // 16px
        lg:   ["1.125rem", { lineHeight: "1.75rem" }],   // 18px
        xl:   ["1.25rem",  { lineHeight: "1.75rem" }],   // 20px
        "2xl":["1.5rem",   { lineHeight: "2rem" }],      // 24px
        "3xl":["1.875rem", { lineHeight: "2.25rem" }],   // 30px
        "4xl":["2.25rem",  { lineHeight: "2.5rem" }],    // 36px
        "5xl":["3rem",     { lineHeight: "1.2" }],       // 48px
        "6xl":["3.75rem",  { lineHeight: "1.1" }],       // 60px
      },

      // ─── Spacing (8px grid) ────────────────────────────────────────────
      spacing: {
        "4.5": "1.125rem",  // 18px
        "18": "4.5rem",     // 72px
        "22": "5.5rem",     // 88px
        "26": "6.5rem",     // 104px
        "30": "7.5rem",     // 120px
        "34": "8.5rem",     // 136px
        "section": "6rem",  // 96px — standard section padding
      },

      // ─── Border Radius ─────────────────────────────────────────────────
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      // ─── Max Widths ────────────────────────────────────────────────────
      maxWidth: {
        "8xl":  "88rem",   // 1408px
        "9xl":  "96rem",   // 1536px
        "site": "80rem",   // 1280px — main layout container
      },

      // ─── Box Shadows ───────────────────────────────────────────────────
      boxShadow: {
        "gold-sm": "0 1px 4px 0 rgba(201,168,76,0.15)",
        "gold":    "0 4px 16px 0 rgba(201,168,76,0.25)",
        "gold-lg": "0 8px 32px 0 rgba(201,168,76,0.35)",
        "card":    "0 2px 16px 0 rgba(44,44,44,0.08)",
        "card-lg": "0 8px 40px 0 rgba(44,44,44,0.12)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
