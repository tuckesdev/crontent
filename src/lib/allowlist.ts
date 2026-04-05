/**
 * Email allowlist for private beta access.
 *
 * Set CRONTENT_ALLOWLIST env var to a comma-separated list of emails.
 * Users not in the list can still sign in (Google OAuth) but won't reach
 * /dashboard, /onboarding, or crew APIs — they get bounced to landing.
 *
 * Example:
 *   CRONTENT_ALLOWLIST=tuckesdev@gmail.com,friend@example.com
 *
 * To open up to everyone, remove the env var (returns true for all).
 */
export function isAllowed(email: string | null | undefined): boolean {
  if (!email) return false;

  const raw = process.env.CRONTENT_ALLOWLIST;

  // No env var set → open access (e.g. post-launch)
  if (!raw || !raw.trim()) return true;

  const allowed = raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return allowed.includes(email.toLowerCase());
}
