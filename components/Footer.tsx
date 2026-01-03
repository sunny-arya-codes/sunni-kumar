import React from 'react';
import { Linkedin, Github, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="px-6 md:px-12 py-32 bg-black flex flex-col items-center">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mb-32">
          <div className="flex-1">
            <span className="text-[10px] uppercase tracking-[0.5em] opacity-30 mb-8 block font-bold">Get in touch</span>
            <h2 className="heading-font text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none mb-12 group cursor-default">
              LET'S TALK <br />
              <span className="opacity-30 italic group-hover:opacity-100 group-hover:text-white transition-all duration-700">ABOUT IT.</span>
            </h2>
            <div className="flex flex-wrap gap-12">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-30 mb-4 font-bold">Email</p>
                <a href="mailto:contact.Sunniarya@gmail.com" className="text-xl md:text-2xl font-light hover:opacity-50 transition-opacity border-b border-white/10 pb-2 block">contact.Sunniarya@gmail.com</a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-30 mb-4 font-bold">Social</p>
                <div className="flex gap-6">
                  <a href="https://linkedin.com/in/sunni-kumar" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300">
                    <Linkedin size={18} />
                  </a>
                  <a href="https://github.com/sunny-arya-codes" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300">
                    <Github size={18} />
                  </a>
                  <a href="https://www.youtube.com/@bytebuddy.official" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300">
                    <Youtube size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.3em] font-bold opacity-30">
          <p>© 2024 Sunni — All Rights Reserved</p>
          <div className="flex gap-8">
            <p>Made in Bengaluru</p>
            <p>Local Time 14:32</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
