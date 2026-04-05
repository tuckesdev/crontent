---
crew: crontent
agent: scout
---

# Scout — Tools

## External Research Tools

- **Firecrawl** — web scraping (user's product URL, competitor sites)
- **Apify** — TikTok scraper, Reddit scraper, X search
- **X API v2** — read-only search, user timeline, trending topics
- **TikTok Research API** (when available)
- **Reddit API** (via snoowrap or direct)

## Skill Packs

`packs/` directory is shared across crew — Scout uses:
- **trend-scraper** — hashtag + sound + hook pattern extraction
- **niche-scanner** — find top 20 accounts in a niche
- **voice-extractor** — analyze a user's X history to capture tone

## Crew Handoffs

- **→ Writer** — pass curated trend reports with voice-fit notes
- **→ Director** — pass video format trends (jumpcut patterns, audio IDs)
- **→ Pilot** — escalate hot/viral moments for user attention
- **← Analyst** — receive angle-exhaustion signals (trigger fresh research)

## No Direct Publishing

Scout NEVER posts. Pure research agent. Output is data + recommendations, not content.

## Data Hygiene

- Cache trend data for 6 hours (same search within 6h returns cached)
- Store raw scrape in Supabase `scout_raw` table for Analyst backtracking
- Purge raw data older than 90 days
