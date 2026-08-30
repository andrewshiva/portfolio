import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
// Below-fold — lazy split to cut initial bundle ~40%
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const AIPlayground = lazy(() => import('./components/AIPlayground'));
const Timeline = lazy(() => import('./components/Timeline'));
const Contact = lazy(() => import('./components/Contact'));
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (!loaded) return;
    // Reduce motion for prefers-reduced-motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger — throttle via RAF, not per scroll
    let rafId;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        ScrollTrigger.update();
        rafId = null;
      });
    };
    lenis.on('scroll', onScroll);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [loaded]);

  return (
    <div className="scanline-overlay noise-bg">
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {loaded && (
        <>
          <CustomCursor />
          <Navbar />
          <main style={{ contentVisibility: 'auto' }}>
            <Hero />
            <About />
            <Suspense fallback={<div style={{ minHeight: '30vh' }} />}>
              <Skills />
              <Projects />
              <AIPlayground />
              <Timeline />
              <Contact />
            </Suspense>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
