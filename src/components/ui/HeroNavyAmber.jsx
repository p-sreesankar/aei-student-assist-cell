import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '@data/site-config';

/**
 * HeroNavyAmber — Deep navy background with warm amber accents.
 *
 * Palette:
 *   Base  #0B1120   Amber #F59E0B   White #F8FAFC   Blue accent #60A5FA
 */

// ── Rotating subtitle phrases ────────────────────────────────────────────
const ROTATING_PHRASES = [
  'Your notices, all in one place.',
  "Events you don't want to miss.",
  'Resources, whenever you need them.',
];

export default function HeroNavyAmber() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setPhraseIndex((p) => (p + 1) % ROTATING_PHRASES.length),
      2500,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0B1120' }}
    >
      {/* ── Grid overlay ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '50px 50px',
        }}
      />

      {/* ── Bottom fade ───────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 60%, #0B1120 100%)',
        }}
      />

      {/* ── Floating bubbles ──────────────────────────────────────── */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'rgba(245,158,11,0.05)' }}
      />
      <motion.div
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -bottom-16 -right-16 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'rgba(245,158,11,0.04)' }}
      />
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-24 right-[10%] w-[200px] h-[200px] rounded-full blur-2xl pointer-events-none"
        style={{ backgroundColor: 'rgba(96,165,250,0.03)' }}
      />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading font-black leading-tight tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ color: '#F8FAFC' }}
        >
          Your Department,{' '}
          <span style={{ color: '#F59E0B' }}>Here&nbsp;to&nbsp;Help</span> 👋
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto"
          style={{ color: '#CBD5E1' }}
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
              style={{ color: 'rgba(248,250,252,0.55)' }}
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
          <Link to="/notices">
            <button
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-heading font-bold text-base transition-all duration-200 cursor-pointer hover:scale-[1.02]"
              style={{
                backgroundColor: '#F59E0B',
                color: '#0B1120',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#D97706';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(245,158,11,0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F59E0B';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              View Notices
            </button>
          </Link>

          <Link to="/grievance">
            <button
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-heading font-bold text-base bg-transparent transition-colors duration-200 cursor-pointer"
              style={{
                border: '2px solid #243550',
                color: '#F8FAFC',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#F59E0B';
                e.currentTarget.style.color = '#F59E0B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#243550';
                e.currentTarget.style.color = '#F8FAFC';
              }}
            >
              Submit Grievance
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
