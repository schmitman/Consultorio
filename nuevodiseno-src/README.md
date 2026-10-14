# Nuevo diseño de maraschmitman.com

React + Vite + Tailwind v4. React y lucide se cargan desde esm.sh (import map en `index.html`), así el bundle compilado es chico.

- `npm install --legacy-peer-deps`
- `npm run dev` para desarrollo
- `npm run build` genera `dist/`

Publicación: cada push a `main` que toque `nuevodiseno-src/` dispara el workflow `.github/workflows/nuevodiseno.yml`, que compila y commitea el resultado en la carpeta `nuevodiseno/` del repo. Cloudflare Pages la sirve en maraschmitman.com/nuevodiseno/.

Imágenes: el prado va en `public/img/prado-lupinos.jpg` (reemplazar por la acuarela original). La foto usa `/mara.jpg` de la raíz del sitio.
