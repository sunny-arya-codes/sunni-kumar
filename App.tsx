
import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Cursor } from './components/Cursor';
import { Hero } from './components/Hero';
import { SkillsBanner } from './components/SkillsBanner';
import { BigName } from './components/BigName';
import { GeminiAssistant } from './components/GeminiAssistant';
import { Gallery } from './components/Gallery';
import { ProjectSection } from './components/ProjectSection';
import { Footer } from './components/Footer';
import { BookingPage } from './components/BookingPage';
import { GalleryPage } from './components/GalleryPage';
import { WorkPage } from './components/WorkPage';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'booking' | 'gallery' | 'work'>('home');
  const lenisRef = React.useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [view]);

  return (
    <div className="min-h-screen flex flex-col relative bg-black overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white z-[100] origin-left"
        style={{ scaleX }}
      />

      <Cursor />

      {/* Pages Transition */}
      <AnimatePresence mode="popLayout">
        {view === 'home' && (
          <motion.div
            key="home"
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100vw", opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="w-full relative bg-black"
          >
            <Navbar
              onBookClick={() => setView('booking')}
              onNavigate={(page) => setView(page as 'gallery')}
            />
            <main className="flex-grow">
              <Hero />
              <SkillsBanner />
              <BigName />
              {/* Gallery removed from Home flow - now its own page */}
              <ProjectSection onViewAll={() => setView('work')} />
            </main>
            <Footer />
          </motion.div>
        )}

        {view === 'booking' && (
          <motion.div
            key="booking"
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100vw", opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="w-full relative bg-black"
          >
            <BookingPage onBack={() => setView('home')} />
          </motion.div>
        )}

        {view === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100vw", opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="w-full relative bg-black"
          >
            <GalleryPage onBack={() => setView('home')} />
          </motion.div>
        )}

        {view === 'work' && (
          <motion.div
            key="work"
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100vw", opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="w-full relative bg-black"
          >
            <WorkPage onBack={() => setView('home')} />
          </motion.div>
        )}
      </AnimatePresence>
      <GeminiAssistant />
    </div>
  );
};

export default App;
