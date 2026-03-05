import { motion } from 'framer-motion';
import { Mail, Phone, User } from 'lucide-react';
import { FACULTY } from '@data/faculty';
import SectionHeader from '@components/SectionHeader';
import { getInitials } from '@utils/helpers';

const ROLE_ORDER = ['coordinator', 'advisor', 'faculty', 'student-rep'];

export default function Contact() {
  const sorted = [...FACULTY].sort(
    (a, b) => ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role),
  );

  return (
    <section className="section-container section-padding">
      <SectionHeader title="Contact Us" subtitle="Reach out to the Student Assist Cell team" />

      {sorted.length === 0 ? (
        <p className="text-center text-text-muted py-12">Contact information coming soon.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-content mx-auto">
          {sorted.map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="card p-6 flex flex-col items-center text-center"
            >
              {/* Avatar */}
              {person.photoUrl ? (
                <img
                  src={person.photoUrl}
                  alt={person.name}
                  loading="lazy"
                  className="w-24 h-24 rounded-full object-cover shadow-card mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary-100 text-primary-600
                                flex items-center justify-center mb-4 shadow-card">
                  <span className="font-heading font-bold text-2xl">
                    {getInitials(person.name)}
                  </span>
                </div>
              )}

              <h4 className="font-heading font-bold text-text-primary">{person.name}</h4>
              <p className="text-sm text-text-muted mt-1">{person.designation}</p>

              <div className="mt-4 flex flex-col gap-2 w-full">
                <a
                  href={`mailto:${person.email}`}
                  className="inline-flex items-center justify-center gap-2 text-sm text-primary-600
                             hover:text-primary-700 transition-colors"
                >
                  <Mail size={14} /> {person.email}
                </a>
                {person.phone && (
                  <a
                    href={`tel:${person.phone}`}
                    className="inline-flex items-center justify-center gap-2 text-sm text-primary-600
                               hover:text-primary-700 transition-colors"
                  >
                    <Phone size={14} /> {person.phone}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
