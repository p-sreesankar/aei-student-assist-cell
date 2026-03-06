import { motion } from 'framer-motion';

/**
 * Card Component — Warm, elevated, interactive
 * 
 * @example
 * // Basic card
 * <Card>
 *   <p className="text-body">Card content goes here</p>
 * </Card>
 * 
 * @example
 * // With header
 * <Card
 *   header={
 *     <h3 className="text-h4 font-heading font-semibold text-text-primary">
 *       Card Title
 *     </h3>
 *   }
 * >
 *   <p className="text-body-sm text-text-secondary">
 *     Card body with detailed content.
 *   </p>
 * </Card>
 * 
 * @example
 * // Clickable card with hover effect
 * <Card clickable onClick={() => console.log('clicked')}>
 *   Interactive content
 * </Card>
 */
export default function Card({
  children,
  header = null,
  clickable = false,
  className = '',
  onClick,
  noHover = false,
  ...props
}) {
  const baseClasses = `
    bg-surface 
    rounded-lg 
    border border-border
    shadow-card
    overflow-hidden
    will-change-transform
  `;

  const clickableClasses = clickable ? 'cursor-pointer' : '';

  const combinedClasses = `
    ${baseClasses}
    ${clickableClasses}
    ${noHover ? '' : clickable ? 'hover:shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_0_1px_rgba(14,165,233,0.2)]' : 'hover:shadow-[0_6px_20px_rgba(0,0,0,0.4),0_0_0_1px_rgba(14,165,233,0.15)]'}
    transition-shadow duration-200
    ${className}
  `.replace(/\s+/g, ' ').trim();

  // Hover animation — subtle lift only (boxShadow via CSS transition for GPU perf)
  const hoverAnimation = noHover
    ? {}
    : clickable
      ? { y: -3 }
      : { y: -2 };

  const content = (
    <>
      {header && (
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border bg-surface2">
          {header}
        </div>
      )}
      <div className="p-4 sm:p-6">
        {children}
      </div>
    </>
  );

  if (clickable && onClick) {
    return (
      <motion.div
        className={combinedClasses}
        onClick={onClick}
        role="button"
        tabIndex={0}
        whileHover={hoverAnimation}
        whileTap={{ scale: 0.985 }}
        transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(e);
          }
        }}
        {...props}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={combinedClasses}
      whileHover={hoverAnimation}
      transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
      {...props}
    >
      {content}
    </motion.div>
  );
}
