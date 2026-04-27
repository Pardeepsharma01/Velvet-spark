// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cartSlice";
// import wishlistReducer from "./wishlistSlice";

// // ─── Store ────────────────────────────────────────────────────────────────────

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     wishlist: wishlistReducer,
//   },
//   // Disable the serializable check for dev ergonomics.
//   // Our cart/wishlist only store plain objects so this is safe.
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// // ─── Types ────────────────────────────────────────────────────────────────────

// /** The full shape of the Redux state tree */
// export type RootState = ReturnType<typeof store.getState>;

// /** Typed dispatch (supports thunks) */
// export type AppDispatch = typeof store.dispatch;

////////////////////////

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";           // ← wapas add karo
import wishlistReducer from "./wishlistSlice";
import {
  persistStore,
  persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import orderReducer from "./orderSlice";

// const storage = typeof window !== "undefined"
//   ? require("redux-persist/lib/storage").default
//   : require("redux-persist/lib/storage/session").default;

const rootReducer = combineReducers({
  cart: cartReducer,        // ← yahan bhi
  wishlist: wishlistReducer,
  orders: orderReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["wishlist" , "cart", "orders"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
