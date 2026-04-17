"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FadeIn,
  ScaleOnHover,
  StaggerChildren,
  StaggerItem,
  AnimatedCounter,
} from "@/components/motion";
import { Button } from "@/components/ui/button";

// ─── Types ───────────────────────────────────────────────────────────────────

type OrderStatus = "Delivered" | "Pending" | "Cancelled";
type FilterOption = OrderStatus | "All";

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  product: {
    name: string;
    image: string;
    price: number;
    quantity: number;
  };
  total: number;
  trackingId?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_ORDERS: Order[] = [
  {
    id: "VS-2024-001",
    date: "15 Jan 2025",
    status: "Delivered",
    product: {
      name: "Celestial Pearl Drop Earrings",
      image: "https://placehold.co/80x80/F5F0E8/C9A84C?text=VS",
      price: 1299,
      quantity: 1,
    },
    total: 1299,
  },
  {
    id: "VS-2024-002",
    date: "28 Jan 2025",
    status: "Pending",
    product: {
      name: "Aurora Layered Necklace Set",
      image: "https://placehold.co/80x80/F5F0E8/C9A84C?text=VS",
      price: 2499,
      quantity: 2,
    },
    total: 4998,
    trackingId: "TRK-884721",
  },
  {
    id: "VS-2024-003",
    date: "03 Feb 2025",
    status: "Delivered",
    product: {
      name: "Rose Quartz Charm Bracelet",
      image: "https://placehold.co/80x80/F5F0E8/C9A84C?text=VS",
      price: 899,
      quantity: 1,
    },
    total: 899,
  },
  {
    id: "VS-2024-004",
    date: "10 Feb 2025",
    status: "Cancelled",
    product: {
      name: "Gold Serpent Cuff Bangle",
      image: "https://placehold.co/80x80/F5F0E8/C9A84C?text=VS",
      price: 1799,
      quantity: 1,
    },
    total: 1799,
  },
  {
    id: "VS-2024-005",
    date: "18 Feb 2025",
    status: "Delivered",
    product: {
      name: "Moonstone Stud Set (3-pack)",
      image: "https://placehold.co/80x80/F5F0E8/C9A84C?text=VS",
      price: 649,
      quantity: 3,
    },
    total: 1947,
  },
  {
    id: "VS-2024-006",
    date: "25 Feb 2025",
    status: "Pending",
    product: {
      name: "Velvet Spark Signature Ring",
      image: "https://placehold.co/80x80/F5F0E8/C9A84C?text=VS",
      price: 3299,
      quantity: 1,
    },
    total: 3299,
    trackingId: "TRK-992048",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<OrderStatus, string> = {
  Delivered:
    "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
  Cancelled: "bg-red-50 text-red-700 border border-red-200",
};

const FILTERS: FilterOption[] = ["All", "Delivered", "Pending", "Cancelled"];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");

  const filteredOrders =
    activeFilter === "All"
      ? MOCK_ORDERS
      : MOCK_ORDERS.filter((o) => o.status === activeFilter);

  const delivered = MOCK_ORDERS.filter((o) => o.status === "Delivered").length;
  const pending = MOCK_ORDERS.filter((o) => o.status === "Pending").length;
  const cancelled = MOCK_ORDERS.filter((o) => o.status === "Cancelled").length;

  return (
    <main className="min-h-screen bg-background px-4 md:px-8 py-10">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* ── Section 1: Header ── */}
        <FadeIn direction="up">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient-gold">
              My Orders
            </h1>
            <hr className="divider-gold" />
            <p className="text-muted-foreground text-base">
              Track, review, and manage your Velvet Spark purchases.
            </p>
          </div>
        </FadeIn>

        {/* ── Section 2: Summary Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Orders", value: MOCK_ORDERS.length },
            { label: "Delivered", value: delivered },
            { label: "Pending", value: pending },
            { label: "Cancelled", value: cancelled },
          ].map((card) => (
            <ScaleOnHover key={card.label}>
              <div className="bg-card border border-border border-l-4 border-l-primary rounded-lg p-6">
                <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2">
                  {card.label}
                </p>
                <div className="text-3xl font-bold text-primary">
                  <AnimatedCounter value={card.value} />
                </div>
              </div>
            </ScaleOnHover>
          ))}
        </div>

        {/* ── Section 3: Filter Tabs ── */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "outline" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* ── Section 4: Orders List ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {filteredOrders.length === 0 ? (
              /* ── Section 5: Empty State ── */
              <FadeIn>
                <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                  <span className="text-5xl text-primary">✦</span>
                  <h2 className="text-xl font-semibold text-foreground">
                    No orders found
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Try a different filter or explore our collection
                  </p>
                  <Button variant="primary" size="lg">
                    Start Shopping
                  </Button>
                </div>
              </FadeIn>
            ) : (
              <StaggerChildren className="space-y-4">
                {filteredOrders.map((order) => (
                  <StaggerItem key={order.id}>
                    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">

                        {/* [A] Product Image */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="shrink-0"
                        >
                          <img
                            src={order.product.image}
                            alt={order.product.name}
                            className="w-20 h-20 rounded-lg object-cover border border-border"
                          />
                        </motion.div>

                        {/* [B] Order Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground font-mono">
                            {order.id}
                          </p>
                          <p className="text-base font-semibold text-foreground mt-1 truncate">
                            {order.product.name}
                          </p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                          <p className="text-sm text-muted-foreground">
                            ₹{order.product.price.toLocaleString("en-IN")} ×{" "}
                            {order.product.quantity}
                          </p>
                          <p className="text-base font-bold text-primary mt-1">
                            ₹{order.total.toLocaleString("en-IN")}
                          </p>
                        </div>

                        {/* [C] Status Badge */}
                        <div className="shrink-0">
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full ${STATUS_STYLES[order.status]}`}
                          >
                            {order.status}
                          </span>
                        </div>

                        {/* [D] Action Buttons */}
                        <div className="flex flex-col md:flex-row gap-2 shrink-0">
                          <Button variant="outline" size="sm" fullWidth={true} className="md:w-auto">
                            View Details
                          </Button>
                          {order.status === "Pending" && (
                            <Button variant="primary" size="sm" fullWidth={true} className="md:w-auto">
                              Track Order
                            </Button>
                          )}
                        </div>

                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </main>
  );
}