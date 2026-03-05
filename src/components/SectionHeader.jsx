import { motion } from 'framer-motion';

export default function SectionHeader({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <h1 className="section-title">{title}</h1>
      {subtitle && <p className="section-subtitle mx-auto mt-2">{subtitle}</p>}
    </motion.div>
  );
}
