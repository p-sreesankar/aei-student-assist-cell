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
            <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-lg">
              {/* Image */}
              <div className="h-48 overflow-hidden relative bg-gray-100">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-800 mb-3">{project.name}</h3>
                
                {/* Creators */}
                <div className="flex items-start gap-2 text-sm text-slate-600 mb-4">
                  <Users2 size={16} className="mt-0.5 text-blue-600 shrink-0" />
                  <div className="flex flex-wrap gap-1">
                    {project.creators.map((creator, i) => (
                      <span key={i} className="bg-slate-100 px-2 py-0.5 rounded-full text-xs font-medium text-slate-700">
                        {creator}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-6 flex-grow">
                  {project.description}
                </p>

                {/* GitHub Action */}
                <a 
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors w-full"
                >
                  <Github size={16} />
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
