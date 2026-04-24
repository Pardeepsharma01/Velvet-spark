"use client";

import { useEffect } from "react";

export default function SignOutSuccessPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/"; // ✅ Full reload - session clear hoga
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