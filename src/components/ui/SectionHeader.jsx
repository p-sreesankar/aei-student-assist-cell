/**
 * SectionHeader Component — Consistent page section titles
 *
 * @example
 * // Basic usage
 * <SectionHeader
 *   title="Latest Notices"
 *   subtitle="Stay updated with the latest announcements"
 * />
 *
 * @example
 * // With section number & eyebrow
 * <SectionHeader
 *   title="Upcoming Events"
 *   subtitle="Mark your calendar"
 *   sectionNumber="01"
 *   eyebrow="What's Coming"
 *   showAccent
 * />
 *
 * @example
 * // Centered variant
 * <SectionHeader
 *   title="About Us"
 *   subtitle="Empowering students through accessible resources"
 *   centered
 * />
 */
export default function SectionHeader({
  title,
  subtitle = null,
  number = null,
  sectionNumber = null,
  eyebrow = null,
  sticker = null,
  showAccent = false,
  accentColor = 'primary',
  centered = false,
  className = '',
  ...props
}) {
  const accentColors = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    error: 'bg-error',
    info: 'bg-info',
  };

  const containerClasses = `
    relative
    ${centered ? 'text-center mx-auto max-w-3xl' : ''}
    ${className}
  `.trim();

  // Support both `number` and `sectionNumber` props
  const rawNumber = sectionNumber ?? number;
  const formattedNumber = rawNumber != null
    ? String(rawNumber).padStart(2, '0')
    : null;

  return (
    <div className={containerClasses} {...props}>
      {/* Floating Sticker (optional) */}
      {sticker && (
        <span
          className="absolute -top-3 -right-2 md:-top-4 md:-right-4 text-2xl md:text-3xl select-none pointer-events-none opacity-80 rotate-12"
          aria-hidden="true"
        >
          {sticker}
        </span>
      )}

      {/* Eyebrow Label — blue pill above heading */}
      {eyebrow && (
        <span
          className="inline-block px-3 py-1 mb-3 rounded-full text-xs font-medium tracking-wide uppercase"
          style={{
            background: 'rgba(14,165,233,0.12)',
            color: '#38BDF8',
            border: '1px solid rgba(14,165,233,0.2)',
          }}
        >
          {eyebrow}
        </span>
      )}

      {/* Accent Bar (optional, only when no eyebrow) */}
      {showAccent && !centered && !eyebrow && (
        <div className={`w-12 h-1 rounded-full mb-4 ${accentColors[accentColor] || accentColors.primary}`} />
      )}

      {/* Section Number — "01 —" prefix */}
      {formattedNumber && (
        <span className="block text-caption font-heading font-semibold tracking-widest uppercase mb-1">
          <span style={{ color: '#0EA5E9' }}>{formattedNumber}</span>
          <span style={{ color: '#1E4976' }}> —</span>
        </span>
      )}

      {/* Title — OVERSIZED editorial sizing */}
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-heading font-black leading-tight tracking-tight mb-2"
        style={{ color: '#F0F9FF' }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`text-body-lg ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
          style={{ color: '#7DD3FC' }}
        >
          {subtitle}
        </p>
      )}

      {/* Centered Accent Dot */}
      {showAccent && centered && (
        <div className={`w-2 h-2 rounded-full mx-auto mt-3 ${accentColors[accentColor] || accentColors.primary}`} />
      )}
    </div>
  );
}
