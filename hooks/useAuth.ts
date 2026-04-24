"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
}

// Check if Supabase env vars are configured
const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured); // skip loading if not configured

  useEffect(() => {
    // If Supabase is not configured, silently return — app still works, just no auth
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let subscription: { unsubscribe: () => void } | null = null;

    // Dynamically import to avoid module-level crashes
    import("@/lib/supabase/client")
      .then(({ createClient }) => {
        const supabase = createClient();

        // Get initial session
        supabase.auth.getUser().then(({ data }) => {
          setUser(data.user ?? null);
          setLoading(false);
        }).catch(() => {
          setUser(null);
          setLoading(false);
        });

        // Subscribe to auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
          }
        );
        subscription = listener.subscription;
      })
      .catch(() => {
        // Supabase failed to load — fail silently
        setLoading(false);
      });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return { user, loading, isLoggedIn: !!user };
}

//////////////////////

// "use client";

// import { useEffect, useState } from "react";
// import type { User } from "@supabase/supabase-js";

// export interface UseAuthReturn {
//   user: User | null;
//   loading: boolean;
//   isLoggedIn: boolean;
// }

// export function useAuth(): UseAuthReturn {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let subscription: any;

//     let supabaseClient: any;

//     const initAuth = async () => {
//       try {
//         const { createClient } = await import("@/lib/supabase/client");
//         supabaseClient = createClient();

//         // ✅ 1. Get initial session (IMPORTANT FIX)
//         const { data } = await supabaseClient.auth.getSession();

//         setUser(data.session?.user ?? null);
//         setLoading(false);

//         // ✅ 2. Listen to auth changes (login/logout realtime update)
//         const { data: authListener } =
//           supabaseClient.auth.onAuthStateChange(
//             (_event: string, session: any) => {
//               setUser(session?.user ?? null);
//               setLoading(false);
//             }
//           );

//         subscription = authListener.subscription;
//       } catch (error) {
//         console.error("Auth init error:", error);
//         setUser(null);
//         setLoading(false);
//       }
//     };

//     initAuth();

//     // cleanup
//     return () => {
//       subscription?.unsubscribe?.();
//     };
//   }, []);

//   return {
//     user,
//     loading,
//     isLoggedIn: !!user,
//   };
// }
