"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, signInWithGoogle } from "@/app/auth/actions";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export default function LoginForm() {
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [formError, setFormError] = useState<{ email?: string; password?: string }>({});
  const [isPending, startTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  useEffect(() => {
    const err = searchParams.get("error");
    if (err) setServerError(decodeURIComponent(err));
  }, [searchParams]);

  function validate(email: string, password: string) {
    const errors: { email?: string; password?: string } = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    return errors;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const errors = validate(email, password);
    if (Object.keys(errors).length > 0) { setFormError(errors); return; }
    setFormError({});
    startTransition(() => { signIn(new FormData(form)); });
  }

  function handleGoogle() {
    startGoogleTransition(() => { signInWithGoogle(); });
  }

  return (
    <div className="bg-white dark:bg-charcoal-700 rounded-2xl shadow-card-lg border border-border p-8 md:p-10">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-charcoal dark:text-ivory mb-2">Welcome back</h1>
        <p className="text-sm text-charcoal-400 dark:text-charcoal-300">Sign in to your Velvet Spark account</p>
      </div>

      {serverError && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          {serverError}
        </div>
      )}

      <Button type="button" variant="ghost" size="md" fullWidth onClick={handleGoogle}
        disabled={isGooglePending || isPending}
        className="mb-6 border border-border hover:border-gold/40 hover:bg-gold/5 hover:text-charcoal gap-3">
        {isGooglePending
          ? <span className="h-4 w-4 rounded-full border-2 border-charcoal-300 border-t-gold animate-spin" />
          : <GoogleIcon />}
        Continue with Google
      </Button>

      <div className="relative flex items-center gap-3 mb-6">
        <div className="flex-1 divider-gold" />
        <span className="text-xs text-charcoal-400 dark:text-charcoal-300 flex-shrink-0">or sign in with email</span>
        <div className="flex-1 divider-gold" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <input type="hidden" name="redirectTo" value={searchParams.get("redirectTo") ?? "/"} />
        <Input name="email" type="email" label="Email address" placeholder="you@example.com"
          autoComplete="email" error={!!formError.email} hint={formError.email} disabled={isPending} />
        <div className="flex flex-col gap-1.5">
          <Input name="password" type="password" label="Password" placeholder="••••••••"
            autoComplete="current-password" error={!!formError.password} hint={formError.password} disabled={isPending} />
          <div className="flex justify-end">
            <Link href="/auth/forgot-password" className="text-xs text-gold hover:text-gold-700 transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>
        <Button type="submit" variant="primary" size="md" fullWidth disabled={isPending || isGooglePending} className="mt-1">
          {isPending
            ? <span className="flex items-center gap-2"><span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />Signing in…</span>
            : "Sign In"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-charcoal-400 dark:text-charcoal-300">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="text-gold font-medium hover:text-gold-700 transition-colors">Create one</Link>
      </p>
    </div>
  );
}
