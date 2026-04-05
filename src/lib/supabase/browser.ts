import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for use in client components ('use client').
 * Persists the session in a cookie so server components see it too.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
