# Sitio de consultoría de carrera · Mara Schmitman

maraschmitman.com, publicado con Cloudflare Pages desde la raíz de este repo (sin build en Cloudflare).

## Estructura
- `nuevodiseno-src/`: código fuente (React + Vite + Tailwind v4). Acá se edita el sitio.
- `index.html`, `assets/`, `img/`: el sitio compilado. **No se editan a mano**: los genera el workflow.
- `_redirects`: los links viejos a `/nuevodiseno/` redirigen a la portada.
- `anterior/`: versión anterior del sitio, guardada como respaldo (`noindex`, sin links desde el sitio nuevo).

## Publicación
Cada push que toque `nuevodiseno-src/` dispara `.github/workflows/nuevodiseno.yml`: revisa tipos, compila y commitea el resultado en la raíz. Cloudflare Pages publica cada rama en `<rama>.maraschmitman.pages.dev` y `main` en maraschmitman.com.

La lista de espera del chat se guarda con la Pages Function `functions/api/lista-espera.js` (`POST /api/lista-espera`). El secreto y la URL de Apps Script salen de `LISTA_ESPERA_SECRET` y `LISTA_ESPERA_URL` en el proyecto Pages. Si no están definidas, la función usa un respaldo.

## Contenido
Textos, programas, preguntas frecuentes y prensa viven en `nuevodiseno-src/src/content.ts`.
