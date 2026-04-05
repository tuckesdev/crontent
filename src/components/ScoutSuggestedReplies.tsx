"use client";

/**
 * Parses Scout's message for a `suggested: opt1 | opt2 | opt3` line
 * and renders them as clickable pills.
 *
 * Scout's prompt instructs it to emit this line when asking multiple-choice
 * questions. User can click a suggestion or type freeform.
 */

// Matches `suggested:` anywhere. Captures until newline/backtick.
// Leading/trailing backticks + code-fence markers are swallowed into the match.
const SUGGESTED_RE = /`*\s*\bsuggested:\s*([^\n`]+)`*/i;

export function extractSuggestions(text: string): {
  cleanText: string;
  suggestions: string[];
} {
  const match = text.match(SUGGESTED_RE);
  if (!match) return { cleanText: text, suggestions: [] };

  const raw = match[1].trim();
  const suggestions = raw
    .split("|")
    .map((s) =>
      s
        .trim()
        .replace(/^[`"']+|[`"']+$/g, "") // strip surrounding quotes/backticks
        .replace(/[.!?`]+$/, ""), // strip trailing punctuation
    )
    .filter(Boolean);

  // Strip the matched suggested line + any orphan code fences + collapse whitespace
  const cleanText = text
    .replace(SUGGESTED_RE, "")
    .replace(/^[ \t]*`+[ \t]*$/gm, "") // remove stray backtick-only lines
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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
    <div className="mt-4 flex flex-col gap-1.5 max-w-md">
      <div className="font-mono text-[10px] uppercase tracking-wider text-white/30 mb-1">
        pick one, or type your own →
      </div>
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => onPick(s)}
          disabled={disabled}
          className="group text-left rounded-md border border-white/15 bg-white/[0.03] px-4 py-2.5 font-mono text-[13px] text-white/80 hover:border-cyan-400/60 hover:bg-cyan-400/[0.08] hover:text-cyan-300 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-between"
        >
          <span>{s}</span>
          <span className="text-white/20 group-hover:text-cyan-400/60 transition-colors text-[11px]">
            ⏎
          </span>
        </button>
      ))}
    </div>
  );
}
