import SEO from '@components/SEO';
import { SectionWrapper } from '@components/layout';
import { Badge, EmptyState, PageBanner } from '@components/ui';
import { PROJECTS } from '@data/projects';

export default function Projects() {
  return (
    <>
      <SEO 
        title="Projects — AEI Department" 
        description="Showcase of student and department projects featuring innovative engineering solutions."
      />
      
      <PageBanner
        title="Department Projects"
        description="Showcasing innovation and research from our students and faculty."
        gradient="from-primary to-primary-muted"
      />

      <SectionWrapper animate>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.length > 0 ? (
            PROJECTS.map(project => (
              <div 
                key={project.id} 
                className="bg-[#0F2744]/50 backdrop-blur-md border border-[#1E4976]/50 rounded-lg overflow-hidden flex flex-col shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* 4. Image */}
                <div className="h-48 w-full overflow-hidden shrink-0">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  {/* 1. Project Name */}
                  <h3 className="text-h4 font-bold text-text-primary mb-3">
                    {project.title}
                  </h3>
                  
                  {/* 2. Created By */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.creators.map((creator, i) => (
                      <Badge key={i} variant="primary">
                        {creator}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* 5. Description */}
                  <p className="text-body-sm text-text-secondary mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  {/* 3. GitHub Link */}
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-auto px-4 py-2 border border-border-bright text-text-primary font-body-sm rounded-md transition-all hover:bg-primary-soft hover:text-white flex items-center justify-center gap-2"
                  >
                    <span>View Repository</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <EmptyState title="No projects yet" message="Check back later for exciting student projects." />
            </div>
          )}
        </div>
      </SectionWrapper>
    </>
  );
}
