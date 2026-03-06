import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

/**
 * PageBanner Component — Hero banner for inner pages
 * 
 * @example
 * // Basic page banner
 * <PageBanner
 *   title="Notice Board"
 *   subtitle="Stay updated with the latest announcements"
 * />
 * 
 * @example
 * // With breadcrumb
 * <PageBanner
 *   title="Latest Events"
 *   subtitle="Workshops, seminars, and student activities"
 *   breadcrumb={[
 *     { label: 'Home', path: '/' },
 *     { label: 'Events', path: '/events' }
 *   ]}
 * />
 * 
 * @example
 * // Custom gradient
 * <PageBanner
 *   title="Gallery"
 *   subtitle="Moments captured from our events"
 *   gradientFrom="from-accent-500"
 *   gradientTo="to-accent-700"
 * />
 */
export default function PageBanner({
  title,
  subtitle = null,
  breadcrumb = [],
  gradientFrom = 'from-primary-muted',
  gradientTo = 'to-bg',
  className = '',
  ...props
}) {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-gradient-to-br ${gradientFrom} ${gradientTo}
        ${className}
      `.trim()}
      {...props}
    >
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-bright rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-bright rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mb-4"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center gap-2 text-sm">
              {breadcrumb.map((crumb, index) => {
                const isLast = index === breadcrumb.length - 1;

                return (
                  <li key={index} className="flex items-center gap-2">
                    {index === 0 && (
                      <Home size={14} className="text-white/80" />
                    )}
                    
                    {isLast ? (
                      <span className="text-white font-medium">
                        {crumb.label}
                      </span>
                    ) : (
                      <>
                        <Link
                          to={crumb.path}
                          className="text-white/80 hover:text-white transition-colors"
                        >
                          {crumb.label}
                        </Link>
                        <ChevronRight size={14} className="text-white/60" />
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="text-h1 md:text-display font-heading font-bold text-white mb-3"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="text-body-lg md:text-h4 text-white/90 max-w-2xl font-body"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
