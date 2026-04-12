import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '@data/site-config';

/**
 * HeroLightBlue — Layered blues dark hero.
 *
 * Palette:
 *   Layer 1  #0A1628   Layer 2  #0F2744   Layer 3  #0EA5E9
 *   Amber appears ONLY in one CTA button — nowhere else meaningful.
 */

// ── Rotating subtitle phrases ────────────────────────────────────────────
const ROTATING_PHRASES = [
  'Your notices, all in one place.',
  "Events you don't want to miss.",
  'Resources, whenever you need them.',
];

const LOGO_SRC = '/images/logo/logo.png';

export default function HeroLightBlue() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const id = setInterval(
      () => setPhraseIndex((p) => (p + 1) % ROTATING_PHRASES.length),
      2500,
    );
    return () => clearInterval(id);
  }, []);

  // Hide scroll indicator after 100px scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A1628 0%, #0F2744 40%, #0A1628 100%)',
      }}
    >
      {/* ── Grid overlay ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(14,165,233,0.05) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(14,165,233,0.05) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Bottom fade ───────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 60%, #0A1628 100%)',
        }}
      />

      {/* ── Floating bubbles (layered blues) ──────────────────────── */}
      {/* Layer 1: Sky blue — top right */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none will-change-transform"
        style={{ backgroundColor: 'rgba(14,165,233,0.08)' }}
      />
      {/* Layer 2: Mid blue — bottom left */}
      <motion.div
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none will-change-transform"
        style={{ backgroundColor: 'rgba(15,39,68,0.60)' }}
      />
      {/* Layer 3: Bright blue — top left */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-20 -left-10 w-[300px] h-[300px] rounded-full blur-2xl pointer-events-none will-change-transform"
        style={{ backgroundColor: 'rgba(56,189,248,0.06)' }}
      />
      {/* Amber — small warmth accent, center right */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-1/2 right-[15%] w-[150px] h-[150px] rounded-full blur-2xl pointer-events-none will-change-transform"
        style={{ backgroundColor: 'rgba(245,158,11,0.04)' }}
      />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-8 md:mb-10 w-40 sm:w-48 md:w-56"
        >
          <img
            src={LOGO_SRC}
            alt={`${SITE_CONFIG.departmentShort} logo`}
            className="w-full h-auto object-contain"
            style={{ filter: 'drop-shadow(0 0 18px rgba(14,165,233,0.2))' }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading leading-tight tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="font-black" style={{ color: '#F0F9FF' }}>
            Your Department.
          </span>
          <br />
          <span className="font-black italic" style={{ color: '#0EA5E9' }}>
            Always Here.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto"
          style={{ color: '#7DD3FC' }}
        >
          {SITE_CONFIG.departmentName} — {SITE_CONFIG.collegeName}
        </motion.p>

        {/* Rotating subtitle */}
        <div className="h-8 sm:h-9 relative overflow-hidden mt-2 mb-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={phraseIndex}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-sm sm:text-base absolute inset-x-0"
              style={{ color: 'rgba(125,211,252,0.6)' }}
            >
              {ROTATING_PHRASES[phraseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          {/* Primary CTA — amber (the ONE amber element) */}
          <Link to="/notices">
            <button
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-heading font-bold text-base transition-all duration-200 cursor-pointer hover:scale-[1.02]"
              style={{
                backgroundColor: '#F59E0B',
                color: '#0A1628',
                boxShadow: '0 0 30px rgba(245,158,11,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#D97706';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F59E0B';
              }}
            >
              View Notices
            </button>
          </Link>

          {/* Secondary CTA — blue border */}
          <Link to="/grievance">
            <button
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-heading font-bold text-base transition-all duration-200 cursor-pointer"
              style={{
                border: '2px solid #1E4976',
                color: '#F0F9FF',
                backgroundColor: 'rgba(14,165,233,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0EA5E9';
                e.currentTarget.style.backgroundColor = 'rgba(14,165,233,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1E4976';
                e.currentTarget.style.backgroundColor = 'rgba(14,165,233,0.08)';
              }}
            >
              Submit Grievance
            </button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <AnimatePresence>
          {showScroll && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-sm font-mono"
                style={{ color: '#0EA5E9' }}
              >
                Scroll ↓
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
