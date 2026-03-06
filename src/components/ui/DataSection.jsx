import EmptyState from './EmptyState';

/**
 * DataSection — Wrapper that auto-shows EmptyState when data is empty
 *
 * Wraps any list/grid section and automatically renders a friendly
 * empty-state message when the data array has zero items.
 *
 * @example
 * // Basic usage — renders children only when data exists
 * <DataSection
 *   data={notices}
 *   emptyIcon="inbox"
 *   emptyTitle="No notices yet"
 *   emptySubtitle="Check back soon for updates!"
 * >
 *   {notices.map(n => <NoticeCard key={n.id} notice={n} />)}
 * </DataSection>
 *
 * @example
 * // With render function — receives the data array
 * <DataSection
 *   data={events}
 *   emptyIcon="calendar"
 *   emptyTitle="No upcoming events"
 * >
 *   {(items) => items.map(e => <EventCard key={e.id} event={e} />)}
 * </DataSection>
 */
export default function DataSection({
  data = [],
  emptyIcon = 'inbox',
  emptyTitle = 'Nothing here yet',
  emptySubtitle = 'Check back soon! 👀',
  emptyAction = null,
  children,
  className = '',
  ...props
}) {
  const isEmpty = !data || data.length === 0;

  if (isEmpty) {
    return (
      <div className={className} {...props}>
        <EmptyState
          icon={emptyIcon}
          title={emptyTitle}
          subtitle={emptySubtitle}
          action={emptyAction}
        />
      </div>
    );
  }

  // Support render-function pattern: children(data)
  const content = typeof children === 'function' ? children(data) : children;

  return (
    <div className={className} {...props}>
      {content}
    </div>
  );
}
