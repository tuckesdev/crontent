/**
 * Crew roster — source of truth for all 6 agents.
 * Used by terminal, crew cards, and (eventually) agent runtime.
 */

import type { LucideIcon } from "lucide-react";
import {
  ShipWheel,
  Telescope,
  PenLine,
  Clapperboard,
  Send,
  LineChart,
} from "lucide-react";

export interface Agent {
  id: "pilot" | "scout" | "writer" | "director" | "publisher" | "analyst";
  name: string;
  icon: LucideIcon;
  /** Tailwind text color class — used for name + icon in UI. */
  color: string;
  /** Hex for cases where class doesn't work (SSR, inline styles). */
  hex: string;
  role: string;
  voice: string;
}

export const CREW: Agent[] = [
  {
    id: "pilot",
    name: "Pilot",
    icon: ShipWheel,
    color: "text-white",
    hex: "#ffffff",
    role: "crew lead · user chat",
    voice: "3 posts queued for your review. Approve when you get a sec.",
  },
  {
    id: "scout",
    name: "Scout",
    icon: Telescope,
    color: "text-cyan-400",
    hex: "#22d3ee",
    role: "research · trends · onboarding",
    voice: "Found 47 trending hooks this week. Top 3 match your voice.",
  },
  {
    id: "writer",
    name: "Writer",
    icon: PenLine,
    color: "text-amber-400",
    hex: "#fbbf24",
    role: "hooks · threads · scripts · DMs",
    voice: "Three drafts ready. Going with the second one — cleaner angle.",
  },
  {
    id: "director",
    name: "Director",
    icon: Clapperboard,
    color: "text-violet-400",
    hex: "#a78bfa",
    role: "video · UGC hooks · composition",
    voice: "Composing a 30-second clip with your demo footage.",
  },
  {
    id: "publisher",
    name: "Publisher",
    icon: Send,
    color: "text-emerald-400",
    hex: "#34d399",
    role: "posting · scheduling · replies",
    voice: "Scheduled for 7:42 PM. That's peak for your audience.",
  },
  {
    id: "analyst",
    name: "Analyst",
    icon: LineChart,
    color: "text-rose-400",
    hex: "#fb7185",
    role: "metrics · learning loop",
    voice: "Last post hit 5.3% CTR. Above benchmark — keep this angle.",
  },
];

/**
 * Scripted crew conversation for the landing page terminal.
 * Loops every ~22 seconds.
 */
export const TERMINAL_SCRIPT: Array<{ agent: Agent["id"]; text: string }> = [
  { agent: "pilot", text: "New product connected. Briefing the crew." },
  { agent: "scout", text: "Scanning your niche for what's working this week." },
  { agent: "scout", text: "47 trending hooks pulled. 3 match your voice." },
  { agent: "writer", text: "Draft 1 is live. Leading with the cleanest angle." },
  { agent: "director", text: "Composing a 30-second clip with your demo footage." },
  { agent: "publisher", text: "Scheduled for 7:42 PM — peak for your audience." },
  { agent: "analyst", text: "Benchmark CTR for your niche: 4.2%. We'll beat it." },
  { agent: "pilot", text: "Crew's running. I'll update you when there's news." },
];
