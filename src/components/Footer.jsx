import { siteConfig } from '../data/portfolio';
import { Heart } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, TwitterIcon } from './icons';

export default function Footer() {
  return (
    <footer style={{
      paddingLeft: '72px',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-secondary)',
    }}>
      {/* Accent stripe */}
      <div style={{
        height: 2,
        background: 'linear-gradient(90deg, var(--accent), transparent 50%)',
      }} />

      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            Built with <Heart size={12} style={{ color: 'var(--accent)' }} /> & React
          </span>
        </div>

        <div style={{ display: 'flex', gap: '1.25rem' }}>
          {[
            { icon: GitHubIcon, url: siteConfig.socials.github, label: 'GitHub' },
            { icon: LinkedInIcon, url: siteConfig.socials.linkedin, label: 'LinkedIn' },
            { icon: TwitterIcon, url: siteConfig.socials.twitter, label: 'Twitter' },
          ].map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.label}
              style={{
                color: 'var(--text-muted)',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--accent)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer { padding-left: 0 !important; }
          footer > div:last-child {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
