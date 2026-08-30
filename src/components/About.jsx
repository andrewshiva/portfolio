import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutText } from '../data/portfolio';
import avatarImg from '../assets/Gemini_Generated_Image_tt99mitt99mitt99.png';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const paragraphRefs = useRef([]);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax portrait
      gsap.fromTo('.about-portrait',
        { y: 60, scale: 0.95 },
        {
          y: -40,
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Story paragraphs stagger
      paragraphRefs.current.forEach((p, i) => {
        gsap.fromTo(p,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: p,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Stats counter
      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section" style={{ paddingLeft: '72px' }}>
      <div className="section-inner">
        <div className="section-label">About Me</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '4rem',
          alignItems: 'start',
        }}>
          {/* Portrait */}
          <div style={{ position: 'relative' }}>
            <div className="about-portrait" style={{
              width: '100%',
              aspectRatio: '3/4',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              position: 'relative',
              background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-elevated) 100%)',
            }}>
              <img
                src={avatarImg}
                alt="Shiva Singh Tomar"
                loading="lazy"
                decoding="async"
                // @ts-ignore — fetchpriority for LCP control
                fetchpriority="low"
                width="400"
                height="533"
                sizes="(max-width: 768px) 100vw, 400px"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  contentVisibility: 'auto',
                }}
              />

              {/* Scanline effect on portrait */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,224,0.015) 2px, rgba(0,255,224,0.015) 4px)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Accent line */}
            <div style={{
              position: 'absolute',
              top: -16,
              right: -16,
              width: 80,
              height: 80,
              border: '1px solid var(--accent)',
              borderRadius: 12,
              opacity: 0.2,
            }} />
          </div>

          {/* Story */}
          <div>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>
              The story behind<br />the <span className="text-accent">code</span>
            </h2>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--accent-dim)',
              fontStyle: 'italic',
              marginBottom: '1.5rem',
              lineHeight: 1.7,
              fontFamily: 'var(--font-body)',
            }}>
              {aboutText.intro}
            </p>

            {aboutText.story.map((para, i) => (
              <p
                key={i}
                ref={el => paragraphRefs.current[i] = el}
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: '1.25rem',
                }}
              >
                {para}
              </p>
            ))}

            {/* Stats */}
            <div
              ref={statsRef}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                marginTop: '2rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--border)',
              }}
            >
              {aboutText.stats.map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-mono)',
                  }}>{stat.value}</div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginTop: '0.25rem',
                  }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about { padding-left: 1.25rem !important; }
          #about .section-inner > div:first-of-type { 
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          #about .section-inner [style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
