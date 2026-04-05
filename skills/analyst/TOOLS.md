---
crew: crontent
agent: analyst
---

# Analyst — Tools

## Analytics APIs

- **X API v2** — post metrics (impressions, engagements, CTR via analytics)
- **TikTok Insights API** (via connected account) — views, engagement, follower growth
- **Instagram Graph API Insights** — Reels performance, demographics
- **(No Reddit analytics in v1 — Reddit metrics are manual)**

## Data Layer

- **Supabase `post_metrics` table** — time-series post performance
- **Supabase `brand_metrics` table** — rolling averages per brand
- **Supabase `niche_benchmarks` table** — updated weekly via Scout + Analyst join

## Benchmark Updates (scheduled)

- Weekly (Monday 6am): refresh niche benchmarks
- Daily: update user's rolling baseline
- Real-time: compare incoming metrics to baselines + benchmarks

## Crew Handoffs

- **→ Pilot** — Monday reports, urgent escalations (declines, viral)
- **→ Scout** — trend-conversion feedback
- **→ Writer** — hook-performance feedback
- **→ Publisher** — timing optimization data
- **← Publisher** — raw post metrics (first-hour + 24-hour + 7-day)

## No Content / No Posting

Analyst NEVER:
- Generates copy (Writer's job)
- Posts content (Publisher's job)
- Changes posting schedules (Publisher + user's rules)

Analyst reports + teaches the crew. Pure feedback loop agent.

## Reporting Format

Weekly Monday report structure:
```yaml
week_of: 2026-04-06
wins:
  - post_url: ...
    pattern: "question-hook + demo reveal"
    ctr: 6.2%
    benchmark_delta: "+94%"
losses:
  - post_url: ...
    diagnosis: "hook was too abstract, body was too long"
    ctr: 0.9%
pattern_of_week: "question-hooks beat statement-hooks 3:1 in your niche"
goal_progress: "47% to 1K followers, on track for June 14"
next_week_focus:
  - "Scout: find 5 more question-hook trends"
  - "Writer: lean into question-hook formats"
  - "Publisher: shift 7pm posts to 7:42pm (peak data confirmed)"
```
