import { useEffect, useState } from 'react';
import axios from 'axios';
import { twMerge } from 'tailwind-merge';
import { ExternalLink, X, CheckCircle2 } from 'lucide-react';

interface ProjectItem {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  link?: string;
  description?: string;
  features?: string[];
  techPic?: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/projects')
      .then(res => {
        setProjects(res.data);
        const uniqueCategories = Array.from(new Set(res.data.map((p: ProjectItem) => p.category))) as string[];
        setCategories(['All', ...uniqueCategories]);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setError('Unable to load projects at this time. Please try again later.');
      });
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="portfolio" className="py-20 bg-bg-dark px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <h2 className="text-[1.8rem] font-bold text-text-main">Portfolio Highlights</h2>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={twMerge(
                  "text-[0.8rem] cursor-pointer pb-1 transition-colors",
                  activeTab === category
                    ? "text-accent-orange border-b-2 border-accent-orange"
                    : "text-text-muted hover:text-accent-orange border-b-2 border-transparent"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        {error ? (
          <div className="text-center py-10 bg-surface rounded-xl border border-border">
            <p className="text-text-muted">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project, index) => (
              <div 
                key={project._id} 
                className="bg-surface rounded-xl overflow-hidden relative border border-border group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
              <div className="h-48 bg-gradient-to-tr from-[#222] to-[#333] flex items-center justify-center text-border text-5xl font-bold relative overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:opacity-30 transition-opacity duration-300 group-hover:scale-110 transform"
                  referrerPolicy="no-referrer"
                />
                <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-300">0{index + 1}</span>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <div className="px-6 py-3 bg-accent-orange rounded-full flex items-center justify-center text-white font-medium hover:bg-[#e64300] transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                    View Details
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="text-[0.9rem] font-bold mb-1 text-text-main">{project.title}</div>
                <div className="text-[0.7rem] text-accent-orange uppercase tracking-wider">{project.category}</div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          ></div>
          
          <div className="relative bg-bg-dark border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-accent-orange text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>

            <div className="w-full h-64 sm:h-80 relative bg-surface">
              <img 
                src={selectedProject.techPic || selectedProject.imageUrl} 
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                <div className="text-accent-orange text-sm font-bold tracking-wider uppercase mb-2">
                  {selectedProject.category}
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-text-main mb-4 border-b border-border pb-2">Project Overview</h4>
                <p className="text-text-muted leading-relaxed mb-8">
                  {selectedProject.description || "Detailed description for this project is currently being updated. It involves comprehensive IT solutions tailored to specific organizational needs."}
                </p>

                {selectedProject.features && selectedProject.features.length > 0 && (
                  <>
                    <h4 className="text-xl font-bold text-text-main mb-4 border-b border-border pb-2">Key Features & Topics</h4>
                    <ul className="space-y-3">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-text-muted">
                          <CheckCircle2 className="text-accent-orange shrink-0 mt-0.5" size={18} />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              
              <div className="w-full md:w-64 shrink-0">
                <div className="bg-surface border border-border rounded-xl p-6">
                  <h4 className="font-bold text-text-main mb-4">Project Info</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Category</div>
                      <div className="font-medium text-white">{selectedProject.category}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Status</div>
                      <div className="font-medium text-green-400">Completed</div>
                    </div>
                    {selectedProject.link && (
                      <div className="pt-4 mt-4 border-t border-border">
                        <a 
                          href={selectedProject.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 bg-accent-orange hover:bg-[#e64300] text-white rounded-lg font-medium transition-colors"
                        >
                          <span>Live Preview</span>
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
