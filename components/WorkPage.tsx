import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, Project } from '../data/projects';
import { ProjectDetailsModal } from './ProjectDetailsModal';

interface WorkPageProps {
    onBack: () => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onBack }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
    };

    return (
        <div className="min-h-screen bg-black bg-grid text-white px-6 md:px-12 py-12 flex flex-col relative z-20 overflow-x-hidden">
            <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-between items-center mb-32"
                >
                    <button
                        onClick={onBack}
                        className="flex items-center gap-4 text-xs uppercase tracking-widest font-bold opacity-50 hover:opacity-100 transition-opacity group"
                    >
                        <span className="w-8 h-[1px] bg-white group-hover:w-16 transition-all duration-300"></span>
                        Back to Home
                    </button>

                    <div className="text-right">
                        <span className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-bold">Portfolio</span>
                    </div>
                </motion.header>

                {/* Title */}
                <div className="mb-24">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                        className="heading-font text-5xl md:text-8xl lg:text-9xl font-bold leading-[0.8] tracking-tighter"
                    >
                        ALL <br /> WORKS
                    </motion.h1>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 pb-24">
                    {projects.map((p, idx) => (
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

                <ProjectDetailsModal
                    isOpen={!!selectedProject}
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            </div>
        </div>
    );
};
