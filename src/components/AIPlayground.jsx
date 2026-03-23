import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Send, User, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const initialMessages = [
  { role: 'bot', text: "Hello! I'm the AI assistant embedded in this portfolio. Ask me anything about Alex's skills, projects, or experience." },
];

const aiResponses = {
  'skills': "Alex is proficient in React, Next.js, Node.js, Python, and has deep experience with AI/ML tools like OpenAI, LangChain, and RAG architectures. 5+ years of full-stack experience.",
  'projects': "Some notable projects include NeuralChat AI (real-time AI conversation platform), CloudStack Dashboard (enterprise monitoring), and PixelForge Studio (collaborative design tool).",
  'experience': "Alex has 5+ years of professional experience, progressing from Junior Developer at TechStart Inc. to AI/Full-Stack Lead at NeuralWorks AI, and now an independent consultant.",
  'contact': "You can reach Alex at hello@alexchen.dev, or use the contact form below. Also available on GitHub, LinkedIn, and Twitter.",
  'default': "That's a great question! Alex would be happy to discuss this further. Feel free to reach out via the contact section below. In the meantime, try asking about skills, projects, or experience!",
};

function getResponse(input) {
  const lower = input.toLowerCase();
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) return aiResponses.skills;
  if (lower.includes('project') || lower.includes('work') || lower.includes('built')) return aiResponses.projects;
  if (lower.includes('experience') || lower.includes('journey') || lower.includes('career')) return aiResponses.experience;
  if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) return aiResponses.contact;
  return aiResponses.default;
}

export default function AIPlayground() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ai-playground-card',
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ai-playground-card',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(input);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const suggestions = ['What are your skills?', 'Tell me about your projects', 'How can I contact you?'];

  return (
    <section ref={sectionRef} className="section" style={{ paddingLeft: '72px' }}>
      <div className="section-inner" style={{ maxWidth: 800 }}>
        <div className="section-label">AI Integration</div>
        <h2 className="section-title">
          Ask my <span className="text-accent">AI assistant</span>
        </h2>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: 560,
          marginBottom: '2.5rem',
          lineHeight: 1.7,
        }}>
          An interactive demo showcasing AI integration. This signals that I build
          with AI, not just talk about it.
        </p>

        <div className="ai-playground-card" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-secondary)',
          }}>
            <div style={{
              width: 32, height: 32,
              borderRadius: 8,
              background: 'var(--accent-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Sparkles size={16} style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}>Portfolio AI</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--terminal-green)',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--terminal-green)',
                  display: 'inline-block',
                }} />
                Online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            height: 320,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                  background: msg.role === 'user' ? 'var(--accent-glow)' : 'var(--bg-elevated)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {msg.role === 'user'
                    ? <User size={14} style={{ color: 'var(--accent)' }} />
                    : <Bot size={14} style={{ color: 'var(--text-muted)' }} />
                  }
                </div>
                <div style={{
                  maxWidth: '75%',
                  padding: '0.75rem 1rem',
                  borderRadius: 12,
                  fontSize: '0.85rem',
                  lineHeight: 1.7,
                  background: msg.role === 'user' ? 'var(--accent-glow)' : 'var(--bg-elevated)',
                  color: msg.role === 'user' ? 'var(--accent)' : 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: 'var(--bg-elevated)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Bot size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 12,
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                }}>
                  <span style={{ animation: 'blink 1s infinite' }}>●</span>
                  <span style={{ animation: 'blink 1s infinite 0.2s' }}>●</span>
                  <span style={{ animation: 'blink 1s infinite 0.4s' }}>●</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestions */}
          <div style={{
            padding: '0 1.5rem',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => { setInput(s); }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 20,
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.color = 'var(--accent)';
                }}
                onMouseLeave={e => {
                  e.target.style.borderColor = 'var(--border)';
                  e.target.style.color = 'var(--text-muted)';
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: '1rem 1.5rem',
            display: 'flex',
            gap: '0.75rem',
          }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about skills, projects, experience..."
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button
              onClick={handleSend}
              className="btn-primary"
              style={{ padding: '0.75rem 1rem' }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #ai-playground { padding-left: 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}
