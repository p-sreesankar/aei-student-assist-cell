import { motion } from 'framer-motion';

/**
 * SectionWrapper Component — Consistent spacing and background for page sections
 * 
 * Features:
 * - Max-width container with responsive padding
 * - Optional background color variants
 * - Optional ID for anchor links (#section-name)
 * - Vertical padding (responsive)
 * - Optional scroll-triggered entrance animation (animate prop)
 * 
 * @example
 * // Default section (warm off-white background)
 * <SectionWrapper>
 *   <SectionHeader title="Latest Notices" />
 *   {notices content}
 * </SectionWrapper>
 * 
 * @example
 * // With scroll-triggered fade-in animation
 * <SectionWrapper animate>
 *   <SectionHeader title="Animated Section" />
 *   {content}
 * </SectionWrapper>
 * 
 * @example
 * // Alternate background (pure white)
 * <SectionWrapper background="white">
 *   <SectionHeader title="About Us" />
 *   {about content}
 * </SectionWrapper>
 * 
 * @example
 * // With anchor link
 * <SectionWrapper id="upcoming-events" background="primary-light">
 *   <SectionHeader title="Upcoming Events" />
 *   {events content}
 * </SectionWrapper>
 */

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function SectionWrapper({
  children,
  id,
  background = 'default',
  className = '',
  noPadding = false,
  animate = false,
  ...props
}) {
  // ── Background Variants ────────────────────────────────────────────────
  const backgrounds = {
    default: 'bg-bg',               // Darkest navy (page background)
    white: 'bg-surface',             // Mid blue (card-like sections)
    gray: 'bg-surface2',             // Elevated blue
    'primary-light': 'bg-primary-muted', // Deep blue fill
    'accent-light': 'bg-surface3',   // Deepest card blue
  };

  // ── Padding Classes (generous breathing room) ─────────────────────────
  const paddingClasses = noPadding 
    ? '' 
    : 'py-24 md:py-32';

  const backgroundClass = backgrounds[background] || backgrounds.default;

  const sectionClasses = `
    ${backgroundClass}
    ${paddingClasses}
    ${className}
  `.trim();

  // If animate is enabled, wrap in motion.section with whileInView
  if (animate) {
    return (
      <motion.section
        id={id}
        className={sectionClasses}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </motion.section>
    );
  }

  return (
    <section
      id={id}
      className={sectionClasses}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
