import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/portfolio';
import { Send, MapPin, Mail, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [typingField, setTypingField] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-card',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    const mailto = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.email)}&su=${subject}&body=${body}`;
    console.log('[contact] mailto:', mailto);
    console.log('[contact] gmail:', gmail);
    // Primary: Gmail compose (works without local mail client). Secondary: mailto hidden anchor.
    const win = window.open(gmail, '_blank', 'noopener,noreferrer');
    if (!win) {
      // Popup blocked — fallback to mailto anchor click
      try {
        const a = document.createElement('a');
        a.href = mailto;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => { window.location.href = mailto; }, 300);
      } catch {
        window.location.href = mailto;
      }
    } else {
      // Also trigger mailto in background for users with native client (no harm)
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = mailto;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, 400);
    }
    setSent(true);
    setTimeout(() => setSent(false), 6000);
    setForm({ name: '', email: '', message: '' });
  };

  const inputStyle = (focused) => ({
    width: '100%',
    padding: '0.875rem 1rem',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.85rem',
    background: 'var(--bg-secondary)',
    border: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
    borderRadius: 8,
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxShadow: focused ? '0 0 20px var(--accent-glow)' : 'none',
  });

  return (
    <section id="contact" ref={sectionRef} className="section" style={{ paddingLeft: '72px' }}>
      <div className="section-inner" style={{ maxWidth: 800 }}>
        <div className="section-label">Get In Touch</div>
        <h2 className="section-title">
          Let's <span className="text-accent">connect</span>
        </h2>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: 560,
          marginBottom: '3rem',
          lineHeight: 1.7,
        }}>
          Have a project in mind or just want to chat? Drop me a message and I'll get back to you.
        </p>

        <div className="contact-card" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '2rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          {/* Info panel */}
          <div style={{
            padding: '2.5rem',
            background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-card))',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--accent)',
                marginBottom: '0.5rem',
              }}>
                // terminal.contact
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
              }}>
                Start a conversation
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'var(--accent-glow)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Mail size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Email</div>
                    <a href={`mailto:${siteConfig.email}`} style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textDecoration: 'none', borderBottom: '1px dashed var(--border)' }}>{siteConfig.email}</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'var(--accent-glow)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <MapPin size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Location</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{siteConfig.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal-style decoration */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-dim)',
              marginTop: '2rem',
              lineHeight: 2,
            }}>
              <div style={{ color: 'var(--text-muted)' }}>{'>'} awaiting_message...</div>
              <div><span className="cursor-blink" style={{ color: 'var(--accent)' }}>█</span></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}>
                  {'>'} name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setTypingField('name')}
                  onBlur={() => setTypingField(null)}
                  placeholder="John Doe"
                  style={inputStyle(typingField === 'name')}
                  required
                />
              </div>

              <div>
                <label style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}>
                  {'>'} email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setTypingField('email')}
                  onBlur={() => setTypingField(null)}
                  placeholder="john@example.com"
                  style={inputStyle(typingField === 'email')}
                  required
                />
              </div>

              <div>
                <label style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}>
                  {'>'} message
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setTypingField('message')}
                  onBlur={() => setTypingField(null)}
                  placeholder="Tell me about your project..."
                  rows={4}
                  style={{
                    ...inputStyle(typingField === 'message'),
                    resize: 'vertical',
                    minHeight: 100,
                  }}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: '0.5rem',
              }}>
                {sent ? (
                  <>Packet sent! ✓</>
                ) : (
                  <>Send Message <ArrowRight size={16} /></>
                )}
              </button>
              {sent && (
                <div style={{ marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.6, textAlign: 'center' }}>
                  Opening mail app…<br />
                  If nothing opens,{' '}
                  <a href={`mailto:${siteConfig.email}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>click to email</a>
                  {' '}or{' '}
                  <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.email)}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>open Gmail</a>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact { padding-left: 1.25rem !important; }
          .contact-card { grid-template-columns: 1fr !important; }
          .contact-card > div:first-child { border-right: none !important; border-bottom: 1px solid var(--border); }
        }
      `}</style>
    </section>
  );
}
