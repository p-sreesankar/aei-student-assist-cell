import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Pin, Paperclip, ExternalLink } from 'lucide-react';
import { NOTICES } from '@data/notices';
import SectionHeader from '@components/SectionHeader';
import { formatDate } from '@utils/date';

export default function Notices() {
  const [showAll, setShowAll] = useState(false);

  const sorted = useMemo(() => {
    const pinned   = NOTICES.filter((n) => n.pinned).sort((a, b) => b.date.localeCompare(a.date));
    const unpinned = NOTICES.filter((n) => !n.pinned).sort((a, b) => b.date.localeCompare(a.date));
    return [...pinned, ...unpinned];
  }, []);

  const visible = showAll ? sorted : sorted.slice(0, 8);

  return (
    <section className="section-container section-padding">
      <SectionHeader title="Notice Board" subtitle="Latest announcements from the AEI department" />

      {sorted.length === 0 ? (
        <p className="text-center text-text-muted py-12">No notices available yet. Check back soon!</p>
      ) : (
        <>
          <div className="max-w-narrow mx-auto space-y-4">
            {visible.map((notice, i) => (
              <motion.article
                key={notice.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="card p-5 md:p-6"
              >
                <div className="flex items-start gap-3">
                  {notice.pinned && (
                    <span className="mt-1 text-accent-500" title="Pinned notice">
                      <Pin size={18} />
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-lg text-text-primary mb-1">
                      {notice.title}
                    </h3>
                    <time className="text-sm text-text-muted">{formatDate(notice.date)}</time>
                    <p className="text-text-secondary mt-2 leading-relaxed">{notice.description}</p>
                    {notice.attachmentUrl && (
                      <a
                        href={notice.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold
                                   text-primary-600 hover:text-primary-700"
                      >
                        <Paperclip size={14} /> View Attachment <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {sorted.length > 8 && (
            <div className="text-center mt-8">
              <button onClick={() => setShowAll(!showAll)} className="btn-secondary">
                {showAll ? 'Show Less' : `View All ${sorted.length} Notices`}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
