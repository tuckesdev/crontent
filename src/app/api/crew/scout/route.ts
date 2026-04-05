/**
 * Scout chat endpoint — onboarding conversations.
 *
 * POST /api/crew/scout
 * Body: { messages: UIMessage[], brandId?: string }
 *
 * Streams Scout's responses + tool calls back to the client.
 * Auth required (user must be signed in).
 */

import type { NextRequest } from "next/server";
import type { UIMessage } from "ai";
import { createClient } from "@/lib/supabase/server";
import { streamScoutChat } from "@/crew/scout";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Require auth
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Parse request body
    let body: { messages: UIMessage[]; brandId?: string };
    try {
      body = await req.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    if (!Array.isArray(body.messages)) {
      return new Response("messages array required", { status: 400 });
    }

    // If brandId is provided, verify user owns it
    if (body.brandId) {
      const { data: brand, error } = await supabase
        .from("brands")
        .select("id")
        .eq("id", body.brandId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (error || !brand) {
        return new Response("Brand not found or unauthorized", { status: 403 });
      }
    }

    // Stream Scout's response
    const result = await streamScoutChat({
      messages: body.messages,
      context: {
        supabase,
        userId: user.id,
        brandId: body.brandId,
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[api/crew/scout] error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
