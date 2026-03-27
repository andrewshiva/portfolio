import { motion } from 'framer-motion';
import { siteConfig } from '../data/portfolio';
import { ArrowRight } from 'lucide-react';
import RetroGrid from './ui/retro-grid';

export default function HeroV2() {
  return (
    <section id="home" className="section relative flex items-center justify-center overflow-hidden" style={{ minHeight: '100vh', paddingLeft: '72px' }}>
      
      {/* Magic UI Retro Grid Background */}
      <RetroGrid />

      <div className="section-inner relative z-10 w-full flex flex-col items-center text-center">
        
        {/* Animated Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 inline-flex items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-3 py-1 text-sm font-medium text-[var(--accent)] backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-[var(--accent)] mr-2 animate-pulse"></span>
          {siteConfig.tagline}
        </motion.div>

        {/* Huge Hero Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 relative"
        >
          <span className="block text-[var(--text-primary)]">Building the</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-purple-500">
            Digital Frontier
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="max-w-[600px] text-lg md:text-xl text-[var(--text-secondary)] mb-10"
        >
          Crafting high-performance web applications with Next.js, AI, and fluid physics-based animations.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="btn-primary group" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View My Work 
            <ArrowRight size={16} className="ml-2 inline-block transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

      </div>
      
      {/* Accent Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--accent)]/10 rounded-[100%] blur-[120px] pointer-events-none" />
    </section>
  );
}
