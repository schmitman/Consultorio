# Versiones de prueba del sitio

Cada carpeta (`v1`, `v2`…) es una propuesta completa, independiente de la home (`nuevodiseno-src/`).
Al hacer push, el workflow `.github/workflows/versiones.yml` la compila en `nuevodiseno/<vN>/` y queda en maraschmitman.com/nuevodiseno/<vN>/.

- No se indexan en buscadores (`noindex`) y no mandan datos a Google Analytics, para no mezclar visitas con la home.
- Para crear una nueva: copiar la carpeta anterior, cambiar `base` en `vite.config.ts` a `/nuevodiseno/<vN>/`.

| Versión | Qué prueba |
|---|---|
| v1 | Página larga que se recorre scrolleando: Portada → Sobre Mara → Caminos y Programas → Diagnóstico → FAQ → Hablemos. Menú como atajo. |
| v2 | Igual que la v1, pero "En los medios" sale de Sobre Mara y pasa a ser su propia sección (después del Diagnóstico, antes de FAQ). |
| v3 | v2 + botón flotante "Hablemos" que abre un mini bot (4 preguntas del diagnóstico → recomendación → nombre, email y situación → mail armado para Mara). Sin sección Diagnóstico. Bondy en la ficha de Sobre Mara. |
