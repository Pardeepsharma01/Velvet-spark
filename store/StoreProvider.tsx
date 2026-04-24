// "use client";

// import { useEffect, useRef } from "react";
// import { Provider } from "react-redux";
// import { store } from "@/store/store";
// import { hydrateCart } from "@/store/cartSlice";
// import { hydrateWishlist } from "@/store/wishlistSlice";

// // ─── StoreProvider ────────────────────────────────────────────────────────────
// // Client-only wrapper that:
// //  1. Provides the Redux store to the entire React tree
// //  2. Hydrates the cart from localStorage once after mount
// //     (avoids SSR mismatch — the store starts empty on server)

// interface StoreProviderProps {
//   children: React.ReactNode;
// }

// export function StoreProvider({ children }: StoreProviderProps) {
//   const hydrated = useRef(false);

//   useEffect(() => {
//     // Hydrate cart from localStorage exactly once on client mount
//     if (!hydrated.current) {
//       store.dispatch(hydrateCart());
//       store.dispatch(hydrateWishlist());
//       hydrated.current = true;
//     }
//   }, []);

//   return <Provider store={store}>{children}</Provider>;
// }

//////////////////////

"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
