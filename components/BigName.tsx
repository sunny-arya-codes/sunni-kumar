
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const BigName: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Image moves Left: 0 -> -300
  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // Text moves Right: 0 -> 300
  const xRight = useTransform(scrollYProgress, [0, 1], [0, 300]);

  // Text Opacity: 0 -> 1 (Fade in as it moves out)
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="about" ref={ref} className="py-24 md:py-48 overflow-hidden bg-black bg-grid flex flex-col justify-center border-b border-white/5 relative items-center min-h-[80vh]">
      <div className="relative w-full max-w-[90vw] flex items-center justify-center">

        {/* Text Container - Moves Right */}
        <motion.div
          style={{ x: xRight, opacity: textOpacity }}
          className="absolute inset-0 flex flex-col justify-center items-center z-0"
        >
          <h2 className="heading-font text-[20vw] font-black leading-[0.7] whitespace-nowrap text-white/10 select-none mix-blend-screen">
            Sunni
          </h2>
          <h2 className="heading-font text-[20vw] font-black leading-[0.7] whitespace-nowrap stroke-text opacity-10 select-none">
            ENGINEER
          </h2>
        </motion.div>

        {/* Hero Image - Moves Left */}
        <motion.div
          style={{ x: xLeft }}
          className="relative z-10"
        >
          <img
            src="/hero.png"
            alt="Sunni Hero"
            className="h-[50vh] md:h-[70vh] w-auto object-contain grayscale-[0.2] contrast-125 drop-shadow-2xl"
          />
        </motion.div>

        {/* About Description - Realigned */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute -bottom-24 md:bottom-4 right-0 md:-right-8 lg:-right-16 max-w-xs md:max-w-sm z-20 text-center md:text-right mix-blend-difference w-full md:w-auto flex flex-col items-center md:items-end mt-12 md:mt-0"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold block mb-4 opacity-50 text-white">The Synergy</span>
          <p className="text-xs md:text-sm font-light leading-relaxed text-zinc-300">
            Engineering digital experiences where technical depth meets visual artistry. Specializing in <span className="text-white font-bold">Generative AI</span> and <span className="text-white font-bold">Scalable Systems</span> to transform complex logic into intuitive, immersive interfaces.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
