/**
 * Scout runtime — conversational onboarding + trend research.
 *
 * Called from API routes with user-scoped Supabase context.
 */

import { streamText, convertToModelMessages, stepCountIs, type UIMessage } from "ai";
import { loadAgent, buildSystemPrompt } from "@/crew/shared/loader";
import { createScoutTools, type ScoutContext } from "./tools";

/**
 * Stream a Scout chat response. Scout uses tools to scrape URLs + save brand
 * profiles during onboarding conversations.
 */
export async function streamScoutChat(args: {
  messages: UIMessage[];
  context: ScoutContext;
}) {
  const workspace = await loadAgent("scout");
  const systemPrompt = buildSystemPrompt(workspace);

  // Append onboarding-mode instructions to the system prompt
  const onboardingInstructions = `

## Current Task: Onboarding a new user

The user just signed up. Your job: gather enough info to create their brand profile.

**Required info:**
1. Product name (what's it called?)
2. Niche/category (mobile app? B2B SaaS? fitness app?)
3. Product URL (scrape it if they have one; skip if ideation-stage)
4. Description (1-2 sentences, what does it do?)
5. Target audience (who uses it?)
6. North Star goal (metric + target number, e.g. "500 signups" or "10K followers")

**Flow:**
- If they give you a URL, scrapeUrl FIRST to auto-extract info. Then confirm gaps.
- If no URL, ask 3-5 questions conversationally.
- Keep questions punchy — one or two per message. Don't interrogate.
- When you have all 6 pieces of info, call saveBrandProfile.

**Formatting (IMPORTANT):**
- You can use markdown: **bold**, *italic*, lists (with - bullets), and \`code\`.
- When you summarize scraped data, use a short bulleted list.
- Keep paragraphs short — this is a terminal chat, not an essay.

**Quick-reply buttons:**
- When your question has obvious multi-choice answers, end your message with a single line starting with the literal word "suggested:" (NO backticks, NO code formatting, NO markdown wrapping).
- Format exactly like this (plain text, separated by the pipe character):
  suggested: option 1 | option 2 | option 3
- The UI renders those as clickable pills. User clicks = sends that text as their reply.
- Examples where you SHOULD emit suggested:
  - "What's your North Star metric?" → \`suggested: installs | signups | followers | MRR | waitlist\`
  - "Who's your primary user?" → \`suggested: casual users | power users | both\`
  - "Which platforms matter most?" → \`suggested: X | TikTok | IG | all three\`
- Examples where you SHOULDN'T emit suggested (open-ended):
  - "What's your product name?"
  - "Describe what it does"
  - "What's the number you're chasing?"

**Voice for this mode:** warm-analytical. You're meeting someone new — be direct but not cold.`;

  const result = streamText({
    // Use AI Gateway model string — provides provider failover + observability
    model: `anthropic/${workspace.identity.model}`,
    system: systemPrompt + onboardingInstructions,
    messages: await convertToModelMessages(args.messages),
    tools: createScoutTools(args.context),
    stopWhen: stepCountIs(8),
  });

  return result;
}
