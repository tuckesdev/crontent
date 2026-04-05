/**
 * Shared types for the crew runtime.
 */

import type { AgentId } from "@/lib/supabase/database.types";

/** A parsed agent workspace: soul + identity + ops rules + tools docs. */
export interface AgentWorkspace {
  id: AgentId;
  identity: {
    name: string;
    role: string;
    icon: string; // Lucide icon name
    color: string; // Tailwind class
    hex: string;
    glyph: string;
    model: string;
    [key: string]: string;
  };
  /** The full SOUL.md body (voice/personality) to inject as high-priority instructions. */
  soul: string;
  /** The full AGENTS.md body (operating rules, delegation logic). */
  rules: string;
  /** The full TOOLS.md body (tool inventory + handoff protocol). */
  toolDocs: string;
}

export type { AgentId };
