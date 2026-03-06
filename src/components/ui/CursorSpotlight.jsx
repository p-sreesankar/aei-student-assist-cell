import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CursorSpotlight — Soft radial gradient that follows the mouse.
 *
 * - 400px diameter, very low opacity (barely visible, never distracting)
 * - Smooth spring-based lag behind the cursor
 * - Desktop only — hidden on touch / coarse-pointer devices
 * - Rendered once in PageLayout as a fixed full-page overlay
 *
 * @param {string} color — rgba color for the spotlight center
 *   Default: "rgba(14,165,233,0.07)" — sky blue for layered-blues theme
 */
export default function CursorSpotlight({
  color = 'rgba(14,165,233,0.07)',
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  // Only show on fine-pointer (mouse) devices
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setIsDesktop(mq.matches);

    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Raw cursor position
  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);

  // Spring-smoothed position (slight lag behind cursor)
  const springX = useSpring(cursorX, { stiffness: 80, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (!isDesktop) return;

    const move = (e) => {
      cursorX.set(e.clientX - 200); // center the 400px circle
      cursorY.set(e.clientY - 200);
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [isDesktop, cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9998] pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          x: springX,
          y: springY,
          willChange: 'transform',
        }}
      />
    </motion.div>
  );
}
