import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState, Product } from "@/types";

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: CartState = {
  items: [], // Hydrated from localStorage in StoreProvider
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id,
      );

      if (existingIndex >= 0) {
        const current = state.items[existingIndex].quantity;
        const maxStock = product.stock;
        state.items[existingIndex].quantity = Math.min(current + 1, maxStock);
      } else {
        state.items.push({ product, quantity: 1 });
      }
    },

    // Remove item from cart by product ID
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      );
    },

    /// Update quantity of a cart item. If quantity is 0 or less, remove the item.
    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) {
      const { productId, quantity } = action.payload;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.product.id !== productId,
        );
      } else {
        const item = state.items.find((i) => i.product.id === productId);
        if (item) {
          item.quantity = Math.min(quantity, item.product.stock);
        }
      }
    },

    // Clear cart (used on logout)
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  // hydrateCart,
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
  state.cart.items.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0,
  );

/** Total price in rupees */
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce(
    (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
    0,
  );

/** Check if a product is already in cart */
export const selectIsInCart = (productId: string) => (state: RootState) =>
  state.cart.items.some((item: CartItem) => item.product.id === productId);

export default cartSlice.reducer;
