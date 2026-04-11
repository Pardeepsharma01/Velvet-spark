import { Suspense } from "react";
import SignUpForm from "./SignUpForm";

// ─── Sign Up Page (Server Component) ─────────────────────────────────────────
// Wraps the client form in Suspense — required in Next.js 14 because SignUpForm
// uses useSearchParams().

export default function SignUpPage() {
  return (
    <div className="w-full max-w-md">
      <Suspense
        fallback={
          <div className="bg-white dark:bg-charcoal-700 rounded-2xl shadow-card-lg border border-border p-8 md:p-10 flex items-center justify-center min-h-[420px]">
            <span className="h-8 w-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
          </div>
        }
      >
        <SignUpForm />
      </Suspense>
    </div>
  );
}
