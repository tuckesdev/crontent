"use client";

/**
 * Parses Scout's message for a `suggested: opt1 | opt2 | opt3` line
 * and renders them as clickable pills.
 *
 * Scout's prompt instructs it to emit this line when asking multiple-choice
 * questions. User can click a suggestion or type freeform.
 */

const SUGGESTED_RE = /(?:^|\n)\s*suggested:\s*(.+?)(?:\n|$)/i;

export function extractSuggestions(text: string): {
  cleanText: string;
  suggestions: string[];
} {
  const match = text.match(SUGGESTED_RE);
  if (!match) return { cleanText: text, suggestions: [] };

  const raw = match[1].trim();
  const suggestions = raw
    .split("|")
    .map((s) => s.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);

  const cleanText = text.replace(SUGGESTED_RE, "").trim();
  return { cleanText, suggestions };
}

export function SuggestedReplies({
  suggestions,
  onPick,
  disabled,
}: {
  suggestions: string[];
  onPick: (value: string) => void;
  disabled?: boolean;
}) {
  if (suggestions.length === 0) return null;

  return (
    <div className="mt-2.5 flex flex-wrap gap-2">
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => onPick(s)}
          disabled={disabled}
          className="rounded-md border border-cyan-400/30 bg-cyan-400/5 px-2.5 py-1 font-mono text-[11px] text-cyan-400 hover:bg-cyan-400/15 hover:border-cyan-400/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
