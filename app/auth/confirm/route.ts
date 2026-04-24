// For OAuth provider confirmation flow (Google, GitHub, etc)  //
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

  // console.log("=== OAuth Callback ===");
  // console.log("Code:", code ? "EXISTS" : "MISSING");
  // console.log("Next:", next);
  // console.log("SiteUrl:", siteUrl);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    // console.log("Exchange Error:", error);

    if (!error) {
      const redirectUrl = `${siteUrl}/auth/sign-up-success?next=${next}`;
      // console.log("SUCCESS - Redirecting to:", redirectUrl); 
      return NextResponse.redirect(redirectUrl);              
    }

    return NextResponse.redirect(
      `${siteUrl}/auth/error?error=${encodeURIComponent(error.message)}`
    );
  }

  return NextResponse.redirect(
    `${siteUrl}/auth/error?error=${encodeURIComponent("No code provided")}`
  );
}





// import { createClient } from "@/lib/supabase/server";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const { searchParams, origin } = new URL(request.url);

//   const code = searchParams.get("code");
//   const next = searchParams.get("next") ?? "/";

//   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

//   console.log("=== OAuth Callback ===");
//   console.log("Code:", code ? "EXISTS" : "MISSING");
//   console.log("Next:", next);
//   console.log("SiteUrl:", siteUrl);

//   if (code) {
//     const supabase = await createClient();
//     const { error } = await supabase.auth.exchangeCodeForSession(code);

//     console.log("Exchange Error:", error);

//     if (!error) {
//       return NextResponse.redirect(`${siteUrl}/auth/sign-up-success?next=${next}`);
      
//     }

//     return NextResponse.redirect(
//       `${siteUrl}/auth/error?error=${encodeURIComponent(error.message)}`
//     );
//   }

//   return NextResponse.redirect(
//     `${siteUrl}/auth/error?error=${encodeURIComponent("No code provided")}`
//   );
// }





// import { createClient } from "@/lib/supabase/server";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const { searchParams, origin } = new URL(request.url);

//   const code = searchParams.get("code");
//   const next = searchParams.get("next") ?? "/";

//   const siteUrl =
//     process.env.NEXT_PUBLIC_SITE_URL || origin; // ✅ origin fallback

//   if (code) {
//     const supabase = await createClient();

//     const { error } = await supabase.auth.exchangeCodeForSession(code);

//     if (!error) {
//       // ✅ window.location jaisi hard redirect
//       return NextResponse.redirect(`${siteUrl}/auth/sign-up-success?next=${next}`);
//     }

//     // ✅ Error bhi redirect mein encode karo
//     console.log("OAuth Error:", error);
//     return NextResponse.redirect(
//       `${siteUrl}/auth/error?error=${encodeURIComponent(error.message)}`
//     );
//   }

//   return NextResponse.redirect(
//     `${siteUrl}/auth/error?error=${encodeURIComponent("No code provided")}`
//   );
// }
// ==================================================================================================
// import { createClient } from "@/lib/supabase/server";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);

//   const code = searchParams.get("code");
//   const next = searchParams.get("next") ?? "/";

//   const siteUrl =
//     process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

//   if (code) {
//     const supabase = await createClient();

//     const { error } = await supabase.auth.exchangeCodeForSession(code);

//     if (!error) {
//       return NextResponse.redirect(`${siteUrl}${next}`);
//     }
//   }

//   return NextResponse.redirect(
//     `${siteUrl}/auth/error?error=OAuth failed`
//   );
// }

//////////////////////////////////////////////////////////

//--------------- For OTP confirmation flow (email or SMS) ---------------

// import { createClient } from "@/lib/supabase/server";
// import { type EmailOtpType } from "@supabase/supabase-js";
// import { redirect } from "next/navigation";
// import { type NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const token_hash = searchParams.get("token_hash");
//   const type = searchParams.get("type") as EmailOtpType | null;
//   const next = searchParams.get("next") ?? "/";

//   if (token_hash && type) {
//     const supabase = await createClient();

//     const { error } = await supabase.auth.verifyOtp({
//       type,
//       token_hash,
//     });
//     if (!error) {
//       // redirect user to specified redirect URL or root of app
//       redirect(next);
//     } else {
//       // redirect the user to an error page with some instructions
//       redirect(`/auth/error?error=${error?.message}`);
//     }
//   }

//   // redirect the user to an error page with some instructions
//   redirect(`/auth/error?error=No token hash or type`);
// }

//////////////////////////////////////////

// For OAuth provider confirmation flow (Google, GitHub, etc)  //

// import { createClient } from "@/lib/supabase/server";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);

//   const code = searchParams.get("code");
//   const next = searchParams.get("next") ?? "/";

//   if (code) {
//     const supabase = await createClient();

//     const { error } = await supabase.auth.exchangeCodeForSession(code);

//     if (!error) {
//       return NextResponse.redirect(`http://localhost:3000${next}`);
//     }
//   }

//   return NextResponse.redirect(
//     `http://localhost:3000/auth/error?error=OAuth failed`
//   );
// }
