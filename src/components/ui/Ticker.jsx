/**
 * Ticker Component — Horizontally scrolling marquee strip
 * 
 * Pure CSS animation (no JS). Infinite seamless loop.
 * Used between sections to break page rhythm and add editorial flair.
 * 
 * @example
 * <Ticker items={[' Notice Board', ' Events', ' Resources']} />
 * 
 * @example
 * // Custom speed & separator
 * <Ticker
 *   items={['Design', 'Build', 'Ship']}
 *   separator=""
 *   speed={40}
 * />
 */
export default function Ticker({
  items = [],
  separator = '·',
  separatorColor = null,
  speed = 30,
  className = '',
  style = {},
}) {
  if (items.length === 0) return null;

  // Build repeated content with consistent item spacing.
  const tickerContent = items.flatMap((item, i) => {
    const content = [
      <span key={`item-${i}`} className="inline-flex items-center px-4 md:px-5">
        {item}
      </span>,
    ];

    if (separator) {
      content.push(
        <span
          key={`sep-${i}`}
          className="inline-flex items-center px-1"
          style={separatorColor ? { color: separatorColor } : {}}
        >
          {separator}
        </span>
      );
    }

    return content;
  });

  // Duplicate for seamless loop
  const strip = (
    <span className="inline-flex items-center whitespace-nowrap" aria-hidden="true">
      {tickerContent}
    </span>
  );

  return (
    <div
      className={`overflow-hidden select-none pointer-events-none ${className}`}
      role="marquee"
      aria-label={items.join(', ')}
      style={style}
    >
      <div
        className="ticker-track flex whitespace-nowrap"
        style={{ '--ticker-speed': `${speed}s` }}
      >
        {strip}
        {strip}
      </div>
    </div>
  );
}
