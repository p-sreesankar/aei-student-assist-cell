// ============================================================================
//  CONFIG VALIDATION — Development-only warnings
// ============================================================================
//
//  This module checks site-config.js for common mistakes and missing fields.
//  Warnings only appear in the browser console during local development
//  (npm run dev). They are completely stripped from production builds.
//
//  You do NOT need to edit this file. It runs automatically.
//
// ============================================================================

import { SITE_CONFIG, SECTIONS } from '@data/site-config';

/**
 * Run all config validations. Call once at app startup (dev only).
 */
export function validateConfig() {
  if (import.meta.env.PROD) return; // safety guard — never run in production

  const warnings = [];

  // ── Required string fields ──────────────────────────────────────────────
  const requiredStrings = [
    ['siteName', SITE_CONFIG.siteName],
    ['departmentName', SITE_CONFIG.departmentName],
    ['departmentShort', SITE_CONFIG.departmentShort],
    ['collegeName', SITE_CONFIG.collegeName],
    ['collegeShort', SITE_CONFIG.collegeShort],
    ['tagline', SITE_CONFIG.tagline],
    ['footerText', SITE_CONFIG.footerText],
    ['metaDescription', SITE_CONFIG.metaDescription],
    ['contact.email', SITE_CONFIG.contact?.email],
  ];

  for (const [name, value] of requiredStrings) {
    if (!value || value.trim() === '') {
      warnings.push(`Missing required field: SITE_CONFIG.${name}`);
    }
  }

  // ── Grievance form URL ──────────────────────────────────────────────────
  const formUrl = SITE_CONFIG.grievanceFormUrl || '';
  if (!formUrl || formUrl.includes('EXAMPLE_REPLACE_THIS')) {
    warnings.push(
      'SITE_CONFIG.grievanceFormUrl still has the placeholder URL. ' +
      'Replace it with your real Google Form embed URL.'
    );
  }

  // ── Social links — at least one should be set ───────────────────────────
  const socials = SITE_CONFIG.socialLinks || {};
  const hasAnySocial = Object.values(socials).some((v) => v && v.trim() !== '');
  if (!hasAnySocial) {
    warnings.push(
      'All SITE_CONFIG.socialLinks are empty. Add at least one social link.'
    );
  }

  // ── Theme colors — check for valid hex ──────────────────────────────────
  const colors = SITE_CONFIG.themeColors || {};
  const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  for (const [key, value] of Object.entries(colors)) {
    if (value && !hexRegex.test(value)) {
      warnings.push(
        `SITE_CONFIG.themeColors.${key} = "${value}" is not a valid hex color. Use #RGB or #RRGGBB.`
      );
    }
  }

  // ── SECTIONS toggle — warn about disabled sections ──────────────────────
  const disabled = Object.entries(SECTIONS)
    .filter(([, enabled]) => enabled === false)
    .map(([key]) => key);

  if (disabled.length > 0) {
    warnings.push(
      `Disabled sections: ${disabled.join(', ')}. ` +
      'These pages, nav links, and Home quick links are hidden.'
    );
  }

  // ── Print warnings ─────────────────────────────────────────────────────
  if (warnings.length > 0) {
    console.group(
      '%c Site Config Warnings',
      'color: #F59E0B; font-weight: bold; font-size: 13px;'
    );
    warnings.forEach((msg) => console.warn(`  → ${msg}`));
    console.groupEnd();
  } else {
    console.log(
      '%c Site config looks good!',
      'color: #10B981; font-weight: bold;'
    );
  }
}
