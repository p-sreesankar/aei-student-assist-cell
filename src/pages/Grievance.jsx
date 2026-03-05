import { motion } from 'framer-motion';
import { SITE_CONFIG } from '@data/site-config';
import SectionHeader from '@components/SectionHeader';

export default function Grievance() {
  return (
    <section className="section-container section-padding">
      <SectionHeader
        title="Grievance Form"
        subtitle="We're here to listen. Submit your concern below — it's confidential."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-narrow mx-auto"
      >
        {/* Info box */}
        <div className="bg-primary-50 border border-primary-200 rounded-card p-5 mb-8 text-sm text-primary-800 leading-relaxed">
          <p className="font-semibold mb-1">How it works:</p>
          <ul className="list-disc list-inside space-y-1 text-primary-700">
            <li>Fill out the form below — your identity is kept confidential.</li>
            <li>The Student Assist Cell coordinator will review your submission.</li>
            <li>You'll receive a response via the email you provide (if given).</li>
            <li>For urgent matters, contact us directly via the <a href="#/contact" className="underline font-semibold">Contact page</a>.</li>
          </ul>
        </div>

        {/* Embedded Google Form */}
        <div className="rounded-card overflow-hidden shadow-card-lg bg-white">
          <iframe
            src={SITE_CONFIG.grievanceFormUrl}
            title="Grievance Submission Form"
            width="100%"
            height="900"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            className="w-full min-h-[600px] md:min-h-[800px]"
          >
            Loading…
          </iframe>
        </div>
      </motion.div>
    </section>
  );
}
