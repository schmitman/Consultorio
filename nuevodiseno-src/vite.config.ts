import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    rollupOptions: {
      // Dos páginas: el sitio y la página interna para agendar el diagnóstico
      input: { main: resolve(import.meta.dirname, 'index.html'), agendar: resolve(import.meta.dirname, 'agendar/index.html') },
      // React y lucide se cargan desde esm.sh (ver import map en index.html): el bundle queda chico y versionable como texto.
      external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'lucide-react'],
    },
  },
});
