"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Telescope, Send, CircleCheck } from "lucide-react";
import { ScoutMarkdown } from "@/components/ScoutMarkdown";
import {
  extractSuggestions,
  SuggestedReplies,
} from "@/components/ScoutSuggestedReplies";

export function OnboardingFlow() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"intake" | "chat">("intake");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/crew/scout" }),
    onError: (err) => {
      console.error("[OnboardingFlow] chat error:", err);
    },
    onFinish: ({ message }) => {
      // Detect saveBrandProfile success → redirect
      for (const part of message.parts) {
        if (
          part.type === "tool-saveBrandProfile" &&
          part.state === "output-available" &&
          part.output &&
          typeof part.output === "object" &&
          "success" in part.output &&
          part.output.success === true &&
          "brandId" in part.output
        ) {
          router.push(`/dashboard/${String(part.output.brandId)}`);
          router.refresh();
        }
      }
    },
  });

  // Auto-scroll terminal on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function handleIntakeSubmit(mode: "url" | "ideation") {
    const firstMessage =
      mode === "url"
        ? `I'm building something at ${input.trim()}. Can you take a look and help me onboard?`
        : `I'm in the ideation phase — no product URL yet. I want to describe what I'm building: ${input.trim()}`;

    setPhase("chat");
    sendMessage({ text: firstMessage });
    setInput("");
  }

  function handleChatSubmit() {
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  const isThinking = status === "submitted" || status === "streaming";

  // ─── Intake phase ────────────────────────────────────
  if (phase === "intake") {
    return (
      <div className="mx-auto max-w-2xl px-6 pt-20 sm:pt-32 w-full">
        <h1 className="font-sans text-4xl sm:text-5xl text-white mb-4 leading-tight">
          what are you building?
        </h1>
        <p className="font-mono text-[13px] text-white/50 mb-10 leading-relaxed">
          paste your product URL and Scout will scan it.
          <br />
          or describe what you&apos;re making if you&apos;re still in ideation.
        </p>

        <div className="space-y-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                handleIntakeSubmit(
                  input.startsWith("http") ? "url" : "ideation",
                );
              }
            }}
            placeholder="https://yourapp.com  OR  i'm building an app that..."
            autoFocus
            className="w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-[14px] text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-colors"
          />

          <div className="flex gap-2">
            <button
              onClick={() => handleIntakeSubmit("url")}
              disabled={!input.trim() || !input.startsWith("http")}
              className="flex-1 rounded-md bg-white px-4 py-2.5 font-mono text-[13px] text-black hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              scan my URL
            </button>
            <button
              onClick={() => handleIntakeSubmit("ideation")}
              disabled={!input.trim()}
              className="flex-1 rounded-md border border-white/20 px-4 py-2.5 font-mono text-[13px] text-white/80 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              i&apos;m still planning it
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Chat phase ──────────────────────────────────────
  return (
    <div className="mx-auto max-w-2xl px-6 py-8 w-full flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 font-mono text-[12px] text-white/40">
        <Telescope size={14} strokeWidth={2} className="text-cyan-400" />
        <span className="text-cyan-400">scout</span>
        <span className="text-white/30">/ onboarding</span>
      </div>

      {/* Terminal-style chat feed */}
      <div
        ref={scrollRef}
        className="flex-1 rounded-lg border border-white/10 bg-black/60 p-5 font-mono text-[13px] leading-relaxed overflow-y-auto max-h-[55vh] space-y-3"
      >
        {messages.map((message, msgIdx) => {
          const isLastMessage = msgIdx === messages.length - 1;
          return (
          <div key={message.id} className="animate-agent-msg-in">
            {message.parts.map((part, i) => {
              if (part.type === "text") {
                if (message.role === "user") {
                  return (
                    <div key={i} className="flex gap-2">
                      <span className="text-white/30 shrink-0 select-none">
                        you &gt;
                      </span>
                      <span className="text-white/90">{part.text}</span>
                    </div>
                  );
                }
                // Scout's text — render markdown + extract suggestions
                const { cleanText, suggestions } = extractSuggestions(part.text);
                return (
                  <div key={i} className="flex gap-2">
                    <span className="text-cyan-400 shrink-0 select-none">
                      scout &gt;
                    </span>
                    <div className="text-white/90 flex-1 min-w-0">
                      <ScoutMarkdown content={cleanText} />
                      {isLastMessage && suggestions.length > 0 && (
                        <SuggestedReplies
                          suggestions={suggestions}
                          disabled={isThinking}
                          onPick={(v) => sendMessage({ text: v })}
                        />
                      )}
                    </div>
                  </div>
                );
              }

              // Tool: scrapeUrl
              if (part.type === "tool-scrapeUrl") {
                if (part.state === "input-available" || part.state === "input-streaming") {
                  return (
                    <div key={i} className="flex gap-2 text-white/40 italic">
                      <span className="text-cyan-400 shrink-0 select-none">
                        scout &gt;
                      </span>
                      <span>scanning URL…</span>
                    </div>
                  );
                }
                if (part.state === "output-available") {
                  return (
                    <div key={i} className="flex gap-2 text-white/40 italic">
                      <span className="text-cyan-400 shrink-0 select-none">
                        scout &gt;
                      </span>
                      <span>URL scanned.</span>
                    </div>
                  );
                }
              }

              // Tool: saveBrandProfile
              if (part.type === "tool-saveBrandProfile") {
                if (part.state === "input-available" || part.state === "input-streaming") {
                  return (
                    <div key={i} className="flex gap-2 text-white/40 italic">
                      <span className="text-cyan-400 shrink-0 select-none">
                        scout &gt;
                      </span>
                      <span>saving brand profile…</span>
                    </div>
                  );
                }
                if (part.state === "output-available") {
                  return (
                    <div
                      key={i}
                      className="flex gap-2 items-center text-emerald-400"
                    >
                      <CircleCheck size={14} strokeWidth={2.5} />
                      <span>brand saved. opening dashboard…</span>
                    </div>
                  );
                }
              }

              return null;
            })}
          </div>
          );
        })}
        {isThinking && (
          <div className="flex gap-2 text-white/40 italic">
            <span className="text-cyan-400 shrink-0 select-none">scout &gt;</span>
            <span className="inline-flex gap-1">
              <span className="animate-pulse">thinking</span>
              <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>.</span>
              <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>.</span>
              <span className="animate-pulse" style={{ animationDelay: "0.6s" }}>.</span>
            </span>
          </div>
        )}
        {error && (
          <div className="flex gap-2 text-red-400">
            <span className="shrink-0 select-none">error &gt;</span>
            <span className="whitespace-pre-wrap break-words">
              {error.message || "something broke. check server logs."}
            </span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim() && !isThinking) {
              handleChatSubmit();
            }
          }}
          placeholder={isThinking ? "scout is thinking…" : "reply…"}
          disabled={isThinking}
          autoFocus
          className="flex-1 rounded-md border border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-[13px] text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none disabled:opacity-50 transition-colors"
        />
        <button
          onClick={handleChatSubmit}
          disabled={!input.trim() || isThinking}
          className="rounded-md bg-white px-4 py-2.5 hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="send"
        >
          <Send size={16} strokeWidth={2.5} className="text-black" />
        </button>
      </div>
    </div>
  );
}
