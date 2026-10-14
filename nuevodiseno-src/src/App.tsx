import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Portada, Caminos, Programas, Sobre, Faq, Hablemos } from './components/Sections';
import { Termometro } from './components/Termometro';
import { Meadow } from './components/Meadow';
import { EMAIL } from './content';

const VIEWS = [
  { id: 'inicio', label: 'Inicio', num: '00' },
  { id: 'caminos', label: 'Caminos', num: '01' },
  { id: 'programas', label: 'Programas', num: '02' },
  { id: 'termometro', label: 'Diagnóstico', num: '03' },
  { id: 'sobre', label: 'Sobre Mara', num: '04' },
  { id: 'faq', label: 'FAQ', num: '05' },
  { id: 'contacto', label: 'Hablemos', num: '06' },
] as const;
type ViewId = (typeof VIEWS)[number]['id'];

const fromHash = (): ViewId => {
  const h = window.location.hash.replace('#', '');
  return (VIEWS.some((v) => v.id === h) ? h : 'inicio') as ViewId;
};

export default function App() {
  const [view, setView] = useState<ViewId>(fromHash);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onHash = () => setView(fromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = (id: ViewId) => {
    window.location.hash = id;
    setMenuOpen(false);
  };

  const content: Record<ViewId, React.ReactNode> = {
    inicio: <Portada go={go} />,
    caminos: <Caminos />,
    programas: <Programas />,
    termometro: <Termometro />,
    sobre: <Sobre />,
    faq: <Faq />,
    contacto: <Hablemos />,
  };

  return (
    <div className="min-h-dvh watercolor-paper-bg selection:bg-rose/20 lg:flex">
      {/* Menú lateral (desktop) */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 h-dvh sticky top-0 px-8 py-8 border-r hairline bg-paper/60">
        <button onClick={() => go('inicio')} className="font-serif text-[2.75rem] font-medium tracking-[-0.02em] text-ink text-left leading-[0.9]" aria-label="Inicio">
          MS<span className="dot">.</span>
        </button>
        <nav className="mt-9 flex flex-col gap-1" aria-label="Secciones">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              onClick={() => go(v.id)}
              aria-current={view === v.id ? 'page' : undefined}
              className={`flex items-baseline gap-3 py-2 text-left transition-colors ${view === v.id ? 'text-rose' : 'text-ink/70 hover:text-ink'}`}
            >
              <span className="mono-nav">{v.num}</span>
              <span className="font-serif text-xl">{v.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto space-y-2 text-xs text-muted">
          <a href={`mailto:${EMAIL}`} className="hover:text-rose block">{EMAIL}</a>
          <p className="mono-nav">Tigre, Buenos Aires</p>
        </div>
      </aside>

      {/* Barra superior (mobile) */}
      <header className="lg:hidden sticky top-0 z-40 bg-paper/85 backdrop-blur-md border-b hairline">
        <div className="px-5 h-14 flex items-center justify-between">
          <button onClick={() => go('inicio')} className="font-serif text-2xl text-ink leading-none" aria-label="Inicio">MS<span className="dot">.</span></button>
          <button className="p-2 -mr-2" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="px-5 pb-4 flex flex-col" aria-label="Secciones">
            {VIEWS.map((v) => (
              <button key={v.id} onClick={() => go(v.id)} className={`flex items-baseline gap-3 py-2.5 text-left ${view === v.id ? 'text-rose' : 'text-ink'}`}>
                <span className="mono-nav">{v.num}</span>
                <span className="font-serif text-xl">{v.label}</span>
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Contenido: una vista por vez */}
      <main className="relative z-10 flex-1 min-w-0 flex flex-col">
        <div key={view} className={`view-in flex-1 flex flex-col justify-center px-5 sm:px-10 lg:px-16 py-10 lg:py-16 pb-[26vh] ${view === 'inicio' ? 'lg:pb-[40vh]' : 'lg:pb-[30vh]'}`}>
          {content[view]}
        </div>
      </main>

      <Meadow />
    </div>
  );
}
