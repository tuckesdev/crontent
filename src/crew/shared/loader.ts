/**
 * Agent workspace loader.
 *
 * Reads SOUL.md + IDENTITY.md + AGENTS.md + TOOLS.md from /skills/<agent>/
 * at runtime, parses YAML frontmatter, and caches in memory.
 *
 * Runs on Node runtime (not Edge) — uses fs.
 */

import { readFile } from "fs/promises";
import { join } from "path";
import type { AgentWorkspace, AgentId } from "./types";

const SKILLS_ROOT = join(process.cwd(), "skills");

// In-memory cache — files don't change at runtime
const cache = new Map<AgentId, AgentWorkspace>();

/**
 * Load an agent's workspace by id. Cached after first load.
 */
export async function loadAgent(id: AgentId): Promise<AgentWorkspace> {
  const cached = cache.get(id);
  if (cached) return cached;

  const agentDir = join(SKILLS_ROOT, id);

  const [soulRaw, identityRaw, rulesRaw, toolsRaw] = await Promise.all([
    readFile(join(agentDir, "SOUL.md"), "utf-8"),
    readFile(join(agentDir, "IDENTITY.md"), "utf-8"),
    readFile(join(agentDir, "AGENTS.md"), "utf-8"),
    readFile(join(agentDir, "TOOLS.md"), "utf-8"),
  ]);

  const identity = parseFrontmatter(identityRaw).frontmatter;

  const workspace: AgentWorkspace = {
    id,
    identity: {
      name: identity.name ?? id,
      role: identity.role ?? "",
      icon: identity.icon ?? "",
      color: identity.color ?? "",
      hex: identity.hex ?? "",
      glyph: identity.glyph ?? "",
      model: identity.model ?? "claude-sonnet-4-6",
      ...identity,
    },
    soul: stripFrontmatter(soulRaw),
    rules: stripFrontmatter(rulesRaw),
    toolDocs: stripFrontmatter(toolsRaw),
  };

  cache.set(id, workspace);
  return workspace;
}

/**
 * Build the system prompt for an agent by combining its SOUL + AGENTS + IDENTITY.
 */
export function buildSystemPrompt(workspace: AgentWorkspace): string {
  return [
    `You are ${workspace.identity.name}, a member of the Crontent Crew.`,
    ``,
    `## Your Identity`,
    `Role: ${workspace.identity.role}`,
    `Voice signature examples are in SOUL.md below.`,
    ``,
    `## Your SOUL (personality, voice, opinions)`,
    ``,
    workspace.soul,
    ``,
    `## Operating Rules`,
    ``,
    workspace.rules,
    ``,
    `## Response Style`,
    `- Keep responses concise. Short beats long. Sharp beats vague.`,
    `- Never open with "Great question!" / "I'd be happy to help!" / "Absolutely!"`,
    `- Have opinions. No hedging.`,
    `- You're AI. Don't pretend to be human. Act like the crew member you are.`,
  ].join("\n");
}

/**
 * Minimal YAML frontmatter parser — handles our flat key:value format.
 */
function parseFrontmatter(content: string): {
  frontmatter: Record<string, string>;
  body: string;
} {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const fm: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const rawValue = line.slice(colonIdx + 1).trim();
    // Strip surrounding quotes
    const value = rawValue.replace(/^["']|["']$/g, "");
    if (key) fm[key] = value;
  }

  return { frontmatter: fm, body: match[2] };
}

function stripFrontmatter(content: string): string {
  return parseFrontmatter(content).body;
}
