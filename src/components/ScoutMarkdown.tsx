"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Markdown renderer styled for Scout's terminal chat.
 * Keeps monospace vibe, renders bold/lists/code/links cleanly.
 */
export function ScoutMarkdown({ content }: { content: string }) {
  return (
    <div className="prose-scout">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Inline elements
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          strong: ({ children }) => (
            <strong className="text-white font-semibold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-white/80 italic">{children}</em>
          ),
          code: ({ children }) => (
            <code className="px-1 py-0.5 rounded bg-white/10 text-cyan-300 text-[11px]">
              {children}
            </code>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline hover:text-cyan-300"
            >
              {children}
            </a>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="my-2 space-y-1 list-none pl-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2 space-y-1 list-none pl-0 counter-reset-[scout-ol]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="flex gap-2 before:content-['·'] before:text-cyan-400 before:shrink-0">
              <span className="flex-1">{children}</span>
            </li>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
