import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/nuevodiseno/',
  build: {
    rollupOptions: {
      // React y lucide se cargan desde esm.sh (ver import map en index.html): el bundle queda chico y versionable como texto.
      external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'lucide-react'],
    },
  },
});
