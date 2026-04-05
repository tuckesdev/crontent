import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAllowed } from "@/lib/allowlist";
import { OnboardingFlow } from "./OnboardingFlow";

export default async function OnboardingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin?next=/onboarding");
  }

  if (!isAllowed(user.email)) {
    redirect("/?beta=gated");
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        <OnboardingFlow />
      </div>
    </main>
  );
}
