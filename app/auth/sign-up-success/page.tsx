"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// 1. Is function ko 'SuccessContent' ya koi bhi naam de dein (export default hata kar)
function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  useEffect(() => {
    const timer = setTimeout(() => {
      // router.push(next);
      window.location.href = next;
    }, 2000);
    return () => clearTimeout(timer);
  }, [next, router]);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Login Successful 🎉</h1>
      <p>Redirecting...</p>
    </div>
  );
}

// 2. Ab is page ka main export ye hoga (jo Suspense ke saath hai)
export default function SignUpSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

//////////////////////////

// "use client";

// import { useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function SignUpSuccessPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const next = searchParams.get("next") || "/";

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       router.push(next);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [next, router]);

//   return (
//     <div className="text-center">
//       <h1 className="text-2xl font-bold">Login Successful 🎉</h1>
//       <p>Redirecting...</p>
//     </div>
//   );
// }

////////////////////////////

// import Link from "next/link";

// export default function SignUpSuccessPage() {
//   return (
//     <div className="w-full max-w-md">
//       <div className="bg-white dark:bg-charcoal-700 rounded-2xl shadow-card-lg border border-border p-8 md:p-10 text-center">

//         {/* Icon */}
//         <div className="w-16 h-16 rounded-full bg-gold/15 border-2 border-gold/40 flex items-center justify-center mx-auto mb-6">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="28"
//             height="28"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.75"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="text-gold"
//             aria-hidden="true"
//           >
//             <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9" />
//             <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//             <path d="m16 19 2 2 4-4" />
//           </svg>
//         </div>

//         <h1 className="font-display text-3xl font-bold text-charcoal dark:text-ivory mb-3">
//           Check your email
//         </h1>

//         <p className="text-sm text-charcoal-400 dark:text-charcoal-300 leading-relaxed mb-8">
//           We&apos;ve sent a confirmation link to your email address.
//           Click the link to activate your account and start shopping.
//         </p>

//         <div className="flex flex-col gap-3">
//           <Link
//             href="/auth/login"
//             className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-gold text-white font-medium text-sm hover:bg-gold-700 transition-colors"
//           >
//             Go to Sign In
//           </Link>
//           <Link
//             href="/"
//             className="text-sm text-charcoal-400 dark:text-charcoal-300 hover:text-gold transition-colors"
//           >
//             Return to home
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// }
