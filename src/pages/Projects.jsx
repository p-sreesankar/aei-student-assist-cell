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
            <div key={project.id} className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-white/60 overflow-hidden mt-2 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/50 group">
              {/* Image */}
              <div className="h-52 overflow-hidden relative bg-white/20">
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors drop-shadow-sm">{project.name}</h3>
                
                {/* Creators */}
                <div className="flex items-start gap-2 text-sm text-slate-700 mb-4">
                  <Users2 size={16} className="mt-0.5 text-blue-600 shrink-0" />
                  <div className="flex flex-wrap gap-1.5">
                    {project.creators.map((creator, i) => (
                      <span key={i} className="bg-white/50 backdrop-blur-md ring-1 ring-white/80 px-2.5 py-0.5 rounded-full text-xs font-semibold text-slate-700 shadow-sm">
                        {creator}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>

                {/* GitHub Action */}
                <a 
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 bg-white/60 hover:bg-white backdrop-blur-md text-blue-900 ring-1 ring-white hover:ring-blue-100 text-sm font-semibold py-2.5 px-4 rounded-xl transition-all shadow-sm hover:shadow w-full"
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
