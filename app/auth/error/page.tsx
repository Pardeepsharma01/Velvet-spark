import Link from "next/link";

interface AuthErrorPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const { error } = await searchParams;
  const message = error ? decodeURIComponent(error) : "An unexpected authentication error occurred.";

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-charcoal-700 rounded-2xl shadow-card-lg border border-destructive/20 p-8 md:p-10 text-center">

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-destructive/10 border-2 border-destructive/30 flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-destructive"
            aria-hidden="true"
          >
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h1 className="font-display text-3xl font-bold text-charcoal dark:text-ivory mb-3">
          Authentication Error
        </h1>

        <p className="text-sm text-charcoal-400 dark:text-charcoal-300 leading-relaxed mb-2">
          Sorry, something went wrong:
        </p>
        <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-2 mb-8 font-medium">
          {message}
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-gold text-white font-medium text-sm hover:bg-gold-700 transition-colors"
          >
            Try again
          </Link>
          <Link
            href="/"
            className="text-sm text-charcoal-400 dark:text-charcoal-300 hover:text-gold transition-colors"
          >
            Return to home
          </Link>
        </div>

      </div>
    </div>
  );
}
