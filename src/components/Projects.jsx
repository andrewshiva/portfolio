import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolio';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GitHubIcon } from './icons';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  };

  return (
    <div
      ref={cardRef}
      className="project-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.4s, border-color 0.4s',
        cursor: 'pointer',
        borderColor: isHovered ? project.color + '40' : '',
        boxShadow: isHovered ? `0 20px 60px ${project.color}15` : '',
      }}
    >
      {/* Spotlight glow following cursor */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${project.color}15, transparent 70%)`,
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          pointerEvents: 'none',
          transition: 'none',
        }} />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Project number */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: project.color,
          letterSpacing: '0.15em',
          marginBottom: '1rem',
          opacity: 0.7,
        }}>
          {'0' + (index + 1)} / {'0' + projects.length}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: project.color,
            background: project.color + '15',
            padding: '0.25rem 0.5rem',
            borderRadius: 4,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Featured
          </div>
        )}

        <h3 style={{
          fontSize: '1.35rem',
          fontWeight: 700,
          marginBottom: '0.75rem',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          {project.title}
          <ArrowUpRight size={18} style={{
            color: project.color,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translate(2px, -2px)' : 'translate(0, 0)',
            transition: 'all 0.3s',
          }} />
        </h3>

        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          marginBottom: '1.25rem',
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem',
        }}>
          {project.tags.map((tag, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              background: 'var(--bg-elevated)',
              padding: '0.3rem 0.6rem',
              borderRadius: 4,
              border: '1px solid var(--border)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href={project.liveUrl} target="_blank" rel="noopener"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
              color: project.color,
              transition: 'opacity 0.3s',
            }}
          >
            <ExternalLink size={14} /> Live
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
              color: 'var(--text-muted)',
              transition: 'color 0.3s',
            }}
          >
            <GitHubIcon size={14} /> Code
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section" style={{ paddingLeft: '72px' }}>
      <div className="section-inner">
        <div className="section-label">Selected Work</div>
        <h2 className="section-title">
          Things I've <span className="text-accent">built</span>
        </h2>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: 560,
          marginBottom: '3rem',
          lineHeight: 1.7,
        }}>
          A curated selection of projects that showcase my range — from AI-powered platforms to
          developer tools and enterprise dashboards.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #projects { padding-left: 1.25rem !important; }
          #projects .section-inner > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
