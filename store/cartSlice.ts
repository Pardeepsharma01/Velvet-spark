import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState, Product } from "@/types";

// ─── localStorage helpers ──────────────────────────────────────────────────────
// Cart is persisted client-side. We read on init and write on every change.

const CART_STORAGE_KEY = "velvet-spark:cart";

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: CartState = {
  items: [], // Hydrated from localStorage in StoreProvider
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Hydrate cart from localStorage on client mount.
     * Called once by StoreProvider after hydration.
     */
    hydrateCart(state) {
      state.items = loadCartFromStorage();
    },

    /**
     * Add a product to cart.
     * If already present, increment quantity by 1 (respects stock limit).
     */
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex >= 0) {
        const current = state.items[existingIndex].quantity;
        const maxStock = product.stock;
        state.items[existingIndex].quantity = Math.min(current + 1, maxStock);
      } else {
        state.items.push({ product, quantity: 1 });
      }

      saveCartToStorage(state.items);
    },

    /**
     * Remove a product from cart entirely by product ID.
     */
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      saveCartToStorage(state.items);
    },

    /**
     * Set an exact quantity for a cart item.
     * Passing quantity = 0 removes the item.
     */
    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const { productId, quantity } = action.payload;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.product.id !== productId
        );
      } else {
        const item = state.items.find((i) => i.product.id === productId);
        if (item) {
          item.quantity = Math.min(quantity, item.product.stock);
        }
      }

      saveCartToStorage(state.items);
    },

    /**
     * Clear all items from the cart.
     */
    clearCart(state) {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
});

export const {
  hydrateCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────

import type { RootState } from "@/store/store";

/** All cart items */
export const selectCartItems = (state: RootState) => state.cart.items;

/** Total number of items (sum of all quantities) */
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

/** Total price in rupees */
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce(
    (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
    0
  );

/** Check if a product is already in cart */
export const selectIsInCart = (productId: string) => (state: RootState) =>
  state.cart.items.some((item: CartItem) => item.product.id === productId);

export default cartSlice.reducer;
