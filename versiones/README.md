# Versiones de prueba del sitio

Cada carpeta (`v1`, `v2`…) es una propuesta completa, independiente de la home (`nuevodiseno-src/`).
Al hacer push, el workflow `.github/workflows/versiones.yml` la compila en `nuevodiseno/<vN>/` y queda en maraschmitman.com/nuevodiseno/<vN>/.

- No se indexan en buscadores (`noindex`) y no mandan datos a Google Analytics, para no mezclar visitas con la home.
- Para crear una nueva: copiar la carpeta anterior, cambiar `base` en `vite.config.ts` a `/nuevodiseno/<vN>/`.

| Versión | Qué prueba |
|---|---|
| v1 | Página larga que se recorre scrolleando: Portada → Sobre Mara → Caminos y Programas → Diagnóstico → FAQ → Hablemos. Menú como atajo. |
