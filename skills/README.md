# The Crontent Crew

Open-source soul files + skill packs for the 6 agents that power [Crontent](https://crontent.ai).

> *"Be the assistant you'd actually want to talk to at 2am. Not a corporate drone. Not a sycophant. Just... good."*
> — adapted from [OpenClaw's SOUL.md philosophy](https://docs.openclaw.ai/concepts/soul) 🦞

---

## The Crew

| | Agent | Role | Model |
|---|---|---|---|
| **⎈** | [Pilot](./pilot) | crew lead · user chat · delegation | Claude Sonnet 4.6 |
| **◎** | [Scout](./scout) | research · trends · onboarding | Claude Sonnet 4.6 |
| **¶** | [Writer](./writer) | hooks · threads · scripts · DMs | Claude Opus 4.6 |
| **▶** | [Director](./director) | video composition · UGC hooks | Claude Sonnet 4.6 |
| **↗** | [Publisher](./publisher) | posting · scheduling · replies | Claude Haiku 4.5 |
| **△** | [Analyst](./analyst) | metrics · learning loop | Claude Sonnet 4.6 |

## File Structure

Each agent has a workspace with 4 files:

```
skills/<agent>/
├── SOUL.md          voice, opinions, boundaries, vibe
├── IDENTITY.md      name, icon, color, model, signature
├── AGENTS.md        operating rules, delegation, safety
└── TOOLS.md         skill packs + crew handoffs
```

Writer also has `packs/` — modular skill packs for specific copywriting tasks (viral-hook, thread-builder, reply-farmer).

## Why File-Based Personality?

Inspired directly by [OpenClaw](https://github.com/openclaw/openclaw)'s approach:

- **Personality is a file**, not buried in prompts
- **Agents wake fresh each session** — files ARE their memory
- **Short beats long. Sharp beats vague.**
- **Versioned, forkable, diffable** — personality evolves like code

## How These Files Are Used

In the Crontent runtime:
1. Each user gets their own crew instance (per-brand)
2. Each agent reads its SOUL.md + IDENTITY.md as high-priority instructions
3. AGENTS.md defines operating rules (when to act, who to delegate to)
4. TOOLS.md lists available skill packs + crew handoffs
5. Per-user state lives in Supabase (not local filesystem)

## Fork + Remix

Want to build your own marketing crew? Fork this repo:

```bash
git clone https://github.com/tuckesdev/crontent
cd crontent/skills
# Edit any SOUL.md to change an agent's voice
# Edit AGENTS.md to change delegation logic
# Publish your own pack in packs/
```

All soul files + skill packs are **MIT licensed**. Use them in your own project, modify them, ship your own crew.

## Crew Code (shared principles)

Every agent follows these:

1. Short beats long. Sharp beats vague.
2. Never open with "Great question!" / "I'd be happy to help!" / "Absolutely!" — just answer.
3. Have opinions. Hedging is a sin.
4. Roast your own output when it's slop. Charm over cruelty.
5. You're AI. Act like it. Don't pretend to be human.
6. Be the agent the user would actually want on their team at 2am.

## Credits

File-based personality architecture inspired by [OpenClaw](https://github.com/openclaw/openclaw) 🦞 (the Molty / SOUL.md pattern). We're not a fork — we built our own multi-tenant runtime — but the conventions we adopted deserve credit.

[Paperclip](https://github.com/paperclipai/paperclip) informed our heartbeat + goal-ancestry patterns.

## License

MIT © 2026
