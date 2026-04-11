"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { signOut } from "@/app/auth/actions";
import type { User } from "@supabase/supabase-js";

// ─── Avatar Initials ──────────────────────────────────────────────────────────

function AvatarInitials({ name, email }: { name?: string; email?: string }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : email?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="w-20 h-20 rounded-full bg-gold/15 border-2 border-gold/40 flex items-center justify-center">
      <span className="font-display text-2xl font-bold text-gradient-gold">
        {initials}
      </span>
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/auth/login?redirectTo=/profile");
        return;
      }
      setUser(data.user);
      setLoading(false);
    });
  }, [router]);

  if (loading) {
    return (
      <Section spacing="xl">
        <Container size="sm">
          <div className="flex justify-center items-center min-h-[40vh]">
            <span className="h-8 w-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
          </div>
        </Container>
      </Section>
    );
  }

  const name = user?.user_metadata?.full_name as string | undefined;
  const email = user?.email;
  const joinedAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <Section spacing="xl">
      <Container size="sm">
        <div className="max-w-lg mx-auto">

          {/* Page heading */}
          <h1 className="font-display text-3xl font-bold text-charcoal dark:text-ivory mb-8 text-center">
            My Profile
          </h1>

          {/* Profile card */}
          <div className="bg-white dark:bg-charcoal-700 rounded-2xl shadow-card-lg border border-border p-8">

            {/* Avatar + name */}
            <div className="flex flex-col items-center gap-3 mb-8 pb-8 border-b border-border">
              <AvatarInitials name={name} email={email} />
              <div className="text-center">
                <h2 className="font-display text-xl font-semibold text-charcoal dark:text-ivory">
                  {name ?? "Velvet Spark Customer"}
                </h2>
                {joinedAt && (
                  <p className="text-xs text-charcoal-400 dark:text-charcoal-300 mt-1">
                    Member since {joinedAt}
                  </p>
                )}
              </div>
            </div>

            {/* Account details */}
            <div className="flex flex-col gap-4 mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">
                Account Details
              </h3>

              {/* Name row */}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-charcoal-400 dark:text-charcoal-300 font-medium">
                  Full Name
                </span>
                <span className="text-sm text-charcoal dark:text-ivory font-medium">
                  {name ?? "—"}
                </span>
              </div>

              {/* Email row */}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-charcoal-400 dark:text-charcoal-300 font-medium">
                  Email Address
                </span>
                <span className="text-sm text-charcoal dark:text-ivory font-medium">
                  {email}
                </span>
              </div>

              {/* Auth provider */}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-charcoal-400 dark:text-charcoal-300 font-medium">
                  Sign-in Method
                </span>
                <span className="text-sm text-charcoal dark:text-ivory font-medium capitalize">
                  {user?.app_metadata?.provider ?? "email"}
                </span>
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-col gap-2 mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">
                Quick Access
              </h3>
              {[
                { label: "My Orders", href: "/orders" },
                { label: "My Wishlist", href: "/wishlist" },
                { label: "Change Password", href: "/auth/update-password" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border border-border hover:border-gold/40 hover:bg-gold/5 transition-colors group"
                >
                  <span className="text-sm text-charcoal dark:text-ivory group-hover:text-gold transition-colors">
                    {item.label}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-charcoal-400 group-hover:text-gold transition-colors"
                    aria-hidden="true"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Sign out */}
            <form action={signOut}>
              <Button
                type="submit"
                variant="outline"
                size="md"
                fullWidth
                className="border-destructive/50 text-destructive hover:bg-destructive hover:text-white hover:border-destructive"
              >
                Sign Out
              </Button>
            </form>
          </div>

        </div>
      </Container>
    </Section>
  );
}
