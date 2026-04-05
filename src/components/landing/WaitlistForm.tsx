"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistResult } from "@/app/actions/waitlist";

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState<
    WaitlistResult | null,
    FormData
  >(joinWaitlist, null);

  if (state?.ok) {
    return (
      <div className="flex items-center gap-2.5 font-mono text-[13px] text-white/70">
        <span
          className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse-glow"
          aria-hidden
        />
        <span>you&apos;re in. crew will brief you at launch.</span>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-2 w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@vibe.coder"
          disabled={pending}
          className="flex-1 rounded-md border border-white/10 bg-white/[0.03] px-3.5 py-2.5 font-mono text-[13px] text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-0 disabled:opacity-50 transition-colors"
          aria-label="email address"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-white px-4 py-2.5 font-mono text-[13px] text-black hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          {pending ? "..." : "join waitlist"}
        </button>
      </div>
      {state?.ok === false && (
        <p
          role="alert"
          className="font-mono text-[11px] text-red-400/90 pl-1"
        >
          {state.error}
        </p>
      )}
    </form>
  );
}
