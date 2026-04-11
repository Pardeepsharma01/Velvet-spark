import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product, WishlistState } from "@/types";

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: WishlistState = {
  items: [],
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    /**
     * Toggle a product in the wishlist.
     * If present → remove. If absent → add.
     */
    toggleWishlist(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(product);
      }
    },

    /**
     * Remove a product from the wishlist by ID.
     */
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    /**
     * Clear the entire wishlist.
     */
    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────

import type { RootState } from "@/store/store";

/** All wishlist products */
export const selectWishlistItems = (state: RootState) => state.wishlist.items;

/** Total count of wishlisted items */
export const selectWishlistCount = (state: RootState) =>
  state.wishlist.items.length;

/** Check if a product is in the wishlist */
export const selectIsWishlisted = (productId: string) => (state: RootState) =>
  state.wishlist.items.some((item: Product) => item.id === productId);

export default wishlistSlice.reducer;
