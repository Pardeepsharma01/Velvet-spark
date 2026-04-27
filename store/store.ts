import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // ← wapas add karo
import wishlistReducer from "./wishlistSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import orderReducer from "./orderSlice";

const rootReducer = combineReducers({
  cart: cartReducer, // ← yahan bhi
  wishlist: wishlistReducer,
  orders: orderReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["wishlist", "cart", "orders"],
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
