import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../data/portfolio';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [lines, setLines] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const canvasRef = useRef(null);

  const terminalLines = [
    { text: '> initializing portfolio...', color: 'var(--text-muted)' },
    { text: '> loading modules ████████████ 100%', color: 'var(--text-muted)' },
    { text: '> resolving dependencies... OK', color: 'var(--terminal-green)' },
    { text: `> Hello, I'm ${siteConfig.name}`, color: 'var(--accent)' },
    { text: `> ${siteConfig.title}`, color: 'var(--text-primary)' },
  ];

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const tl = terminalLines;
    tl.forEach((line, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (i === tl.length - 1) {
          setTimeout(() => setShowContent(true), 400);
        }
      }, i * 350);
    });
  }, []);

  // Particle starfield — paused offscreen, throttled for perf
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }
    const ctx = canvas.getContext('2d');
    let animId;
    let visible = true;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 45 : 70; // was 120 — cut CPU/GPU ~40%
    const particles = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // cap DPR for perf
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.2 + 0.4,
        speed: Math.random() * 0.25 + 0.08,
        opacity: Math.random() * 0.45 + 0.08,
      });
    }

    // Pause when hero not in viewport — saves battery on scroll
    const section = canvas.closest('#home');
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    if (section) io.observe(section);

    let last = 0;
    const draw = (now) => {
      if (!visible) { animId = requestAnimationFrame(draw); return; }
      // Throttle to ~45fps on mobile, 60fps desktop — 16ms vs 22ms
      if (now - last < (isMobile ? 22 : 16)) { animId = requestAnimationFrame(draw); return; }
      last = now;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 224, ${p.opacity})`;
        ctx.fill();
        p.y -= p.speed;
        if (p.y < -5) {
          p.y = window.innerHeight + 5;
          p.x = Math.random() * window.innerWidth;
        }
      });
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      io.disconnect();
    };
  }, []);

  return (
    <section id="home" className="section" style={{ minHeight: '100vh', paddingLeft: '72px', contain: 'layout paint' }}>
      <canvas ref={canvasRef} aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.45, willChange: 'transform'
      }} />

      {/* Gradient orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,224,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        {/* Terminal block */}
        <div style={{
          background: 'rgba(17, 17, 24, 0.6)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '1.5rem',
          maxWidth: 560,
          marginBottom: '2.5rem',
          backdropFilter: 'blur(20px)',
        }}>
          <div style={{
            display: 'flex', gap: 6, marginBottom: '1rem'
          }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
          </div>
          {lines.map((line, i) => (
            <div key={i} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.85rem',
              color: line.color,
              marginBottom: '0.3rem',
              lineHeight: 1.8,
            }}>
              {line.text}
              {i === lines.length - 1 && !showContent && (
                <span className="cursor-blink" style={{
                  display: 'inline-block',
                  width: 8, height: 16,
                  background: 'var(--accent)',
                  marginLeft: 4,
                  verticalAlign: 'middle',
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.85rem',
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Full-Stack Developer × AI Engineer
          </p>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em',
          }}>
            I build things<br />
            for the <span className="text-gradient">digital world</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            maxWidth: 520,
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}>
            {siteConfig.tagline}. I craft performant, accessible web
            experiences with an obsession for clean code and stellar
            user interfaces.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              View My Work <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>



      <style>{`
        @media (max-width: 768px) {
          #home { padding-left: 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}
