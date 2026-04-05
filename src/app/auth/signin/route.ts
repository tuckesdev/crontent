import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Initiates Google OAuth. Accepts ?next=<path> to control post-auth redirect.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const next = searchParams.get("next") || "/generate";

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error || !data.url) {
    return NextResponse.redirect(`${origin}/?auth_error=${encodeURIComponent(error?.message || "signin_failed")}`);
  }

  return NextResponse.redirect(data.url);
}
