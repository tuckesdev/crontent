"use client";

import { useEffect, useState, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { CREW, TERMINAL_SCRIPT } from "@/lib/crew";

interface TerminalLine {
  Icon: LucideIcon;
  name: string;
  color: string;
  text: string;
  key: number;
}

const LINE_DELAY_MS = 1800;
const LOOP_RESTART_DELAY_MS = 3500;

export function CrewTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const keyCounter = useRef(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const agentsById = Object.fromEntries(CREW.map((a) => [a.id, a]));

    const playScript = () => {
      // Clear previous lines
      setLines([]);

      // Schedule each line
      TERMINAL_SCRIPT.forEach((step, i) => {
        const t = setTimeout(() => {
          const agent = agentsById[step.agent];
          if (!agent) return;
          keyCounter.current += 1;
          setLines((prev) => [
            ...prev,
            {
              Icon: agent.icon,
              name: agent.name.toLowerCase(),
              color: agent.color,
              text: step.text,
              key: keyCounter.current,
            },
          ]);
        }, i * LINE_DELAY_MS + 400);
        timeoutsRef.current.push(t);
      });

      // Schedule the loop restart
      const restartAt =
        TERMINAL_SCRIPT.length * LINE_DELAY_MS + LOOP_RESTART_DELAY_MS;
      const restart = setTimeout(playScript, restartAt);
      timeoutsRef.current.push(restart);
    };

    playScript();

    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-white/10 bg-black/60 shadow-2xl backdrop-blur-sm">
      {/* Header bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="ml-2 font-mono text-[11px] text-white/40">
          crontent.crew.terminal
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-white/30">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse-glow" />
          24/7 · on cron
        </span>
      </div>

      {/* Terminal body */}
      <div className="relative min-h-[320px] sm:min-h-[380px] p-5 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-relaxed">
        {/* Scan line overlay */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-line"
          style={{ animationDuration: "4s" }}
        />

        <div className="space-y-1.5">
          {lines.map((line) => (
            <div
              key={line.key}
              className="animate-agent-msg-in flex items-start gap-2 sm:gap-3"
            >
              <span className="shrink-0 text-white/30 select-none inline-flex items-center gap-1.5">
                <line.Icon
                  className={line.color}
                  size={13}
                  strokeWidth={2.25}
                  aria-hidden
                />
                <span className={line.color}>{line.name}</span>
                <span className="text-white/30">&gt;</span>
              </span>
              <span className="text-white/90">{line.text}</span>
            </div>
          ))}
          {/* Cursor */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-white/30 select-none">&gt;</span>
            <span
              className="inline-block h-[14px] w-[7px] bg-white/50 animate-terminal-cursor"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
