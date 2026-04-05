/**
 * Scout's tools — URL scraping + brand profile saving.
 *
 * Tools are created per-request with user-scoped Supabase context.
 */

import { tool } from "ai";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import FirecrawlApp from "@mendable/firecrawl-js";
import type { Database, AgentId, Json } from "@/lib/supabase/database.types";

export interface ScoutContext {
  supabase: SupabaseClient<Database>;
  userId: string;
  /** If brand already exists (editing profile), pass brandId to update instead of insert. */
  brandId?: string;
}

// Lazy-init Firecrawl — env var might not be set at build time
let _firecrawl: FirecrawlApp | null = null;
function getFirecrawl(): FirecrawlApp {
  if (!_firecrawl) {
    const apiKey = process.env.FIRECRAWL_API_KEY;
    if (!apiKey) {
      throw new Error(
        "FIRECRAWL_API_KEY env var required for Scout URL scraping",
      );
    }
    _firecrawl = new FirecrawlApp({ apiKey });
  }
  return _firecrawl;
}

/**
 * Create Scout's tools bound to a user's Supabase context.
 */
export function createScoutTools(ctx: ScoutContext) {
  return {
    scrapeUrl: tool({
      description:
        "Scrape a product URL and extract key info: product name, description, target audience, tone. Use this when the user provides a URL during onboarding.",
      inputSchema: z.object({
        url: z.string().url().describe("The product website URL to scrape"),
      }),
      execute: async ({ url }) => {
        try {
          const doc = await getFirecrawl().scrape(url, {
            formats: ["markdown"],
            onlyMainContent: true,
          });

          // Return the markdown + metadata for the LLM to parse
          return {
            success: true as const,
            url,
            title: doc.metadata?.title ?? null,
            description: doc.metadata?.description ?? null,
            ogImage: doc.metadata?.ogImage ?? null,
            // Trim to reasonable size — Scout reads the summary, not the whole page
            markdown: doc.markdown?.slice(0, 8000) ?? "",
          };
        } catch (error) {
          return {
            success: false as const,
            error:
              error instanceof Error ? error.message : "Unknown scrape error",
            url,
          };
        }
      },
    }),

    saveBrandProfile: tool({
      description:
        "Save the brand profile to the database. Call this ONCE after gathering: name, niche, product URL (optional), description, target audience, and North Star goal.",
      inputSchema: z.object({
        name: z.string().describe("Short brand/product name"),
        niche: z
          .string()
          .describe("Category: 'mobile app', 'B2B SaaS', 'fitness app', etc."),
        product_url: z
          .string()
          .url()
          .nullable()
          .describe("Product website URL (null if ideation stage)"),
        description: z
          .string()
          .describe("1-2 sentence description of what the product does"),
        target_audience: z.string().describe("Who the product is for"),
        north_star_metric: z
          .enum(["signups", "installs", "followers", "mrr", "waitlist", "other"])
          .describe("Primary growth metric"),
        north_star_target: z
          .number()
          .int()
          .describe("Target number for the metric"),
      }),
      execute: async (input) => {
        if (ctx.brandId) {
          // Update existing brand
          const { error } = await ctx.supabase
            .from("brands")
            .update({
              name: input.name,
              niche: input.niche,
              product_url: input.product_url,
              description: input.description,
              target_audience: input.target_audience,
              north_star_metric: input.north_star_metric,
              north_star_target: input.north_star_target,
              status: "active",
            })
            .eq("id", ctx.brandId)
            .eq("user_id", ctx.userId);

          if (error) {
            return { success: false as const, error: error.message };
          }
          return { success: true as const, brandId: ctx.brandId, updated: true };
        }

        // Insert new brand
        const { data, error } = await ctx.supabase
          .from("brands")
          .insert({
            user_id: ctx.userId,
            name: input.name,
            niche: input.niche,
            product_url: input.product_url,
            description: input.description,
            target_audience: input.target_audience,
            north_star_metric: input.north_star_metric,
            north_star_target: input.north_star_target,
            status: "active",
          })
          .select("id")
          .single();

        if (error) {
          return { success: false as const, error: error.message };
        }
        return { success: true as const, brandId: data.id, updated: false };
      },
    }),
  };
}

/**
 * Log an agent event to the audit trail.
 * Call this from API routes after agent runs — not from inside tool execute.
 */
export async function logAgentEvent(
  supabase: SupabaseClient<Database>,
  args: {
    userId: string;
    brandId?: string | null;
    agent: AgentId;
    eventType: "delegation" | "output" | "error" | "escalation" | "heartbeat";
    content: Json;
  },
): Promise<void> {
  await supabase.from("agent_events").insert({
    user_id: args.userId,
    brand_id: args.brandId ?? null,
    agent: args.agent,
    event_type: args.eventType,
    content: args.content,
  });
}
