import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

// ─── Store ────────────────────────────────────────────────────────────────────

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  // Disable the serializable check for dev ergonomics.
  // Our cart/wishlist only store plain objects so this is safe.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// ─── Types ────────────────────────────────────────────────────────────────────

/** The full shape of the Redux state tree */
export type RootState = ReturnType<typeof store.getState>;

/** Typed dispatch (supports thunks) */
export type AppDispatch = typeof store.dispatch;
