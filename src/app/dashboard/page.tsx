import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { CREW } from "@/lib/crew";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Load user's brands (RLS filters to current user)
  const { data: brands } = await supabase
    .from("brands")
    .select("id, name, niche, status, created_at")
    .order("created_at", { ascending: false });

  const hasBrands = brands && brands.length > 0;

  if (!hasBrands) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-sans text-2xl sm:text-3xl text-white">your brands</h1>
        <Link
          href="/onboarding"
          className="font-mono text-[12px] flex items-center gap-2 px-3.5 py-2 rounded-md bg-white text-black hover:bg-white/90 transition-colors"
        >
          <Plus size={14} strokeWidth={2.5} />
          new brand
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/dashboard/${brand.id}`}
            className="group rounded-lg border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-sans text-lg text-white">{brand.name}</h3>
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="text-white/30 group-hover:text-white/60 transition-colors"
              />
            </div>
            <p className="font-mono text-[11px] text-white/40 mb-4">
              {brand.niche ?? "no niche set"}
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-wide">
                {brand.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="max-w-2xl mx-auto pt-12 sm:pt-20">
      <h1 className="font-sans text-4xl sm:text-5xl text-white mb-4 leading-tight">
        welcome to the crew.
      </h1>
      <p className="font-mono text-[14px] text-white/60 mb-10 leading-relaxed max-w-lg">
        create your first brand and the crew will onboard you. scout will ingest your product, ask a few questions, and set up your voice profile.
      </p>

      <Link
        href="/onboarding"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white text-black font-mono text-[13px] hover:bg-white/90 transition-colors mb-14"
      >
        <Plus size={16} strokeWidth={2.5} />
        create your first brand
      </Link>

      {/* Crew preview */}
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 mb-4">
          your crew
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CREW.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.id}
                className="rounded-md border border-white/10 bg-white/[0.02] p-3 flex items-center gap-2.5"
              >
                <Icon
                  className={agent.color}
                  size={16}
                  strokeWidth={2}
                  aria-hidden
                />
                <span className={`font-mono text-[12px] ${agent.color}`}>
                  {agent.name.toLowerCase()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
