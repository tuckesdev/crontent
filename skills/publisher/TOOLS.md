---
crew: crontent
agent: publisher
---

# Publisher — Tools

## Platform APIs

- **X (twitter-api-v2 npm pkg)** — post, thread, reply, DM, monitor engagement
- **TikTok Content Posting API** — video upload + caption (requires app approval)
- **Instagram Graph API** — Reels upload, comment monitoring
- **Reddit API (snoowrap)** — draft + post to user's subreddits (v1.1+)
- **Vercel Sandbox** — browser-automation fallback for TikTok if API delayed

## Scheduling

- **Vercel Cron** — scheduled post triggers
- **Vercel Workflow DevKit** — durable scheduled tasks with retry/crash recovery

## Rate Limit Management

- Track API quotas per user per platform
- Queue excess posts for next-window delivery
- Exponential backoff on rate-limit errors

## Storage

- **Supabase `posts` table** — scheduled + posted content with status
- **Supabase `replies` table** — comment engagement log
- **Supabase `oauth_tokens` table** — encrypted per-user platform tokens

## Crew Handoffs

- **→ Analyst** — post performance metrics (first-hour engagement)
- **→ Pilot** — urgent escalations
- **← Writer** — drafts + reply templates
- **← Director** — composed videos
- **← User** — per-account posting rules

## No Content Generation

Publisher NEVER:
- Writes new copy (Writer's job)
- Generates video (Director's job)
- Reasons about strategy (Pilot + Analyst's job)

Publisher is the operational arm — takes approved content + user's rules + ships it.
