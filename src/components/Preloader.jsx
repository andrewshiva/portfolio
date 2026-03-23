import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  { text: '> PORTFOLIO_OS v2.5.0', delay: 0 },
  { text: '> Initializing system...', delay: 200 },
  { text: '> Loading modules ████████████ 100%', delay: 500 },
  { text: '> Mounting components...', delay: 900 },
  { text: '> Establishing neural link... OK', delay: 1200 },
  { text: '> Compiling 5 years of experience...', delay: 1600 },
  { text: '> System ready.', delay: 2000 },
  { text: '', delay: 2300 },
  { text: '> Welcome.', delay: 2500 },
];

export default function Preloader({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    bootLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line.text]);
      }, line.delay);
    });

    setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 600);
    }, 3200);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: '#0a0a0f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div style={{ maxWidth: 600, width: '100%' }}>
            {visibleLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.85rem',
                  color: line.startsWith('> Welcome')
                    ? '#00FFE0'
                    : line.startsWith('> System ready')
                    ? '#39ff14'
                    : '#71717a',
                  marginBottom: '0.35rem',
                  lineHeight: 1.8,
                }}
              >
                {line}
                {i === visibleLines.length - 1 && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 8,
                      height: 16,
                      background: '#00FFE0',
                      marginLeft: 4,
                      verticalAlign: 'middle',
                      animation: 'blink 1s step-end infinite',
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
