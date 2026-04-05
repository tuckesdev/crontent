import { ShipWheel } from "lucide-react";
import { CrewTerminal } from "@/components/landing/CrewTerminal";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { CrewRoster } from "@/components/landing/CrewRoster";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Subtle gradient background */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-white/[0.04] via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {/* Header row */}
        <div className="flex items-center justify-between mb-16 sm:mb-24">
          <div className="font-mono text-[13px] text-white/70 flex items-center gap-2">
            <ShipWheel size={14} strokeWidth={2} className="text-white" />
            <span>crontent</span>
          </div>
          <div className="font-mono text-[11px] text-white/30">
            v0 · active dev
          </div>
        </div>

        {/* Hero */}
        <section className="mb-14 sm:mb-20">
          <div className="mb-8 sm:mb-10">
            <h1 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.05]">
              your marketing crew,
              <br />
              <span className="text-white/50">on cron.</span>
            </h1>
            <p className="mt-5 sm:mt-6 font-mono text-[13px] sm:text-[14px] text-white/50 max-w-xl leading-relaxed">
              6 self-aware AI agents that run your product&apos;s marketing
              24/7. you ship. they post. built for vibe coders.
            </p>
          </div>

          <div className="mb-8">
            <CrewTerminal />
          </div>

          <div className="flex flex-col gap-3">
            <WaitlistForm />
            <p className="font-mono text-[10px] text-white/25 pl-1">
              no spam. crew will brief you at launch.
            </p>
          </div>
        </section>

        {/* Crew roster */}
        <section className="mb-16 sm:mb-24">
          <div className="mb-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 mb-2">
              the crew
            </h2>
            <p className="font-sans text-xl sm:text-2xl text-white/80 max-w-2xl">
              6 agents. full loop. open-source soul files.
            </p>
          </div>
          <CrewRoster />
        </section>

        {/* How it works */}
        <section className="mb-16 sm:mb-24">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 mb-6">
            how it works
          </h2>
          <div className="space-y-3 font-mono text-[13px] text-white/60 max-w-2xl">
            {[
              "connect your product — URL scrape + chat with Scout",
              "set a growth goal — Pilot proposes a 30-day plan",
              "approve the plan",
              "crew runs 24/7 — you watch the terminal, veto in one click",
              "Analyst reports weekly. crew adapts.",
            ].map((step, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-white/30 tabular-nums shrink-0">
                  0{i + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-[11px] text-white/30">
          <div>
            built with claude code · on cron · by a vibe coder for vibe coders
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/tuckesdev/crontent"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              github
            </a>
            <span className="text-white/15">·</span>
            <span>MIT © 2026</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
