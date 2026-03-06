import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import CursorSpotlight from '../ui/CursorSpotlight';

/**
 * PageLayout Component — Main layout wrapper for all pages
 *
 * Features:
 * - Wraps every page with Navbar and Footer
 * - Scroll Progress bar at top
 * - Cursor Spotlight (desktop only)
 * - Instant scroll-to-top on route change (no smooth-scroll lag)
 * - Smooth entrance animation (fade + slide-up, 0.35s)
 */
export default function PageLayout({ children }) {
  const location = useLocation();

  // ── Scroll to Top on Route Change (instant — no competing animation) ──
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#0A1628' }}>
      {/* Cursor Spotlight — desktop only */}
      <CursorSpotlight color="rgba(14,165,233,0.07)" />

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content — fade + slide-up entrance */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
        }}
        className="flex-1"
      >
        {children}
      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
