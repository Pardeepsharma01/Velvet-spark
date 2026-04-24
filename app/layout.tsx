import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/navbar";
// import Navbar from "@/components/landing-page/Navbar";
import { Footer } from "@/components/layout/footer";
import { StoreProvider } from "@/store/StoreProvider";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Velvet Spark — Premium Artificial Jewelry",
    template: "%s | Velvet Spark",
  },
  description:
    "Discover premium artificial jewelry crafted with passion. Shop elegant necklaces, earrings, bracelets, and rings.",
  keywords: [
    "artificial jewelry",
    "fashion jewelry",
    "premium jewelry",
    "velvet spark",
  ],
  openGraph: {
    title: "Velvet Spark — Premium Artificial Jewelry",
    description: "Discover premium artificial jewelry crafted with passion.",
    url: defaultUrl,
    siteName: "Velvet Spark",
    type: "website",
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <AuthProvider>
            {/* ── Global layout shell ─────────────────────────────────── */}
            <Navbar />

            <main className="flex-1">{children}</main>

            <Footer />
            </AuthProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
