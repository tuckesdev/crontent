# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What is Crontent

**Crontent is the autonomous marketing crew for vibe coders.** Six self-aware AI agents — Pilot, Scout, Writer, Director, Publisher, Analyst — run 24/7 and handle the full marketing loop (research → write → post → learn) across X + TikTok + Instagram Reels. You ship the product; the crew handles distribution.

Tagline: **"Your marketing crew, on cron."**

## Current state

Clean slate (as of 2026-04-05). The old video-generation pipeline lives on the `legacy-video-gen` branch for later Director reuse. Current `main` has: auth (Supabase SSR), shadcn primitives, and a placeholder landing page. Next: waitlist landing + crew soul files.

## Commands

```bash
npm run dev          # Next.js 16 dev server (localhost:3000)
npm run build        # Production build (Turbopack)
npm run lint         # ESLint flat config
```

## Architecture (planned)

```
src/
├── app/             # Next.js 16 App Router — dashboard, landing, API routes, auth
├── crew/            # 6 agents: pilot, scout, writer, director, publisher, analyst
├── skills/          # Modular skill packs (mirrored to OSS crontent/crew repo)
├── channels/        # X, TikTok, IG, Telegram, iMessage adapters
├── heartbeat/       # Vercel Workflow DevKit — scheduled + event-driven crew wake
├── tickets/         # Audit log + approval queue
└── lib/             # Shared utils (supabase, ai providers, etc.)
```

**Tech stack:** Next.js 16 (App Router, Turbopack) · Supabase (auth + Postgres + storage, multi-brand via RLS) · Vercel AI SDK v6 · Vercel Workflow DevKit (DurableAgent for heartbeats) · Vercel Sandbox (browser automation for TikTok publishing fallback) · Remotion (Director video composition, reintroduced from legacy branch when needed).

**Soul file format:** Markdown + YAML frontmatter (Claude Code skill pattern). Each agent has `soul.md` with frontmatter (name, role, voice, model, skills) + prose body (personality, catchphrases, do/don't).

## Key env vars

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Crew/AI/channel vars added as agents come online.

## Path aliases

`@/*` maps to `./src/*` (tsconfig paths).
