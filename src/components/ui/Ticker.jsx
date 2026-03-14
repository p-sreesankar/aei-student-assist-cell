/**
 * Ticker Component — Horizontally scrolling marquee strip
 * 
 * Pure CSS animation (no JS). Infinite seamless loop.
 * Used between sections to break page rhythm and add editorial flair.
 * 
 * @example
 * <Ticker items={['📌 Notice Board', '📅 Events', '📂 Resources']} />
 * 
 * @example
 * // Custom speed & separator
 * <Ticker
 *   items={['Design', 'Build', 'Ship']}
 *   separator="✦"
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

  // Render each item in a fixed slot so spacing stays even regardless of text length.
  const tickerContent = items.map((item, i) => (
    <span key={`group-${i}`} className="inline-flex items-center shrink-0">
      <span className="inline-flex items-center justify-center min-w-[14rem] px-3 text-center">
        {item}
      </span>
      {i !== items.length - 1 && (
        <span
          className="inline-flex items-center justify-center w-8"
          style={separatorColor ? { color: separatorColor } : {}}
        >
          {separator}
        </span>
      )}
    </span>
  ));

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
