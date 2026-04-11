import { motion } from 'framer-motion';
import SEO from '@components/SEO';
import { SectionWrapper } from '@components/layout';
import { EmptyState, PageBanner, ProjectShowcaseCard, SectionHeader } from '@components/ui';
import { PROJECTS } from '@data/projects';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function Projects() {
  return (
    <>
      <SEO
        title="Projects"
        description="Explore AEI department projects across embedded systems, VLSI, instrumentation, AI, and automation domains."
      />

      <PageBanner
        title="Projects Showcase"
        subtitle="Built by our students and mentors across AI, VLSI, instrumentation, and automation tracks."
        breadcrumb={[
          { label: 'Home', path: '/' },
          { label: 'Projects', path: '/projects' },
        ]}
        gradientFrom="from-[#0C1D34]"
        gradientTo="to-[#0A1628]"
      />

      <SectionWrapper background="default" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 right-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-blue-700/15 blur-3xl" />

        <div className="relative z-[1]">
          <SectionHeader
            title="Department Builds"
            subtitle="Every card includes project owner details, key tags, a repository link, and a concise technical overview."
            showAccent
          />

          {PROJECTS.length === 0 ? (
            <div className="mt-8">
              <EmptyState
                icon="inbox"
                title="No projects listed yet"
                subtitle="Add entries in src/data/projects.js to publish your showcase."
              />
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {PROJECTS.map((project) => (
                <motion.div key={project.id} variants={item}>
                  <ProjectShowcaseCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    tags={project.tags}
                    creators={project.creators}
                    link={project.github}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </SectionWrapper>
    </>
  );
}