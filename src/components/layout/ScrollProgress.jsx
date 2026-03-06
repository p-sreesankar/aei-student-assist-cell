import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * ScrollProgress — Thin progress bar at the very top of the viewport.
 * Fills left→right as the user scrolls down the page.
 * 3px height, sky blue gradient.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  // Smooth spring for buttery animation
  const scaleX = useSpring(0, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setProgress(pct);
      scaleX.set(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scaleX]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[9999]"
      style={{
        scaleX,
        background: 'linear-gradient(to right, #0EA5E9, #38BDF8)',
      }}
      aria-hidden="true"
    />
  );
}
