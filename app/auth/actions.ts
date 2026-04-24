"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// ─── Sign Up ──────────────────────────────────────────────────────────────────

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
    },
  });

  if (error) {
    return redirect(`/auth/sign-up?error=${encodeURIComponent(error.message)}`);
  }
return redirect("/auth/sign-up-success");
  // return redirect("/auth/sign-up-success");
  // revalidatePath("/", "layout");
// return redirect("/auth/sign-up-success?next=" + redirectTo);
}

// ─── Sign In ──────────────────────────────────────────────────────────────────

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/";

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return redirect(`/auth/login?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  // return redirect(redirectTo);
  return redirect("/auth/sign-up-success?next=" + redirectTo);
}

// ─── Google OAuth ─────────────────────────────────────────────────────────────

export async function signInWithGoogle() {
  const supabase = await createClient();

  // const siteUrl =
  //   process.env.NEXT_PUBLIC_SITE_URL ||
  //   process.env.VERCEL_URL
  //     ? `https://${process.env.VERCEL_URL}`
  //     : "http://localhost:3000";

  const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${siteUrl}/auth/confirm?next=/`,
      // redirectTo: `${siteUrl}/auth/confirm?next=/auth/sign-up-success`,
      // redirectTo: `${siteUrl}/auth/confirm?next=/auth/sign-up-success`,
    },
  });

  if (error) {
    return redirect(`/auth/login?error=${encodeURIComponent(error.message)}`);
  }

  if (data.url) {
    return redirect(data.url);
  }
}

// ─── Sign Out ─────────────────────────────────────────────────────────────────

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  return redirect("/auth/signout-success");
}
