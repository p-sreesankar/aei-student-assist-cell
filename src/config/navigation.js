// ══════════════════════════════════════════════════════════════════════════
//  NAVIGATION CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════
//
//  Navigation links are automatically filtered by the SECTIONS toggle
//  in src/data/site-config.js. If a section is disabled there, the nav
//  link disappears from the Navbar and Footer automatically.
//
//  To hide a link without touching site-config, comment it out below.
//
// ══════════════════════════════════════════════════════════════════════════

import { SECTIONS } from '@data/site-config';

// ── Section key lookup  (path → SECTIONS key) ─────────────────────────────
// Home and About are always visible — they have no SECTIONS key.
const PATH_TO_SECTION = {
  '/notices':   'notices',
  '/events':    'events',
  '/resources': 'resources',
  '/grievance': 'grievance',
  '/contact':   'contact',
};

const ALL_NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Notices', path: '/notices' },
  { label: 'Events', path: '/events' },
  { label: 'Resources', path: '/resources' },
  { label: 'Grievance', path: '/grievance' },
  { label: 'Contact', path: '/contact' },
];

/** Filtered nav links — respects SECTIONS toggle */
export const NAV_LINKS = ALL_NAV_LINKS.filter((link) => {
  const sectionKey = PATH_TO_SECTION[link.path];
  return !sectionKey || SECTIONS[sectionKey] !== false;
});

// ── Social Media Links ─────────────────────────────────────────────────────
// Used in Footer component. To hide, leave the value as an empty string.

export const SOCIAL_LINKS = {
  email: 'mailto:studentassistcell.aei@cet.ac.in',
  instagram: 'https://www.instagram.com/aei_cet/',
  linkedin: 'https://www.linkedin.com/company/aei-cet/',
  // youtube: '',  // Commented out = hidden
  // twitter: '',  // Commented out = hidden
};

// ── Brand Information ──────────────────────────────────────────────────────

export const BRAND = {
  siteName: 'Student Assist Cell',
  departmentShort: 'AEI',
  departmentFull: 'Applied Electronics and Instrumentation',
  collegeShort: 'CET',
  collegeFull: 'College of Engineering Trivandrum',
  tagline: 'Your one-stop hub for notices, events, resources & support',
};

// ── Footer Credit ──────────────────────────────────────────────────────────

export const FOOTER_CREDIT = 'Made with ❤️ by AEI Association 2025-26';
