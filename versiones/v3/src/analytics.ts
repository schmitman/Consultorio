// Medición del sitio.
// - Cloudflare Web Analytics se activa desde el panel de Cloudflare Pages (no requiere código).
// - Google Analytics 4: pegar el ID de medición (G-XXXXXXX) en GA_ID. Vacío = no carga nada.
// Versión de prueba: GA4 apagado para no mezclar sus visitas con las de la home. Al pasarla a la home, volver a poner 'G-5FGSC124M0'.
export const GA_ID = '';

type Gtag = (...args: unknown[]) => void;
declare global { interface Window { dataLayer: unknown[]; gtag?: Gtag } }

export function initAnalytics() {
  if (!GA_ID || typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); } as Gtag;
  window.gtag('js', new Date());
  // page_view lo mandamos a mano porque el sitio cambia de sección con #hash
  window.gtag('config', GA_ID, { send_page_view: false });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  // Cualquier click en un mailto cuenta como contacto (conversión), con el asunto como etiqueta
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement)?.closest?.('a[href^="mailto:"]') as HTMLAnchorElement | null;
    if (!a) return;
    const subject = new URL(a.href.replace('mailto:', 'http://x/')).searchParams.get('subject') || 'sin asunto';
    track('contacto_mail', { asunto: subject });
  }, { capture: true });
}

export function track(event: string, params: Record<string, unknown> = {}) {
  window.gtag?.('event', event, params);
}

export function trackView(view: string) {
  track('page_view', {
    page_title: `Mara Schmitman | ${view}`,
    page_location: `${location.origin}/${view === 'inicio' ? '' : '#' + view}`,
  });
}
