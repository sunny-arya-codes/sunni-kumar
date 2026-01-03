
import React from 'react';
import { motion } from 'framer-motion';

interface BookingPageProps {
    onBack: () => void;
}

const stagger = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.5 + (i * 0.1), // Delay after the main slide
            duration: 1,
            ease: [0.19, 1, 0.22, 1]
        }
    })
};

export const BookingPage: React.FC<BookingPageProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-black bg-grid text-white px-6 md:px-12 py-12 flex flex-col relative z-20">
            <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="flex justify-between items-center mb-20"
                >
                    <button
                        onClick={onBack}
                        className="flex items-center gap-4 text-xs uppercase tracking-widest font-bold opacity-50 hover:opacity-100 transition-opacity group"
                    >
                        <span className="w-8 h-[1px] bg-white group-hover:w-16 transition-all duration-300"></span>
                        Back
                    </button>

                    <div className="text-right">
                        <span className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-bold">Contact</span>
                    </div>
                </motion.header>

                {/* Content */}
                <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <motion.h1
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={stagger}
                            className="heading-font text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.8] tracking-tighter mb-12"
                        >
                            LET'S <br /> TALK
                        </motion.h1>
                        <motion.p
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={stagger}
                            className="text-sm md:text-base opacity-50 leading-relaxed max-w-md mb-12"
                        >
                            Ready to start your next project? Pick a time that works for you, and let's discuss how we can work together.
                        </motion.p>

                        <div className="space-y-8 text-sm opacity-60">
                            <motion.div custom={2} initial="hidden" animate="visible" variants={stagger} className="flex items-center gap-4">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <p>Currently accepting new projects</p>
                            </motion.div>
                            <motion.div custom={3} initial="hidden" animate="visible" variants={stagger} className="flex items-center gap-4">
                                <span className="w-2 h-2 bg-white rounded-full"></span>
                                <p>Response time: Within 24 hours</p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Booking Form Simulation */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                        className="bg-zinc-900/50 border border-white/5 p-8 md:p-12 rounded-2xl backdrop-blur-sm"
                    >
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white focus:outline-none transition-colors placeholder:text-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Company</label>
                                    <input type="text" placeholder="Acme Inc." className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white focus:outline-none transition-colors placeholder:text-white/10" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Email</label>
                                <input type="email" placeholder="john@example.com" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white focus:outline-none transition-colors placeholder:text-white/10" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Project Details</label>
                                <textarea rows={4} placeholder="Tell me about your project..." className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white focus:outline-none transition-colors resize-none placeholder:text-white/10"></textarea>
                            </div>

                            <button className="w-full bg-white text-black font-bold uppercase tracking-widest text-xs py-5 rounded-full hover:bg-zinc-200 transition-colors mt-8">
                                Send Request
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
