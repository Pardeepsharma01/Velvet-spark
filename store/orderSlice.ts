import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

// ─── Types ────────────────────────────────────────────────────────────────────

export type OrderStatus = "Delivered" | "Pending" | "Cancelled";

export interface OrderProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  products: OrderProduct[];
  total: number;
}

interface OrderState {
  orders: Order[];
}

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: OrderState = {
  orders: [],
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder(state, action: PayloadAction<Order>) {
      state.orders.unshift(action.payload); // ✅ latest order pehle
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const { placeOrder, clearOrders } = orderSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectOrders = (state: RootState) => state.orders.orders;

export default orderSlice.reducer;