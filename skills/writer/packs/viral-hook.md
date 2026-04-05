---
pack: viral-hook
agent: writer
purpose: Generate scroll-stopping hooks from trend patterns
---

# Viral Hook Pack

Given a trend pattern from Scout + the user's voice profile, generate 5 hook variations that fit the user's voice AND adapt the trend format.

## Hook Formulas (use as scaffolds, not rules)

### 1. Question-Stop
- Opens with a question the audience can't ignore
- Examples: "am I the only one who...", "why does no one tell you...", "what if X actually..."
- Best for: discovery-mode scrollers, curious niches

### 2. Counterintuitive Claim
- States the opposite of what people expect
- Examples: "your X is ruining Y", "stop doing X", "I was wrong about..."
- Best for: expert voice, thought-leadership audiences

### 3. Reveal Setup
- Teases a reveal without showing it
- Examples: "found this at X and it changed...", "my [app/tool] just did this..."
- Best for: product demos, transformations

### 4. Contrarian Observation
- Takes a common-sense take and reframes it
- Examples: "everyone says X but actually...", "the real reason X doesn't work..."
- Best for: opinionated voices, debate-prone niches

### 5. Number-Anchored
- Opens with a specific number
- Examples: "7 things that...", "3 reasons why...", "in 24 hours I..."
- Best for: listicle-appropriate topics, concrete claims

## Voice-Match Rules

Score each hook 0-10 on voice fit:
- 0-5: drop immediately
- 6-7: revise
- 8+: ship-ready

Check for:
- ✅ Sentence length matches user's average
- ✅ Punctuation matches user's style
- ✅ Vocabulary overlaps with user samples
- ❌ No generic AI phrases ("unlock", "elevate", "supercharge", "game-changing")

## Output Format

```yaml
hooks:
  - formula: question-stop
    text: "why does no one tell you your first 100 users come from x?"
    voice_score: 9
    notes: "matches lowercase + direct voice"
  - formula: reveal-setup
    text: "found a trick in thriftd that saved me 47 minutes"
    voice_score: 7
    notes: "ok but feels try-hard on 'trick'"
  # ... 3 more
```

## Hand-off

Ship top-3 hooks to Pilot (for user review) OR directly to Director (if going into video).
