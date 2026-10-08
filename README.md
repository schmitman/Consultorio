# Sitio de consultoría de carrera · Mara Schmitman

Sitio estático (HTML, CSS y JS, sin build). Se publica en Cloudflare Pages.

## Publicar en Cloudflare Pages
1. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → elegir este repo.
2. Framework preset: None. Build command: (vacío). Output directory: `/`.
3. Custom domains → agregar el dominio.

## Pendientes antes de publicar
- `mara.jpg`: foto de Mara (cuadrada, se muestra en círculo de 72px en gris).
- `flores.jpg`: imagen de fondo de la sección "Sobre Mara".
- Precios en `index.html` (buscar "Precio: a definir").
- Formulario: pegar la URL de Formspree (u otro) en `FORM_ENDPOINT` dentro de `app.js`. Sin eso, abre el correo de la persona con el mensaje armado.
