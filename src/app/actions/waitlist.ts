"use server";

import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export type WaitlistResult =
  | { ok: true }
  | { ok: false; error: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function joinWaitlist(
  _prevState: WaitlistResult | null,
  formData: FormData,
): Promise<WaitlistResult> {
  const emailInput = formData.get("email");

  if (typeof emailInput !== "string" || !emailInput.trim()) {
    return { ok: false, error: "email required" };
  }

  const email = emailInput.trim().toLowerCase();

  if (!EMAIL_REGEX.test(email) || email.length > 320) {
    return { ok: false, error: "not a valid email" };
  }

  const h = await headers();
  const userAgent = h.get("user-agent") ?? null;
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  const { data, error } = await supabase.rpc("join_waitlist", {
    email_input: email,
    source_input: "landing",
    ua_input: userAgent,
    ip_input: ip,
  });

  if (error) {
    console.error("[waitlist] rpc failed:", error.code, error.message);
    return { ok: false, error: "something went wrong, try again" };
  }

  // Function returns false if email format was bad
  if (data === false) {
    return { ok: false, error: "not a valid email" };
  }

  return { ok: true };
}
