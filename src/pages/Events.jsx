import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { EVENTS } from '@data/events';
import SectionHeader from '@components/SectionHeader';
import { formatDate, isUpcoming } from '@utils/date';

export default function Events() {
  const [showAllPast, setShowAllPast] = useState(false);

  const { upcoming, past } = useMemo(() => {
    const up = EVENTS.filter((e) => isUpcoming(e.date)).sort((a, b) => a.date.localeCompare(b.date));
    const pa = EVENTS.filter((e) => !isUpcoming(e.date)).sort((a, b) => b.date.localeCompare(a.date));
    return { upcoming: up, past: pa };
  }, []);

  const visiblePast = showAllPast ? past : past.slice(0, 6);

  return (
    <section className="section-container section-padding">
      <SectionHeader title="Events" subtitle="What's happening and what we've done" />

      {/* ── Upcoming ─────────────────────────────────────────── */}
      {upcoming.length > 0 && (
        <div className="mb-16">
          <h3 className="font-heading text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> Upcoming
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {upcoming.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} variant="upcoming" />
            ))}
          </div>
        </div>
      )}

      {/* ── Past Events ──────────────────────────────────────── */}
      {past.length > 0 && (
        <div>
          <h3 className="font-heading text-xl font-bold text-text-primary mb-6">Past Events</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePast.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} variant="past" />
            ))}
          </div>
          {past.length > 6 && (
            <div className="text-center mt-8">
              <button onClick={() => setShowAllPast(!showAllPast)} className="btn-secondary">
                {showAllPast ? (
                  <>Show Less <ChevronUp size={16} /></>
                ) : (
                  <>View All {past.length} Past Events <ChevronDown size={16} /></>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {upcoming.length === 0 && past.length === 0 && (
        <p className="text-center text-text-muted py-12">No events listed yet. Check back soon!</p>
      )}
    </section>
  );
}

function EventCard({ event, index, variant }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="card overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      {event.imageUrl ? (
        <div className="h-44 bg-surface-200 overflow-hidden">
          <img src={event.imageUrl} alt={event.name} loading="lazy"
               className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="h-2 bg-gradient-to-r from-primary-400 to-accent-400" />
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          {variant === 'upcoming' ? (
            <span className="badge-primary">Upcoming</span>
          ) : (
            <span className="badge-muted">Completed</span>
          )}
        </div>

        <h4 className="font-heading font-bold text-lg text-text-primary mb-1">{event.name}</h4>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted mb-3">
          <span className="flex items-center gap-1"><Clock size={14} /> {formatDate(event.date)}{event.time ? ` · ${event.time}` : ''}</span>
          <span className="flex items-center gap-1"><MapPin size={14} /> {event.venue}</span>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed flex-1">{event.description}</p>

        {event.registrationUrl && variant === 'upcoming' && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4 self-start text-sm"
          >
            Register <ExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.article>
  );
}
