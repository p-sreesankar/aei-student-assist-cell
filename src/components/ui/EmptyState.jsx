import { Inbox, FileQuestion, Calendar, Image, FileText } from 'lucide-react';

/**
 * EmptyState Component — Friendly feedback for empty sections
 * 
 * @example
 * // Generic empty state
 * <EmptyState
 *   icon="inbox"
 *   title="No notices yet"
 *   subtitle="Check back soon for updates! "
 * />
 * 
 * @example
 * // With action button
 * <EmptyState
 *   icon="calendar"
 *   title="No upcoming events"
 *   subtitle="All events have passed. New ones will be posted soon!"
 *   action={
 *     <Button variant="secondary" size="sm">
 *       View Past Events
 *     </Button>
 *   }
 * />
 * 
 * @example
 * // Custom icon component
 * <EmptyState
 *   icon={<Sparkles size={48} className="text-primary-400" />}
 *   title="Nothing here yet"
 *   subtitle="We're working on adding new content. Stay tuned! "
 * />
 */
export default function EmptyState({
  icon = 'inbox',
  title = 'Nothing here yet',
  subtitle = 'Check back soon! ',
  action = null,
  className = '',
  ...props
}) {
  // ── Icon Mapping ───────────────────────────────────────────────────
  const iconMap = {
    inbox: Inbox,
    calendar: Calendar,
    image: Image,
    file: FileText,
    question: FileQuestion,
  };

  // ── Render Icon ────────────────────────────────────────────────────
  const renderIcon = () => {
    // If icon is a React component, render it directly
    if (typeof icon !== 'string') {
      return icon;
    }

    // Otherwise, look up the icon from the map
    const IconComponent = iconMap[icon] || Inbox;
    return (
      <IconComponent 
        size={48} 
        strokeWidth={1.5}
        className="text-text-muted"
      />
    );
  };

  return (
    <div 
      className={`
        flex flex-col items-center justify-center 
        py-16 px-6 text-center
        ${className}
      `.trim()}
      {...props}
    >
      {/* Icon */}
      <div className="mb-4 opacity-60">
        {renderIcon()}
      </div>

      {/* Title */}
      <h3 className="text-h4 font-heading font-semibold text-text-secondary mb-2">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="text-body text-text-muted max-w-md mb-6">
        {subtitle}
      </p>

      {/* Optional Action */}
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
}
