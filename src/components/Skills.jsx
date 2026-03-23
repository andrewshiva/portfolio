import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/portfolio';
import { Code, Server, Brain, Cloud } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categoryIcons = {
  'Frontend': Code,
  'Backend': Server,
  'AI / ML': Brain,
  'DevOps': Cloud,
};

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Category cards stagger
      gsap.utils.toArray('.skill-category').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Skill bars animate
      gsap.utils.toArray('.skill-bar-fill').forEach(bar => {
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: bar.getAttribute('data-level') + '%',
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar.parentElement,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section" style={{ paddingLeft: '72px' }}>
      <div className="section-inner">
        <div className="section-label">Skills & Expertise</div>
        <h2 className="section-title">
          My <span className="text-accent">tech stack</span>
        </h2>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: 560,
          marginBottom: '3rem',
          lineHeight: 1.7,
        }}>
          5+ years of building with modern technologies. Here's what I work with daily.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
        }}>
          {skills.map((category, ci) => {
            const Icon = categoryIcons[category.category] || Code;
            return (
              <div key={ci} className="skill-category card" style={{ padding: '2rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'var(--accent-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon size={20} style={{ color: 'var(--accent)' }} />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}>{category.category}</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {category.items.map((skill, si) => (
                    <div key={si}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.35rem',
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          color: 'var(--text-secondary)',
                        }}>{skill.name}</span>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--text-muted)',
                        }}>{skill.level}%</span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: 4,
                        borderRadius: 2,
                        background: 'var(--border)',
                        overflow: 'hidden',
                      }}>
                        <div
                          className="skill-bar-fill"
                          data-level={skill.level}
                          style={{
                            height: '100%',
                            borderRadius: 2,
                            background: `linear-gradient(90deg, var(--accent), var(--accent-dim))`,
                            width: '0%',
                            boxShadow: '0 0 10px var(--accent-glow)',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #skills { padding-left: 1.25rem !important; }
          #skills .section-inner > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
