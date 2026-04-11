"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import type { Product } from "@/types";

// ─── useProtectedActions ──────────────────────────────────────────────────────
// Wraps cart and wishlist actions with an auth gate.
// If the user is not logged in, redirects to /auth/login with a redirectTo param.
// If logged in, dispatches the Redux action immediately.

export function useProtectedActions() {
  const { isLoggedIn, loading } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();

  function requireAuth(currentPath: string = "/") {
    if (loading) return false;
    if (!isLoggedIn) {
      router.push(`/auth/login?redirectTo=${encodeURIComponent(currentPath)}`);
      return false;
    }
    return true;
  }

  function handleAddToCart(product: Product, currentPath?: string) {
    if (!requireAuth(currentPath)) return;
    dispatch(addToCart(product));
  }

  function handleToggleWishlist(product: Product, currentPath?: string) {
    if (!requireAuth(currentPath)) return;
    dispatch(toggleWishlist(product));
  }

  return {
    handleAddToCart,
    handleToggleWishlist,
    isLoggedIn,
    loading,
  };
}
