
import React from 'react';
import { motion } from 'framer-motion';

const achievements = [
    {
        title: "CodeChef Top 10%",
        role: "Competitive Programming",
        desc: "Achieved Top 10% in CodeChef contests with Certified Code Badge (Rank 6).",
        year: "2024"
    },
    {
        title: "Agentic AI Hackathon",
        role: "Team Lead",
        desc: "Led a 5-member team building a LangChain + FastAPI automation agent. Won the hackathon.",
        year: "2025"
    },
    {
        title: "Odoo Hackathon Winner",
        role: "Team Lead",
        desc: "Orchestrated ERP analytics and inventory optimization using Odoo stack at IIT Madras Paradox.",
        year: "2024"
    },
    {
        title: "Backend Module Owner",
        role: "Freshmenu",
        desc: "Oversaw core backend modules and delivered production support for operational systems.",
        year: "2023-Present"
    },
    {
        title: "NDA-1 Cleared",
        role: "Leadership",
        desc: "Cleared NDA-1 written exam and participated in SSB interview.",
        year: "2021"
    }
];

export const Gallery: React.FC = () => {
    return (
        <section id="gallery" className="px-6 md:px-12 py-32 bg-zinc-950 border-b border-white/5 relative overflow-hidden">
            {/* Background abstract element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-12">
                    <div className="max-w-2xl">
                        <span className="text-[10px] uppercase tracking-[0.5em] opacity-30 mb-6 block font-bold">Milestones</span>
                        <h2 className="heading-font text-4xl md:text-6xl font-bold tracking-tighter leading-none">
                            ACHIEVEMENTS <br /> & LEADERSHIP
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="bg-black border border-white/10 p-8 flex flex-col justify-between group hover:border-white/30 transition-colors duration-500"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-40">{item.year}</span>
                                    <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors duration-500" />
                                </div>
                                <h3 className="heading-font text-xl font-bold mb-2 group-hover:text-white transition-colors duration-300">{item.title}</h3>
                                <p className="text-xs uppercase tracking-widest text-white/40 mb-6">{item.role}</p>
                                <p className="text-sm text-zinc-400 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
