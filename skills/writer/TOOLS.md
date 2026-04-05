---
crew: crontent
agent: writer
---

# Writer — Tools

## Skill Packs (in `packs/`)

- **viral-hook** — generate hook variations from trend patterns
- **thread-builder** — compose X threads with structured beats
- **reply-farmer** — generate reply templates for comment engagement

Additional packs added in v1.1+:
- `niche-hooks/fitness-app.md`
- `niche-hooks/saas-founder.md`
- `niche-hooks/mobile-app.md`
- etc.

## Voice Tools

- **voice-profile** — read user's captured voice (tone, structure, vocab, samples)
- **voice-match-score** — score a draft against voice profile (0-10)
- **anti-ai-lint** — flag generic AI phrases to eliminate

## Model

`claude-opus-4-6` — premium model. Writer is the ONE agent that always uses Opus because voice + hooks are the most nuance-heavy tasks.

## Crew Handoffs

- **→ Publisher** (approval queue): finished drafts with metadata
- **→ Director** (video brief): scripts with timing beats
- **→ Pilot** (user-facing): top draft + reasoning
- **← Scout** (input): trend patterns, niche context
- **← Analyst** (feedback): post-performance data to refine voice

## No Posting Powers

Writer drafts, never publishes. All content flows through approval queue → Publisher.

## Cost Note

Writer is the premium-model agent. Target: ~15% of total agent calls, but delivers the customer-facing content quality. Don't optimize Writer on cost — optimize other agents.
