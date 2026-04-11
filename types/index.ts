// ═══════════════════════════════════════════════════════════════════════════
// VELVET SPARK — CORE DOMAIN TYPES
// All shared types live here so the data layer, Redux slices, and UI
// all share the same contract. Supabase rows will be mapped to these types.
// ═══════════════════════════════════════════════════════════════════════════

// ─── Product ─────────────────────────────────────────────────────────────────

export type ProductCategory =
  | "necklaces"
  | "earrings"
  | "bracelets"
  | "rings"
  | "sets";

export type ProductMaterial =
  | "gold-plated"
  | "rose-gold-plated"
  | "silver-plated"
  | "oxidised";

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;         // set if discounted
  discountPercent?: number;
  category: ProductCategory;
  material: ProductMaterial;
  images: ProductImage[];
  tags: string[];
  stock: number;
  rating: number;                 // 0–5
  reviewCount: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestseller: boolean;
  createdAt: string;              // ISO date string
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

// ─── Wishlist ─────────────────────────────────────────────────────────────────

export interface WishlistState {
  items: Product[];
}

// ─── Data Layer ───────────────────────────────────────────────────────────────
// Generic response wrapper — mirrors what Supabase returns,
// making the swap from mock → real API transparent.

export interface DataResult<T> {
  data: T | null;
  error: string | null;
}
