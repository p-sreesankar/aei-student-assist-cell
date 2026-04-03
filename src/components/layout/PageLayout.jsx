import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const pathname = location?.pathname || '/';
  const isIsolatedWorkspace =
    pathname === '/mock-tests'
    || pathname.startsWith('/test-center/')
    || pathname === '/portal-2741'
    || pathname.startsWith('/admin/');

  // ── Scroll to Top on Route Change (instant — no competing animation) ──
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: isIsolatedWorkspace ? '#F7F7F5' : '#0A1628' }}>
      {!isIsolatedWorkspace && <CursorSpotlight color="rgba(14,165,233,0.07)" />}
      {!isIsolatedWorkspace && <ScrollProgress />}
      {!isIsolatedWorkspace && <Navbar />}

      {/* Main Content — fade + slide-up entrance */}
      <motion.main
        key={pathname}
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

      {!isIsolatedWorkspace && <Footer />}
    </div>
  );
}
