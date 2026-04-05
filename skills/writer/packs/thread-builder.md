---
pack: thread-builder
agent: writer
purpose: Compose X threads with hook, beats, and CTA
---

# Thread Builder Pack

X threads live or die on structure. This pack composes 5-7 post threads from a topic + user voice.

## Structure (mandatory)

**Post 1 (Hook):** 80% of the work. Cold start, no buildup.
- Must stop scroll in 1-2 seconds
- Preview the value of reading on
- Contains no @mentions (keeps algorithm reach)

**Posts 2-6 (Body):** Each one standalone-readable.
- Every post must work on its own (people reply to any post in a thread)
- Vary sentence length (short / medium / short pattern)
- No fluff posts — every beat earns its place

**Final Post (CTA):** One clear ask.
- Follow for more / RT if useful / link to product / reply with question
- Keep it simple, don't stack 3 CTAs

## Length Rules

- 5-7 posts total (not 15, you're not writing a dissertation)
- Each post: 180-280 characters (leave headroom)
- Hook post: 180-240 characters (shorter = scroll-stop)

## Voice Rules

Match the user's:
- Average sentence length
- Typical punctuation (em-dash? ellipsis? full stops?)
- Use of emojis (usually max 1-2 per thread)
- Capitalization pattern (lowercase? sentence case? title case?)

## Forbidden Phrases

- "Here's why:"
- "Let me explain."
- "Buckle up."
- "Strap in."
- "This is going to change your life."
- Numbered threads that start with "🧵"

## Output Format

```yaml
thread:
  draft: 1
  posts:
    - post: 1
      type: hook
      text: "..."
      char_count: 198
    - post: 2
      type: body
      text: "..."
      char_count: 243
    # ... through 5-6
    - post: 7
      type: cta
      text: "..."
      char_count: 156
  voice_score: 8
  notes: "why this thread: ..."
```

## Iteration

ALWAYS produce 3 thread variants:
- Draft 1: first pass
- Draft 2: tighter (kill weakest body post)
- Draft 3: sharper hook

Pick the strongest. Hand to Pilot with one-sentence reasoning.
