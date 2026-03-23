import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const glow = glowRef.current;
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let glowX = 0, glowY = 0;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      if (dot) {
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
      }
      if (glow) {
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    animate();

    // Magnetic effect for interactive elements
    const magnetics = document.querySelectorAll('button, a, .card');
    const handleEnter = () => {
      if (dot) dot.style.transform = 'translate(-50%, -50%) scale(2.5)';
      if (glow) glow.style.transform = 'translate(-50%, -50%) scale(1.5)';
    };
    const handleLeave = () => {
      if (dot) dot.style.transform = 'translate(-50%, -50%) scale(1)';
      if (glow) glow.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    magnetics.forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      magnetics.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={glowRef} className="cursor-glow" />
      <style>{`
        .cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background: var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          transition: transform 0.15s ease;
          mix-blend-mode: difference;
        }
        .cursor-glow {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(0, 255, 224, 0.3);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          transform: translate(-50%, -50%);
          transition: transform 0.3s ease, border-color 0.3s;
        }
        @media (max-width: 768px) {
          .cursor-dot, .cursor-glow { display: none; }
        }
      `}</style>
    </>
  );
}
