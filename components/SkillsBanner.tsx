
import React from 'react';
import { motion } from 'framer-motion';

export const SkillsBanner: React.FC = () => {
  const skills = [
    "Machine Learning", "Generative AI", "Python", "Java",
    "FastAPI", "Spring Boot", "React.js", "Docker",
    "PostgreSQL", "AWS", "System Design", "Scikit-learn"
  ];

  return (
    <div className="py-20 overflow-hidden border-t border-b border-white/5 bg-white/2 select-none">
      <div className="flex whitespace-nowrap">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 items-center"
        >
          {[...skills, ...skills, ...skills, ...skills].map((skill, idx) => (
            <span
              key={idx}
              className={`heading-font text-5xl md:text-7xl font-bold ${idx % 2 === 0 ? "text-white" : "text-transparent stroke-text"
                }`}
              style={{
                WebkitTextStroke: idx % 2 === 0 ? "0" : "1px rgba(255,255,255,0.3)"
              }}
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
