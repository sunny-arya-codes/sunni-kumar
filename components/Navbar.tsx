import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

interface NavbarProps {
  onBookClick?: () => void;
  onNavigate?: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick, onNavigate }) => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on('change', (latest) => setScrolled(latest > 50));
    return () => unsub();
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full px-6 md:px-12 py-8 flex justify-between items-center fixed top-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent'
        }`}
    >
      <div className="flex-1">
        <a href="#" className="heading-font text-2xl font-bold tracking-tighter cursor-none">Sunni</a>
      </div>

      <div className="hidden md:flex flex-[2] justify-center gap-10">
        {['Gallery', 'Work', 'About', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              if (item === 'Gallery' && onNavigate) {
                onNavigate('gallery');
                return;
              }
              const element = document.getElementById(item.toLowerCase());
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50 hover:opacity-100 transition-all duration-300 cursor-none"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex-1 flex justify-end">
        <button
          onClick={onBookClick}
          className="text-[10px] uppercase tracking-[0.2em] font-bold border border-white/20 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-500 cursor-none"
        >
          Book a call
        </button>
      </div>
    </motion.nav>
  );
};
