import { motion } from 'framer-motion';
import { ABOUT } from '@data/about';
import SectionHeader from '@components/SectionHeader';

export default function About() {
  return (
    <section className="section-container section-padding">
      <SectionHeader title="About the Cell" subtitle="Who we are and what we do" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-narrow mx-auto"
      >
        {/* About content */}
        <div className="prose prose-lg max-w-none">
          <h3 className="font-heading text-2xl font-bold text-text-primary mb-4">
            {ABOUT.heading}
          </h3>
          {ABOUT.paragraphs.map((para, i) => (
            <p key={i} className="text-text-secondary leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </div>

        {/* Optional team photo */}
        {ABOUT.teamPhotoUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 rounded-card overflow-hidden shadow-card-lg"
          >
            <img
              src={ABOUT.teamPhotoUrl}
              alt="Student Assist Cell Team"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
