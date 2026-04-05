import { redirect } from "next/navigation";
import Link from "next/link";
import { ShipWheel } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isAllowed } from "@/lib/allowlist";
import { UserMenu } from "@/components/auth/UserMenu";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin?next=/dashboard");
  }

  // Private beta: only allowlisted emails reach the dashboard
  if (!isAllowed(user.email)) {
    redirect("/?beta=gated");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top nav */}
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="font-mono text-[13px] text-white/70 hover:text-white flex items-center gap-2 transition-colors"
          >
            <ShipWheel size={14} strokeWidth={2} className="text-white" />
            <span>crontent</span>
          </Link>
          <UserMenu initialEmail={user.email ?? null} />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
