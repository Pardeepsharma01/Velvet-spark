import { Suspense } from "react";
import LoginForm from "./LoginForm";

// ─── Login Page (Server Component) ────────────────────────────────────────────
// Wraps the client form in Suspense — required in Next.js 14 because LoginForm
// uses useSearchParams(), which opts out of static rendering.

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <Suspense
        fallback={
          <div className="bg-white dark:bg-charcoal-700 rounded-2xl shadow-card-lg border border-border p-8 md:p-10 flex items-center justify-center min-h-[420px]">
            <span className="h-8 w-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
