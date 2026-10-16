import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Portada, Caminos, Programas, Sobre, Prensa, Faq, Hablemos } from './components/Sections';
import { Bot } from './components/Bot';
import { Meadow } from './components/Meadow';
import { EMAIL } from './content';
import { trackView } from './analytics';

// Una sola página que se recorre scrolleando, con un botón flotante "Hablemos" que abre el mini bot. El menú queda como atajo.
const SECTIONS = [
  { id: 'inicio', label: 'Inicio', num: '00' },
  { id: 'sobre', label: 'Sobre Mara', num: '01' },
  { id: 'caminos', label: 'Caminos', num: '02' },
  { id: 'programas', label: 'Programas', num: '03' },
  { id: 'prensa', label: 'Prensa', num: '04' },
  { id: 'faq', label: 'FAQ', num: '05' },
  { id: 'contacto', label: 'Hablemos', num: '06' },
] as const;
type SectionId = (typeof SECTIONS)[number]['id'];

// Cada sección aparece con un fundido suave la primera vez que entra en pantalla
const Reveal: React.FC<{ id: string; className?: string; children: React.ReactNode }> = ({ id, className = '', children }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} className={`scroll-mt-14 lg:scroll-mt-0 reveal ${shown ? 'is-shown' : ''} ${className}`}>
      {children}
    </section>
  );
};

export default function App() {
  const [active, setActive] = useState<SectionId>('inicio');
  const [menuOpen, setMenuOpen] = useState(false);
  const seen = useRef(new Set<string>());

  // Al entrar con un #link (ej. /#prensa), bajar hasta esa parte una vez que la página está armada
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50);
  }, []);

  // El menú marca la sección que se está leyendo; cada sección vista cuenta una vez en la medición
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id as SectionId;
        setActive(id);
        if (!seen.current.has(id)) { seen.current.add(id); trackView(id); }
      }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const NavLinks: React.FC<{ mobile?: boolean }> = ({ mobile }) => (
    <>
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={() => setMenuOpen(false)}
          aria-current={active === s.id ? 'true' : undefined}
          className={`flex items-baseline gap-3 ${mobile ? 'py-2.5' : 'py-2'} transition-colors ${active === s.id ? 'text-ink' : 'text-muted hover:text-ink'}`}
        >
          <span className="mono-nav">{s.num}</span>
          <span className="font-serif text-xl">{s.label}</span>
        </a>
      ))}
    </>
  );

  return (
    <div className="min-h-dvh watercolor-paper-bg selection:bg-rose/20 lg:flex">
      {/* Menú lateral (desktop): atajo que acompaña el scroll */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 h-dvh sticky top-0 px-8 py-8 border-r hairline bg-paper/60 z-20">
        <a href="#inicio" className="font-serif text-[2.75rem] font-medium tracking-[-0.02em] text-ink leading-[0.9]" aria-label="Inicio">
          MS<span className="dot">.</span>
        </a>
        <nav className="mt-9 flex flex-col gap-1" aria-label="Secciones"><NavLinks /></nav>
        <div className="mt-auto space-y-2 text-xs text-muted">
          <a href={`mailto:${EMAIL}`} className="hover:text-rose block">{EMAIL}</a>
          <p className="mono-nav">Tigre, Buenos Aires</p>
        </div>
      </aside>

      {/* Barra superior (mobile) */}
      <header className="lg:hidden fixed inset-x-0 top-0 z-40 bg-paper/85 backdrop-blur-md border-b hairline">
        <div className="px-5 h-14 flex items-center justify-between">
          <a href="#inicio" onClick={() => setMenuOpen(false)} className="font-serif text-2xl text-ink leading-none" aria-label="Inicio">MS<span className="dot">.</span></a>
          <button className="p-2 -mr-2" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
        {menuOpen && <nav className="px-5 pb-4 flex flex-col" aria-label="Secciones"><NavLinks mobile /></nav>}
      </header>

      {/* Contenido: todas las secciones, una debajo de la otra */}
      <main className="relative flex-1 min-w-0">
        {/* Portada: un poco más baja que la pantalla, para que asome lo que sigue */}
        <section id="inicio" className="relative min-h-[86svh] lg:min-h-[88vh] flex flex-col justify-center px-5 sm:px-10 lg:px-16 pt-24 lg:pt-16 pb-[24svh] lg:pb-[30vh] overflow-hidden">
          <Meadow className="h-[30svh] lg:h-[40vh]" />
          <div className="relative z-10"><Portada /></div>
          <a href="#sobre" aria-label="Bajar a la siguiente sección" className="scroll-cue absolute z-10 left-1/2 -translate-x-1/2 bottom-5 lg:bottom-8 w-11 h-11 flex items-center justify-center rounded-full bg-paper/80 border hairline text-ink">
            <ChevronDown className="w-5 h-5" aria-hidden="true" />
          </a>
        </section>

        <div className="px-5 sm:px-10 lg:px-16">
          <Reveal id="sobre" className="py-16 lg:py-28"><Sobre /></Reveal>
          <Reveal id="caminos" className="py-16 lg:py-28 border-t hairline"><Caminos /></Reveal>
          <Reveal id="programas" className="py-16 lg:py-28 border-t hairline"><Programas /></Reveal>
          <Reveal id="prensa" className="py-16 lg:py-28 border-t hairline"><Prensa /></Reveal>
          <Reveal id="faq" className="py-16 lg:py-28 border-t hairline"><Faq /></Reveal>
        </div>

        {/* Hablemos cierra la página, otra vez sobre el prado */}
        <Reveal id="contacto" className="relative px-5 sm:px-10 lg:px-16 pt-16 lg:pt-28 pb-[30svh] lg:pb-[36vh] border-t hairline overflow-hidden">
          <Meadow className="h-[30svh] lg:h-[40vh]" />
          <div className="relative z-10"><Hablemos /></div>
        </Reveal>
      </main>

      <Bot />
    </div>
  );
}
