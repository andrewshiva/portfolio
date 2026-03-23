import { useState, useEffect } from 'react';
import { navLinks } from '../data/portfolio';
import {
  Terminal, User, Cpu, FolderOpen, Route, Send,
  Download, Menu, X
} from 'lucide-react';

const iconMap = { Terminal, User, Cpu, FolderOpen, Route, Send };

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(l => document.getElementById(l.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPos) {
          setActive(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="navbar-desktop">
        <div className="nav-logo" onClick={() => scrollTo('home')}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">SST</span>
          <span className="logo-bracket">/&gt;</span>
        </div>

        <div className="nav-links">
          {navLinks.map(link => {
            const Icon = iconMap[link.icon];
            return (
              <button
                key={link.id}
                className={`nav-link ${active === link.id ? 'active' : ''}`}
                onClick={() => scrollTo(link.id)}
                title={link.label}
              >
                <Icon size={18} />
                <span className="nav-label">{link.label}</span>
              </button>
            );
          })}
        </div>

      </nav>

      {/* Mobile Header */}
      <header className={`navbar-mobile ${scrolled ? 'scrolled' : ''}`}>
        <div className="mobile-logo" onClick={() => scrollTo('home')}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">SST</span>
          <span className="logo-bracket">/&gt;</span>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            {navLinks.map(link => {
              const Icon = iconMap[link.icon];
              return (
                <button
                  key={link.id}
                  className={`mobile-link ${active === link.id ? 'active' : ''}`}
                  onClick={() => scrollTo(link.id)}
                >
                  <Icon size={18} />
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        .navbar-desktop {
          position: fixed;
          left: 0;
          top: 0;
          width: 72px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 0;
          z-index: 1000;
          background: rgba(10, 10, 15, 0.8);
          backdrop-filter: blur(20px);
          border-right: 1px solid var(--border);
        }

        .nav-logo {
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 2rem;
          display: flex;
          gap: 1px;
          transition: all 0.3s;
        }
        .nav-logo:hover { text-shadow: 0 0 20px var(--accent-glow-strong); }
        .logo-bracket { color: var(--text-muted); }
        .logo-text { color: var(--accent); }

        .nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
          justify-content: center;
        }

        .nav-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s var(--ease-out-expo);
          position: relative;
        }
        .nav-link .nav-label {
          position: absolute;
          left: 56px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-primary);
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          white-space: nowrap;
          opacity: 0;
          transform: translateX(-5px);
          transition: all 0.2s;
          pointer-events: none;
        }
        .nav-link:hover .nav-label {
          opacity: 1;
          transform: translateX(0);
        }
        .nav-link:hover {
          color: var(--accent);
          background: var(--accent-glow);
        }
        .nav-link.active {
          color: var(--accent);
          background: var(--accent-glow);
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          right: -15px;
          width: 3px;
          height: 20px;
          background: var(--accent);
          border-radius: 2px;
        }

        .navbar-mobile {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          z-index: 1000;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.25rem;
          transition: all 0.3s;
        }
        .navbar-mobile.scrolled {
          background: rgba(10, 10, 15, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }

        .mobile-logo {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          color: var(--accent);
        }
        .mobile-menu-btn {
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 4px;
        }

        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(10px);
        }
        .mobile-menu {
          position: absolute;
          top: 60px;
          right: 1rem;
          left: 1rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .mobile-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .mobile-link:hover, .mobile-link.active {
          background: var(--accent-glow);
          color: var(--accent);
        }

        @media (max-width: 768px) {
          .navbar-desktop { display: none; }
          .navbar-mobile { display: flex; }
          .mobile-overlay { display: block; }
        }
      `}</style>
    </>
  );
}
