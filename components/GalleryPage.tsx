
import React from 'react';
import { motion } from 'framer-motion';

interface GalleryPageProps {
    onBack: () => void;
}

const milestones = [
    {
        year: "2025",
        title: "Agentic AI Hackathon Winner",
        role: "Team Lead",
        desc: "Led a team of 5 to victory by building a fully autonomous LangChain + FastAPI agent that automated complex enterprise workflows.",
        tags: ["LangChain", "FastAPI", "Agentic AI"]
    },
    {
        year: "2024",
        title: "Odoo Hackathon Winner",
        role: "Team Lead at IIT Madras Paradox",
        desc: "Orchestrated an ERP analytics solution for inventory optimization during the prestigious Paradox event at IIT Madras.",
        tags: ["Odoo", "Python", "Data Analytics"]
    },
    {
        year: "2024",
        title: "CodeChef Top 10%",
        role: "Competitive Programmer",
        desc: "Achieved Global Rank 6 (Certified Code Badge) and consistently ranked in the top 10% of contests, sharpening algorithmic problem-solving skills.",
        tags: ["Algorithms", "C++", "Data Structures"]
    },
    {
        year: "2023 - Present",
        title: "Freshmenu",
        role: "Backend Module Owner",
        desc: "Took ownership of core backend modules for a high-traffic food delivery platform. Optimized database queries and delivered critical production support.",
        tags: ["Node.js", "Microservices", "System Design"]
    },
    {
        year: "2021",
        title: "NDA-1 Written Exam Cleared",
        role: "Leadership Foundation",
        desc: "Cleared the rigorous National Defence Academy written exam and participated in the SSB interview, laying the foundation for discipline and leadership.",
        tags: ["Leadership", "Discipline"]
    }
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ onBack }) => {
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
                        <span className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-bold">Timeline</span>
                    </div>
                </motion.header>

                {/* Title */}
                <div className="mb-32">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                        className="heading-font text-5xl md:text-8xl lg:text-9xl font-bold leading-[0.8] tracking-tighter"
                    >
                        MY <br /> JOURNEY
                    </motion.h1>
                </div>

                {/* Timeline */}
                <div className="relative border-l border-white/10 ml-4 md:ml-12 pl-12 md:pl-24 pb-24 space-y-24">
                    {milestones.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className="relative"
                        >
                            {/* Timeline Node */}
                            <div className="absolute -left-[53px] md:-left-[101px] top-2 w-4 h-4 bg-black border border-white/30 rounded-full flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>

                            <div className="flex flex-col gap-6 max-w-2xl">
                                <div className="flex items-center gap-6">
                                    <span className="text-xs uppercase tracking-[0.2em] font-bold opacity-60 px-3 py-1 border border-white/20 rounded-full">{item.year}</span>
                                </div>

                                <div>
                                    <h3 className="heading-font text-3xl md:text-5xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-sm uppercase tracking-widest text-white/50 mb-6">{item.role}</p>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed font-light">
                                        {item.desc}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {item.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className="text-[10px] uppercase tracking-widest bg-white/5 px-3 py-2 rounded text-white/40">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};
