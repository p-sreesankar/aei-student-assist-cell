import { PageBanner } from '@components/ui';
import { SectionWrapper } from '@components/layout';
import { projects } from '@data/projects';
import { Github, Users2 } from 'lucide-react';

export default function Projects() {
  return (
    <>
      <PageBanner 
        title="Department Projects"
        subtitle="Exploring innovation through student-led development and research."
      />

      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-blue-50/30 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-blue-100 mt-2 flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/5 hover:border-blue-300 group">
              {/* Image */}
              <div className="h-52 overflow-hidden relative bg-blue-100/50">
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-blue-50/40 to-blue-100/20">
                <h3 className="text-xl font-bold text-blue-950 mb-3 group-hover:text-blue-700 transition-colors">{project.name}</h3>
                
                {/* Creators */}
                <div className="flex items-start gap-2 text-sm text-blue-800/80 mb-4">
                  <Users2 size={16} className="mt-0.5 text-blue-600 shrink-0" />
                  <div className="flex flex-wrap gap-1.5">
                    {project.creators.map((creator, i) => (
                      <span key={i} className="bg-white/60 border border-blue-100 px-2.5 py-0.5 rounded-full text-xs font-semibold text-blue-700 shadow-sm">
                        {creator}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-blue-950/70 text-sm mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>

                {/* GitHub Action */}
                <a 
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-700 text-blue-50 text-sm font-semibold py-2.5 px-4 rounded-lg transition-all shadow-sm hover:shadow-md w-full"
                >
                  <Github size={18} />
                  View Source Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
