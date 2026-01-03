
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ isOpen, onClose, project }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-3xl bg-zinc-900 border border-white/10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 text-white/50 hover:text-white transition-colors bg-black/20 rounded-full backdrop-blur-md"
                        >
                            <X size={20} />
                        </button>

                        {/* Image Placeholder Area */}
                        <div className="h-48 md:h-64 bg-zinc-800 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10" />
                            <h3 className="heading-font text-4xl md:text-6xl text-white/5 font-black uppercase tracking-tighter absolute select-none">Project Preview</h3>
                        </div>

                        <div className="p-8 md:p-12 overflow-y-auto">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                                <div>
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent-color mb-2 block text-white/50">{project.category}</span>
                                    <h2 className="heading-font text-3xl md:text-4xl font-bold tracking-tighter leading-none">{project.title}</h2>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="text-[10px] uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full text-white/70">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <p className="text-sm md:text-base leading-relaxed text-zinc-400 mb-12 max-w-xl">
                                {project.desc}
                            </p>

                            <div className="flex gap-4">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                                    >
                                        <span>Live Demo</span>
                                        <ExternalLink size={14} />
                                    </a>
                                )}
                                {project.repoUrl && (
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                                    >
                                        <span>Source Code</span>
                                        <Github size={14} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
