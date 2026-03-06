/**
 * Format a date string (YYYY-MM-DD) to human-readable format
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date (e.g., "March 5, 2026")
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * Check if a date is upcoming (today or future)
 * @param {string} dateStr - ISO date string (YYYY-MM-DD)
 * @returns {boolean}
 */
export function isUpcoming(dateStr) {
  if (!dateStr) return false;
  const eventDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
}

/**
 * Get relative time string (e.g., "2 days ago", "in 3 days")
 * @param {string} dateStr - ISO date string
 * @returns {string}
 */
export function getRelativeTime(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = date - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1) return `In ${diffDays} days`;
  if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
  return formatDate(dateStr);
}

// ── Content Freshness Helpers ────────────────────────────────────────────

/**
 * Check if a date is "new" (published within the last N days)
 * Useful for auto-tagging recent notices with a "New" badge.
 *
 * @param {string} dateStr - ISO date string (YYYY-MM-DD)
 * @param {number} [withinDays=7] - How many days count as "new"
 * @returns {boolean}
 */
export function isNew(dateStr, withinDays = 7) {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= withinDays;
}

/**
 * Check if an upcoming event is "soon" (within the next N days)
 * Useful for auto-tagging imminent events with a "Soon" badge.
 *
 * @param {string} dateStr - ISO date string (YYYY-MM-DD)
 * @param {number} [withinDays=3] - How many days count as "soon"
 * @returns {boolean}
 */
export function isSoon(dateStr, withinDays = 3) {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffMs = date - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= withinDays;
}
