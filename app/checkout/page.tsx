"use client";

import React, { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn, SlideUp, ScaleOnHover, StaggerChildren, StaggerItem, AnimatedCounter } from "@/components/motion";
import { Button } from "@/components/ui/button";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface FormState {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockCartItems: CartItem[] = [
  {
    id: "vs-001",
    name: "Aurora Pendant Necklace",
    image: "https://placehold.co/80x80/F5F0E8/C9A84C?text=VS",
    price: 1299,
    quantity: 1,
  },
  {
    id: "vs-002",
    name: "Crystal Stud Earrings",
    image: "https://placehold.co/80x80/F5F0E8/C9A84C?text=VS",
    price: 849,
    quantity: 2,
  },
  {
    id: "vs-003",
    name: "Celestial Bangle Set",
    image: "https://placehold.co/80x80/F5F0E8/C9A84C?text=VS",
    price: 1799,
    quantity: 1,
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CheckoutPage() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

  // Form state
  const [form, setForm] = useState<FormState>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Payment method
  const [payment, setPayment] = useState<"cod" | "online">("cod");

  // Coupon
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");

  // Order placed
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Order ID (stable per session)
  const [orderId] = useState(() => `VS-${Date.now()}`);

  // ─── Derived State ──────────────────────────────────────────────────────────

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  // ─── Functions ──────────────────────────────────────────────────────────────

  function updateQty(id: string, delta: number) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  }

  function removeItem(id: string) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handlePlaceOrder() {
    if (validateForm()) {
      setOrderPlaced(true);
    }
  }

  function handleApplyCoupon() {
    setCouponError("Invalid coupon");
  }

  // ─── Order Success State ────────────────────────────────────────────────────

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <FadeIn direction="up">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4 py-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center"
            >
              <span className="text-3xl text-primary">✓</span>
            </motion.div>

            <h1 className="text-2xl font-bold text-gradient-gold">
              Order Placed Successfully!
            </h1>

            <p className="text-muted-foreground text-center max-w-sm text-sm leading-relaxed">
              Thank you for shopping with Velvet Spark. Your order will be
              delivered soon.
            </p>

            <div className="bg-muted px-4 py-2 rounded-lg font-mono text-sm text-foreground">
              Order ID: {orderId}
            </div>

            <Button variant="outline" size="md">
              Continue Shopping
            </Button>
          </div>
        </FadeIn>
      </div>
    );
  }

  // ─── Empty Cart State ───────────────────────────────────────────────────────

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <FadeIn>
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center px-4">
            <span className="text-5xl text-primary">✦</span>
            <p className="text-xl font-semibold text-foreground">
              Your cart is empty
            </p>
            <p className="text-muted-foreground text-sm">
              Add some beautiful pieces to get started
            </p>
            <Button variant="primary" size="lg">
              Start Shopping
            </Button>
          </div>
        </FadeIn>
      </div>
    );
  }

  // ─── Main Checkout Page ─────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background pb-16">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-10 pb-6">
        <FadeIn direction="up">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">
            Checkout
          </h1>
          <hr className="divider-gold mb-3" />
          <p className="text-muted-foreground text-base">
            Securely complete your Velvet Spark order
          </p>
        </FadeIn>
      </div>

      {/* ── Main Layout ────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* ── LEFT COLUMN: Form ─────────────────────────────────────────── */}
          <div className="md:col-span-2">

            {/* ── Shipping Address Form ─────────────────────────────────── */}
            <SlideUp delay={0.1}>
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Shipping Address
                </h2>

                <div className="flex flex-col gap-4">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-muted-foreground font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, fullName: e.target.value }))
                      }
                      placeholder="Enter your full name"
                      className="w-full border border-border rounded-md px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 placeholder:text-muted-foreground/50"
                    />
                    {errors.fullName && (
                      <span className="text-xs text-destructive">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-muted-foreground font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      placeholder="10-digit mobile number"
                      className="w-full border border-border rounded-md px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 placeholder:text-muted-foreground/50"
                    />
                    {errors.phone && (
                      <span className="text-xs text-destructive">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Address Line */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-muted-foreground font-medium">
                      Address Line
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, address: e.target.value }))
                      }
                      placeholder="House/Flat no., Street, Area"
                      className="w-full border border-border rounded-md px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 placeholder:text-muted-foreground/50"
                    />
                    {errors.address && (
                      <span className="text-xs text-destructive">
                        {errors.address}
                      </span>
                    )}
                  </div>

                  {/* City / State / Pincode */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* City */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm text-muted-foreground font-medium">
                        City
                      </label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, city: e.target.value }))
                        }
                        placeholder="City"
                        className="w-full border border-border rounded-md px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 placeholder:text-muted-foreground/50"
                      />
                      {errors.city && (
                        <span className="text-xs text-destructive">
                          {errors.city}
                        </span>
                      )}
                    </div>

                    {/* State */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm text-muted-foreground font-medium">
                        State
                      </label>
                      <input
                        type="text"
                        value={form.state}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, state: e.target.value }))
                        }
                        placeholder="State"
                        className="w-full border border-border rounded-md px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 placeholder:text-muted-foreground/50"
                      />
                      {errors.state && (
                        <span className="text-xs text-destructive">
                          {errors.state}
                        </span>
                      )}
                    </div>

                    {/* Pincode */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm text-muted-foreground font-medium">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={form.pincode}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, pincode: e.target.value }))
                        }
                        placeholder="6-digit pincode"
                        className="w-full border border-border rounded-md px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 placeholder:text-muted-foreground/50"
                      />
                      {errors.pincode && (
                        <span className="text-xs text-destructive">
                          {errors.pincode}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SlideUp>

            {/* ── Payment Method ────────────────────────────────────────── */}
            <SlideUp delay={0.2}>
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Payment Method
                </h2>

                <div className="flex flex-col gap-3">
                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setPayment("cod")}
                    className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-colors duration-200 ${
                      payment === "cod"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        payment === "cod"
                          ? "border-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {payment === "cod" && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Cash on Delivery
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Pay when your order arrives at your doorstep
                      </p>
                    </div>
                  </div>

                  {/* Online Payment — Coming Soon */}
                  <div
                    className="flex items-center gap-3 border border-border rounded-lg p-4 opacity-50 cursor-not-allowed"
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">
                          Online Payment
                        </p>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          Coming Soon
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        UPI, Credit / Debit Card, Net Banking
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SlideUp>
          </div>

          {/* ── RIGHT COLUMN: Order Summary ──────────────────────────────── */}
          <div className="md:col-span-1">
            <div className="md:sticky md:top-8">
              <FadeIn direction="left" delay={0.2}>
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Order Summary
                  </h2>

                  {/* ── Cart Items ──────────────────────────────────────── */}
                  <StaggerChildren>
                    {cartItems.map((item) => (
                      <StaggerItem key={item.id}>
                        <div className="flex gap-3 items-center py-3 border-b border-border">
                          {/* Image */}
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover border border-border"
                            />
                          </motion.div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ₹{item.price.toLocaleString("en-IN")}
                            </p>

                            {/* Qty Controls */}
                            <div className="flex items-center gap-1 mt-1.5">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQty(item.id, -1)}
                                disabled={item.quantity <= 1}
                              >
                                −
                              </Button>
                              <span className="w-6 text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQty(item.id, 1)}
                              >
                                +
                              </Button>
                            </div>
                          </div>

                          {/* Remove */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            ✕
                          </Button>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerChildren>

                  {/* ── Coupon Code ─────────────────────────────────────── */}
                  <div className="flex gap-2 items-center mt-4">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => {
                        setCoupon(e.target.value);
                        setCouponError("");
                      }}
                      placeholder="Enter coupon code"
                      className="flex-1 border border-border rounded-md px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 placeholder:text-muted-foreground/50"
                    />
                    <Button variant="outline" size="sm" onClick={handleApplyCoupon}>
                      Apply
                    </Button>
                  </div>
                  {couponError && (
                    <p className="text-xs text-destructive mt-1">{couponError}</p>
                  )}

                  {/* ── Pricing Breakdown ───────────────────────────────── */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-emerald-600 font-medium">Free</span>
                    </div>
                  </div>

                  <hr className="divider-gold my-3" />

                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-primary">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* ── Place Order Button ──────────────────────────────── */}
                  <div className="mt-4">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth={true}
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}