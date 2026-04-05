---
crew: crontent
agent: director
---

# Director — Tools

## Composition

- **Remotion** — React-based video composition (TikTokVideo scenes, overlays, transitions)
- **Supabase Storage** — user's uploaded footage + generated clip assets

## AI Generation

- **Gemini video** (via `@google/generative-ai`) — hook clip generation, UGC faces
- **fal.ai video** (e.g., PixVerse, Kling) — alternative generation for varied styles
- **Gemini image** — thumbnails, text overlay cards
- Image generation for split-screen reaction cards, caption cards

## Audio

- **Trend audio pool** (curated by Scout) — safe, trending sounds per niche
- User-uploaded audio (if provided)
- NO copyrighted track usage without explicit user license

## Format Presets

Located in `skills/director/formats/` (future):
- `jumpcut-to-chaos.json`
- `pov-hook.json`
- `split-screen-reaction.json`
- `slow-reveal.json`
- `tutorial-walkthrough.json`

Each preset: duration template, cut rhythm, transition types, caption style.

## Crew Handoffs

- **→ Publisher** — finished video with platform-specific export (TikTok/IG)
- **→ Pilot** — user-facing preview link
- **← Writer** — script with timing beats
- **← Scout** — video trend data

## No Posting

Director composes, Publisher ships. Director NEVER uploads to platforms directly.
