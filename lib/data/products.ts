// ═══════════════════════════════════════════════════════════════════════════
// VELVET SPARK — DATA FETCHING LAYER
//
// This is the ONLY place the app touches raw data.
// Currently uses local mock JSON. To switch to Supabase:
//   1. Replace the import with a supabase client call
//   2. Map the Supabase row shape to the Product type
//   3. Keep the same function signatures — the rest of the app stays unchanged.
// ═══════════════════════════════════════════════════════════════════════════

import type { DataResult, Product, ProductCategory } from "@/types";
import productsData from "@/data/products.json";

// Cast raw JSON to typed array once
const allProducts = productsData as Product[];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Simulate a tiny async delay to mirror real API behaviour */
const fakeDelay = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 0));

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetch all products.
 * Future: `supabase.from("products").select("*")`
 */
export async function getProducts(): Promise<DataResult<Product[]>> {
  try {
    await fakeDelay();
    return { data: allProducts, error: null };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}

/**
 * Fetch a single product by its slug.
 * Future: `supabase.from("products").select("*").eq("slug", slug).single()`
 */
export async function getProductBySlug(
  slug: string
): Promise<DataResult<Product>> {
  try {
    await fakeDelay();
    const product = allProducts.find((p) => p.slug === slug) ?? null;
    if (!product) return { data: null, error: "Product not found" };
    return { data: product, error: null };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}

/**
 * Fetch a single product by its ID.
 * Future: `supabase.from("products").select("*").eq("id", id).single()`
 */
export async function getProductById(
  id: string
): Promise<DataResult<Product>> {
  try {
    await fakeDelay();
    const product = allProducts.find((p) => p.id === id) ?? null;
    if (!product) return { data: null, error: "Product not found" };
    return { data: product, error: null };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}

/**
 * Fetch products filtered by category.
 * Future: `supabase.from("products").select("*").eq("category", category)`
 */
export async function getProductsByCategory(
  category: ProductCategory
): Promise<DataResult<Product[]>> {
  try {
    await fakeDelay();
    const filtered = allProducts.filter((p) => p.category === category);
    return { data: filtered, error: null };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}

/**
 * Fetch featured products (used on homepage).
 * Future: `supabase.from("products").select("*").eq("is_featured", true)`
 */
export async function getFeaturedProducts(): Promise<DataResult<Product[]>> {
  try {
    await fakeDelay();
    const featured = allProducts.filter((p) => p.isFeatured);
    return { data: featured, error: null };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}

/**
 * Fetch new arrivals.
 * Future: `supabase.from("products").select("*").eq("is_new_arrival", true)`
 */
export async function getNewArrivals(): Promise<DataResult<Product[]>> {
  try {
    await fakeDelay();
    const arrivals = allProducts.filter((p) => p.isNewArrival);
    return { data: arrivals, error: null };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}

/**
 * Fetch bestsellers.
 * Future: `supabase.from("products").select("*").eq("is_bestseller", true)`
 */
export async function getBestsellers(): Promise<DataResult<Product[]>> {
  try {
    await fakeDelay();
    const bestsellers = allProducts.filter((p) => p.isBestseller);
    return { data: bestsellers, error: null };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}
