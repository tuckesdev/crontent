import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

/**
 * Supabase client for use in client components ('use client').
 * Persists the session in a cookie so server components see it too.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
