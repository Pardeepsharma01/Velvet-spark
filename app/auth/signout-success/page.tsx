"use client";

import { clearCart } from "@/store/cartSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


export default function SignOutSuccessPage() {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart()); //  logout pe cart empty
    const timer = setTimeout(() => {
      window.location.href = "/"; //  logout ke baad home pe redirect
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Signed Out Successfully 👋</h1>
        <p className="text-charcoal-400 mt-2">Redirecting to home...</p>
      </div>
    </div>
  );
}