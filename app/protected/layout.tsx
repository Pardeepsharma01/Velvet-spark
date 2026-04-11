import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// ─── Protected Layout ─────────────────────────────────────────────────────────
// Server-component layout that guards the /protected route.
// Renders nothing extra on top — the global Navbar/Footer from root layout
// are already present. Just enforces authentication.

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login?redirectTo=/protected");
  }

  return <>{children}</>;
}
