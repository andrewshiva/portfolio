import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timeline } from '../data/portfolio';
import { Briefcase, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the connecting line
      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      );

      // Stagger timeline items
      gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1, x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section" style={{ paddingLeft: '72px' }}>
      <div className="section-inner" style={{ maxWidth: 900 }}>
        <div className="section-label">Journey</div>
        <h2 className="section-title">
          My <span className="text-accent">career path</span>
        </h2>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: 560,
          marginBottom: '3rem',
          lineHeight: 1.7,
        }}>
          5 years of growth, learning, and building. Every milestone shaped who I am today.
        </p>

        <div style={{ position: 'relative', paddingLeft: 40 }}>
          {/* Vertical line */}
          <div className="timeline-line" style={{
            position: 'absolute',
            left: 15,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'linear-gradient(to bottom, var(--accent), var(--accent-dim), var(--border))',
            transformOrigin: 'top',
            borderRadius: 1,
          }} />

          {timeline.map((item, i) => (
            <div key={i} className="timeline-item" style={{
              position: 'relative',
              marginBottom: i < timeline.length - 1 ? '2.5rem' : 0,
              paddingLeft: '2rem',
            }}>
              {/* Dot */}
              <div style={{
                position: 'absolute',
                left: -26,
                top: 4,
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: item.type === 'current' ? 'var(--accent)' : 'var(--bg-card)',
                border: `2px solid ${item.type === 'current' ? 'var(--accent)' : 'var(--accent-dim)'}`,
                zIndex: 1,
                boxShadow: item.type === 'current' ? '0 0 20px var(--accent-glow-strong)' : 'none',
              }} />

              <div className="card" style={{
                padding: '1.5rem',
                borderLeft: item.type === 'current' ? '3px solid var(--accent)' : 'none',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent)',
                    letterSpacing: '0.1em',
                  }}>
                    {item.year}
                  </span>
                  {item.type === 'current' ? (
                    <Rocket size={16} style={{ color: 'var(--accent)' }} />
                  ) : (
                    <Briefcase size={16} style={{ color: 'var(--text-muted)' }} />
                  )}
                </div>

                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  marginBottom: '0.25rem',
                  color: 'var(--text-primary)',
                }}>{item.role}</h3>

                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.75rem',
                }}>{item.company}</p>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience { padding-left: 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}
