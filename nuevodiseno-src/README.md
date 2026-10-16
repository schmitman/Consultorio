# Nuevo diseño de maraschmitman.com

React + Vite + Tailwind v4. React y lucide se cargan desde esm.sh (import map en `index.html`), así el bundle compilado es chico.

- `npm install --legacy-peer-deps`
- `npm run dev` para desarrollo
- `npm run build` genera `dist/`

Publicación: cada push que toque `nuevodiseno-src/` dispara el workflow `.github/workflows/nuevodiseno.yml`, que compila y commitea el resultado en la raíz del repo. Cloudflare Pages lo sirve en maraschmitman.com (y la página de reservas en maraschmitman.com/agendar/).

Dos páginas: `index.html` (el sitio, una sola página que se recorre scrolleando, con el bot "Hablemos") y `agendar/index.html` (reserva y pago del Diagnóstico 1 a 1). Agenda, precio, link de Mercado Pago y alias se editan en `AGENDA` de `src/content.ts`.

Imágenes: el prado va en `public/img/prado-lupinos.jpg` (reemplazar por la acuarela original). La foto usa `/mara.jpg` de la raíz del sitio.
