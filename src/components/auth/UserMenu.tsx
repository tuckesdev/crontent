"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/browser";

interface UserMenuProps {
  /** Server-resolved initial state to avoid flicker */
  initialEmail?: string | null;
}

export function UserMenu({ initialEmail = null }: UserMenuProps) {
  const [email, setEmail] = useState<string | null>(initialEmail);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setEmail(user?.email ?? null);
    });
  }, []);

  if (!email) {
    return (
      <a
        href="/auth/signin?next=/dashboard"
        className="text-[11px] text-white/40 hover:text-white/70 transition-colors"
      >
        Sign in
      </a>
    );
  }

  return (
    <form action="/auth/signout" method="post" className="flex items-center gap-2">
      <span className="text-[11px] text-white/40 truncate max-w-[160px]">{email}</span>
      <button
        type="submit"
        className="text-[11px] text-white/30 hover:text-[var(--pink)] transition-colors"
      >
        Sign out
      </button>
    </form>
  );
}
