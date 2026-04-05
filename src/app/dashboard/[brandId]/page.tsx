import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const { brandId } = await params;
  const supabase = await createClient();

  const { data: brand } = await supabase
    .from("brands")
    .select("*")
    .eq("id", brandId)
    .maybeSingle();

  if (!brand) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/40 hover:text-white/70 mb-6 transition-colors"
      >
        <ArrowLeft size={12} strokeWidth={2} />
        brands
      </Link>

      <div className="mb-8">
        <h1 className="font-sans text-3xl text-white mb-2">{brand.name}</h1>
        <p className="font-mono text-[12px] text-white/50">
          {brand.niche ?? "no niche set"} · {brand.status}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <Field label="description" value={brand.description} />
        <Field label="target audience" value={brand.target_audience} />
        <Field label="product URL" value={brand.product_url} />
        <Field
          label="north star"
          value={
            brand.north_star_metric && brand.north_star_target
              ? `${brand.north_star_target.toLocaleString()} ${brand.north_star_metric}`
              : null
          }
        />
        <Field
          label="deadline"
          value={
            brand.north_star_deadline
              ? new Date(brand.north_star_deadline).toLocaleDateString()
              : null
          }
        />
        <Field
          label="created"
          value={new Date(brand.created_at).toLocaleDateString()}
        />
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6 text-center">
        <p className="font-mono text-[12px] text-white/40">
          crew terminal + content calendar + analytics coming next.
        </p>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.02] p-4">
      <div className="font-mono text-[10px] uppercase tracking-wide text-white/40 mb-1.5">
        {label}
      </div>
      <div className="font-mono text-[13px] text-white/80 break-words">
        {value ?? <span className="text-white/30">—</span>}
      </div>
    </div>
  );
}
