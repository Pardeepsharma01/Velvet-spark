"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/app/auth/actions";

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [formError, setFormError] = useState<{ name?: string; email?: string; password?: string }>({});
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const err = searchParams.get("error");
    if (err) setServerError(decodeURIComponent(err));
  }, [searchParams]);

  function validate(name: string, email: string, password: string) {
    const errors: { name?: string; email?: string; password?: string } = {};
    if (!name || name.trim().length < 2) errors.name = "Please enter your full name (min 2 characters).";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
    if (!password || password.length < 8) errors.password = "Password must be at least 8 characters.";
    return errors;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const errors = validate(name, email, password);
    if (Object.keys(errors).length > 0) { setFormError(errors); return; }
    setFormError({});
    startTransition(() => { signUp(new FormData(form)); });
  }

  return (
    <div className="bg-white dark:bg-charcoal-700 rounded-2xl shadow-card-lg border border-border p-8 md:p-10">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-charcoal dark:text-ivory mb-2">Create account</h1>
        <p className="text-sm text-charcoal-400 dark:text-charcoal-300">Join Velvet Spark and discover premium jewelry</p>
      </div>

      {serverError && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <Input name="name" type="text" label="Full name" placeholder="Enter your Name"
          autoComplete="name" error={!!formError.name} hint={formError.name} disabled={isPending} />
        <Input name="email" type="email" label="Email address" placeholder="you@example.com"
          autoComplete="email" error={!!formError.email} hint={formError.email} disabled={isPending} />
        <Input name="password" type="password" label="Password" placeholder="Min 8 characters"
          autoComplete="new-password" error={!!formError.password} hint={formError.password} disabled={isPending} />

        <Button type="submit" variant="primary" size="md" fullWidth disabled={isPending} className="mt-1">
          {isPending
            ? <span className="flex items-center gap-2"><span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />Creating account…</span>
            : "Create Account"}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-charcoal-400 dark:text-charcoal-300 leading-relaxed">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="text-gold hover:underline">Terms of Service</Link>{" "}and{" "}
        <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>.
      </p>

      <p className="mt-6 text-center text-sm text-charcoal-400 dark:text-charcoal-300">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-gold font-medium hover:text-gold-700 transition-colors">Sign in</Link>
      </p>
    </div>
  );
}
