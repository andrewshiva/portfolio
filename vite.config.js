import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 350,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion';
            if (id.includes('gsap') || id.includes('lenis')) return 'gsap';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('react') && (id.includes('react-dom') || id.includes('/react/'))) return 'vendor';
          }
        },
      },
    },
  },
  server: {
    warmup: { clientFiles: ['./src/components/Hero.jsx', './src/components/About.jsx'] },
  },
})
