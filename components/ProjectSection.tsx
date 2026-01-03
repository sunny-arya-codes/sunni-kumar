import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, Project } from '../data/projects';
import { ProjectDetailsModal } from './ProjectDetailsModal';

interface ProjectSectionProps {
  onViewAll?: () => void;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({ onViewAll }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section id="work" className="px-6 md:px-12 py-32 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-12">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.5em] opacity-30 mb-6 block font-bold">Selected Works</span>
            <h2 className="heading-font text-4xl md:text-6xl font-bold tracking-tighter leading-none">
              PUSHING THE <br /> LIMITS OF AI
            </h2>
          </div>
          <div className="md:text-right">
            <p className="text-xs uppercase tracking-[0.3em] opacity-30 mb-2">Portfolio 2024</p>
            <p className="text-sm opacity-50 max-w-xs leading-relaxed">
              Crafting unique digital solutions by blending technical excellence with artistic vision.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 mb-16">
          {projects.slice(0, 4).map((p, idx) => (
            <motion.div
              key={idx}
              onClick={() => handleProjectClick(p)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-black p-10 md:p-16 min-h-[500px] flex flex-col justify-between hover:bg-zinc-100 transition-all duration-700 ease-in-out cursor-none"
              data-cursor-text="VIEW PROJECT"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-16">
                  <span className="text-[9px] uppercase tracking-[0.4em] font-black opacity-30 group-hover:text-black/30 transition-colors">{p.category}</span>
                  <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-black/10 transition-colors">
                    <span className="text-[10px] opacity-30 group-hover:text-black/30">0{idx + 1}</span>
                  </div>
                </div>
                <h4 className="heading-font text-4xl md:text-5xl font-bold tracking-tighter group-hover:text-black transition-colors duration-700 mb-6">{p.title}</h4>
                <p className="text-sm md:text-base opacity-40 group-hover:text-black/60 max-w-sm mb-8 transition-colors duration-700 leading-relaxed">{p.desc}</p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2">
                {p.tech.map((t, i) => (
                  <span key={i} className="text-[9px] uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full group-hover:border-black/10 group-hover:text-black transition-all duration-700 font-bold">
                    {t}
                  </span>
                ))}
              </div>

              {/* Hover image preview placeholder */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none flex items-center justify-center overflow-hidden">
                <span className="heading-font text-[15vw] font-black tracking-tighter text-black select-none">VIEW</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={onViewAll}
            className="bg-white text-black px-12 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            View All Work
          </button>
        </div>
      </div>

      <ProjectDetailsModal
        isOpen={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
