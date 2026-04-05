---
pack: reply-farmer
agent: writer
purpose: Generate reply templates for Publisher's engagement loop
---

# Reply Farmer Pack

Writer produces reply templates. Publisher uses them to engage with comments on the user's posts.

## Template Categories

### 1. Affirmation
Acknowledge what the commenter said + add value.
- "same. what worked for me was ___"
- "exactly this. also ___"
- "100%. the thing no one mentions is ___"

### 2. Follow-up Question
Continue the conversation.
- "curious — what made you try that?"
- "how long did it take to see results?"
- "do you think that still holds in 2026?"

### 3. Joke / Wit
Match energy, add levity.
- Light self-deprecation about product
- Niche-specific jokes (if voice supports it)
- Meme references (use sparingly)

### 4. CTA / Redirect
When the comment is a hot lead.
- "dm'd you something that'll help"
- "full thread on this: [link]"
- "check out [specific resource]"

### 5. Contrarian (sparingly)
When you genuinely disagree.
- "interesting take. i actually think ___"
- "hear you, but ___"
- NEVER: argumentative, name-calling, dismissive

## Voice-Match Rules

Each template:
- Matches user's casual register (replies are chattier than posts)
- Uses user's typical punctuation
- Same emoji pattern as user's posts
- 1-2 sentences max (replies are short)

## Forbidden Patterns

- NEVER use "Great question!" or "I'd be happy to help!"
- NEVER use ALL CAPS
- NEVER respond to hostility with hostility
- NEVER fake endorsement ("yes this was my experience too!" when user has no such experience)

## Output Format

Per thread/post, generate 5-10 templates categorized:

```yaml
replies:
  affirmations:
    - "same. what helped me was saving the items i liked first"
    - "..."
  follow_ups:
    - "curious what your first purchase was?"
    - "..."
  jokes:
    - "my wallet just filed a restraining order"
  ctas:
    - "dm'd you a link that should help"
  contrarian:
    - "..."
```

## Safety

- Always tag templates with tone (warm / witty / direct / curious)
- Flag templates that could be misread as customer-service claims
- Never template responses that make health/medical/financial promises
- Publisher filters templates before use — if in doubt, Writer errs on the mild side

## Refresh Cadence

Regenerate templates weekly. Reply templates decay fast.
