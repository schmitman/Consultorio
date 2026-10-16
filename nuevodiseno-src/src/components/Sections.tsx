import React, { useState } from 'react';
import { CAMINOS, PROGRAMAS, FAQ, LINKEDIN, BONDY, EMAIL, COLUMNAS, CHARLAS, mailto, type Mode, type Aparicion } from '../content';
import { abrirBot } from './Bot';
const nombreAMano = `${import.meta.env.BASE_URL}img/nombre-mara-schmitman.png`; // nombre escrito a mano por Mara
const retrato = `${import.meta.env.BASE_URL}img/mara-schmitman.png`; // retrato sin fondo, sobre un tono neutro

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="mono">{children}</p>;
const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-4xl sm:text-5xl leading-[1.05] mt-3">{children}</h2>
);

/* ---------- 00 PORTADA ---------- */
export const Portada: React.FC = () => (
  <div className="max-w-[640px]">
    <Eyebrow>Mara Schmitman · Lic. en Psicología &amp; diseño organizacional</Eyebrow>
    <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] leading-[0.98] mt-4">
      Estrategia de<br /><em>carrera</em><span className="dot">.</span>
    </h1>
    <p className="text-lg sm:text-xl text-ink leading-relaxed mt-6 max-w-lg">
      Consultorías individuales y grupales para entrar al mercado laboral o cambiar de rumbo con bases firmes.
    </p>
    <div className="flex flex-wrap gap-3 mt-7">
      <a href={mailto('Consulta de carrera')} className="btn btn-dark">Hablemos →</a>
      <button type="button" onClick={() => abrirBot()} className="btn-link">Diagnóstico de 2 minutos</button>
    </div>
    <p className="mt-8 text-sm text-muted">
      <span className="font-semibold text-ink">18+ años</span> armando equipos, del lado de quien decide a quién se contrata.
    </p>
  </div>
);

/* ---------- 01 CAMINOS ---------- */
export const Caminos: React.FC = () => (
  <div className="max-w-5xl">
    <Eyebrow>02 / Dos caminos</Eyebrow>
    <H2>¿Cuál es tu momento de <em>carrera</em><span className="dot">?</span></H2>
    <p className="text-ink mt-3 max-w-xl">Conseguir el primer trabajo y cambiar de rumbo piden estrategias distintas, porque el mercado mira cosas distintas en cada caso.</p>
    <div className="grid md:grid-cols-2 gap-8 md:gap-14 mt-8">
      {(['a', 'b'] as const).map((k) => {
        const c = CAMINOS[k];
        return (
          <article key={k} className="flex flex-col gap-3 pt-5 border-t border-ink/12">
            <span className="mono text-rose">{c.tab} · {c.tag}</span>
            <h3 className="text-2xl sm:text-3xl leading-tight">{c.title}</h3>
            <p className="text-base text-ink">{c.text}</p>
            <ul className="text-base text-ink space-y-2 mt-1">
              <li className="mono">Las trampas más frecuentes</li>
              {c.traps.map((t) => (
                <li key={t} className="flex gap-2"><span className="text-muted shrink-0">×</span>{t}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              <a href={c.cta1} className="btn btn-dark">1 a 1</a>
              <a href={c.cta2} className="btn-link">Grupal (4 a 6)</a>
            </div>
          </article>
        );
      })}
    </div>
  </div>
);

/* ---------- 02 PROGRAMAS ---------- */
export const Programas: React.FC = () => {
  const [f, setF] = useState<'all' | Mode>('all');
  const list = PROGRAMAS.filter((p) => f === 'all' || p.mode === f);
  const F: { k: 'all' | Mode; label: string }[] = [
    { k: 'all', label: 'Todos' }, { k: 'individual', label: '1 a 1' }, { k: 'grupal', label: 'Grupal' },
  ];
  return (
    <div className="max-w-4xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>03 / Modalidades</Eyebrow>
          <H2>Formatos y <em>programas</em><span className="dot">.</span></H2>
        </div>
        <div className="flex gap-7" role="group" aria-label="Filtrar programas">
          {F.map((x) => (
            <button key={x.k} onClick={() => setF(x.k)} aria-pressed={f === x.k} className="tab">{x.label}</button>
          ))}
        </div>
      </div>
      <div className="mt-7 border-b border-ink/12">
        {list.map((p) => {
          const [n, modo] = p.num.split(' / ');
          return (
            <article key={p.title} className="grid grid-cols-[44px_1fr] sm:grid-cols-[64px_1fr_auto] items-baseline gap-x-5 sm:gap-x-7 pt-5 pb-[18px] border-t border-ink/12">
              <span className="font-serif font-normal text-[2.5rem] sm:text-[3.25rem] leading-[0.8] text-muted [font-variant-numeric:lining-nums]">{n}</span>
              <div>
                <h3 className="text-2xl sm:text-[1.65rem] leading-[1.15]">{p.title}</h3>
                <p className="mt-1.5 text-sm text-ink">{modo} · {p.meta}</p>
                {p.precio ? (
                  <p className="mt-1.5 font-serif text-xl text-ink [font-variant-numeric:lining-nums]">{p.precio}</p>
                ) : (
                  <p className="mt-1.5 mono !text-green">Lista de espera abierta</p>
                )}
              </div>
              <div className="col-start-2 sm:col-start-auto mt-2 sm:mt-0 flex flex-wrap sm:flex-col sm:items-end gap-x-5 gap-y-1">
                {p.subject === 'Consulta: diagnóstico 1 a 1' && (
                  <a href={`${import.meta.env.BASE_URL}agendar/`} className="text-sm text-ink font-medium whitespace-nowrap underline decoration-1 underline-offset-[5px] decoration-green hover:decoration-ink">Agendar →</a>
                )}
                {p.mode === 'grupal' ? (
                  <button type="button" onClick={() => abrirBot(p.title)} className="text-sm text-ink font-medium whitespace-nowrap underline decoration-1 underline-offset-[5px] decoration-green hover:decoration-ink text-left">Sumarme a la lista de espera →</button>
                ) : (
                  <a href={mailto(p.subject)} className="text-sm text-rose whitespace-nowrap underline decoration-1 underline-offset-[5px] decoration-ink/35 hover:decoration-rose">Hablemos de este formato ↗</a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- 04 EN LOS MEDIOS ---------- */
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fecha = (iso: string) => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${MESES[m - 1]} ${y}`; };
const hoy = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

const Fila: React.FC<{ a: Aparicion }> = ({ a }) => (
  <li className="py-4 border-t border-ink/12">
    <p className="text-sm text-muted">{fecha(a.fecha)} · {a.medio}</p>
    {a.url ? (
      <a href={a.url} target="_blank" rel="noopener" className="block mt-1 font-serif font-medium text-[1.375rem] leading-[1.25] text-ink hover:underline decoration-1 underline-offset-4">{a.titulo}&nbsp;<span className="font-sans text-sm text-muted">↗</span></a>
    ) : (
      <p className="mt-1 font-serif font-medium text-[1.375rem] leading-[1.25] text-ink">{a.titulo}</p>
    )}
  </li>
);

const Lista: React.FC<{ titulo: string; items: Aparicion[] }> = ({ titulo, items }) => (
  <div>
    <p className="mono mb-2">{titulo}</p>
    <ul className="border-b border-ink/12">{items.map((a) => <Fila key={a.fecha + a.titulo} a={a} />)}</ul>
  </div>
);

export const Prensa: React.FC = () => {
  const h = hoy();
  const proximas = CHARLAS.filter((a) => a.fecha >= h).sort((x, y) => x.fecha.localeCompare(y.fecha));
  const charlas = CHARLAS.filter((a) => a.fecha < h);
  return (
    <div className="max-w-4xl">
      <Eyebrow>04 / Prensa y charlas</Eyebrow>
      <H2>En los <em>medios</em><span className="dot">.</span></H2>
      {proximas.map((a) => (
        <div key={a.fecha + a.titulo} className="mt-6 pl-4 border-l-2 border-green">
          <p className="mono !text-green">Próxima · {fecha(a.fecha)} · {a.medio}</p>
          <p className="mt-1 font-serif font-medium text-[1.625rem] leading-[1.2] text-ink">{a.titulo}</p>
          <p className="mt-2 text-base text-muted">
            {a.detalle}
            {a.url && <> · <a href={a.url} target="_blank" rel="noopener" className="text-ink underline decoration-1 underline-offset-4 hover:decoration-green">Entradas ↗</a></>}
          </p>
        </div>
      ))}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-7">
        <Lista titulo="Columnas" items={COLUMNAS} />
        <Lista titulo="Charlas y entrevistas" items={charlas} />
      </div>
    </div>
  );
};

/* ---------- 01 SOBRE ---------- */
export const Sobre: React.FC = () => {
  const proxima = CHARLAS.filter((a) => a.fecha >= hoy()).sort((x, y) => x.fecha.localeCompare(y.fecha))[0];
  return (
  <div className="max-w-4xl">
  <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
    <div className="lg:col-span-7">
      <div className="flex items-end gap-5 lg:gap-7">
        <img
          src={retrato}
          alt="Mara Schmitman"
          className="w-24 h-[7.5rem] lg:w-32 lg:h-40 shrink-0 rounded-2xl object-cover object-[50%_15%] bg-[#E6E5E1]"
        />
        <div>
          <Eyebrow>01 / Sobre Mara Schmitman</Eyebrow>
          <H2>Criterio forjado en <em>el terreno</em><span className="dot">.</span></H2>
        </div>
      </div>
      <p className="text-ink leading-relaxed mt-5">
        Soy Licenciada en Psicología, con posgrado en Gestión Estratégica de Tecnología, y especialista en diseño organizacional.
        Desde 2008 armo equipos y diseño organizaciones, sentada del lado de quien decide a quién se contrata. Abro este espacio,
        individual y grupal, para que ese criterio les sirva directamente a las personas que necesitan entrar al mercado o cambiar de rumbo.
      </p>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-3 mt-6 pt-5 border-t hairline text-sm">
        <div><dt className="mono">Formación</dt><dd className="mt-0.5">Lic. en Psicología</dd></div>
        <div><dt className="mono">Especialidad</dt><dd className="mt-0.5">Diseño organizacional</dd></div>
        <div><dt className="mono">Base</dt><dd className="mt-0.5">Tigre, Buenos Aires (sesiones remotas)</dd></div>
        <div><dt className="mono">Perfil</dt><dd className="mt-0.5"><a href={LINKEDIN} target="_blank" rel="noopener" className="text-rose hover:underline">LinkedIn ↗</a></dd></div>
        <div className="col-span-2"><dt className="mono">Empresa</dt><dd className="mt-0.5"><a href={BONDY} target="_blank" rel="noopener" className="text-rose hover:underline">Bondy · recruiting tech ↗</a></dd></div>
      </dl>
      <a href="#prensa" className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 group">
        {proxima ? (
          <>
            <span className="mono !text-green">Próxima</span>
            <span className="text-ink underline decoration-1 underline-offset-4 decoration-ink/35 group-hover:decoration-green">{fecha(proxima.fecha)} · {proxima.medio}</span>
          </>
        ) : (
          <span className="text-ink underline decoration-1 underline-offset-4 decoration-ink/35 group-hover:decoration-green">En los medios</span>
        )}
        <span className="text-muted" aria-hidden="true">↓</span>
      </a>
    </div>
    <figure className="lg:col-span-5 card p-6 flex flex-col justify-center gap-4 bg-white/45">
      <p className="mono text-sage">Hechos, no adjetivos</p>
      <p className="font-serif text-2xl leading-snug text-ink">
        “Un perfil profesional sólido no se construye decorando adjetivos, sino ordenando los problemas que resolviste y demostrando qué valor concreto aportás.”
      </p>
      <figcaption className="pt-1">
        <img src={nombreAMano} alt="Mara Schmitman" className="w-[300px] max-w-full -ml-3.5 -mb-1.5" />
      </figcaption>
    </figure>
  </div>
  </div>
  );
};

/* ---------- 05 FAQ ---------- */
export const Faq: React.FC = () => (
  <div className="max-w-2xl">
    <Eyebrow>05 / Preguntas frecuentes</Eyebrow>
    <H2>Dudas y <em>aclaraciones</em><span className="dot">.</span></H2>
    <div className="mt-6 divide-y divide-ink/12 border-y border-ink/12">
      {FAQ.map((x, i) => (
        <details key={x.q} open={i === 0} className="group py-3">
          <summary className="flex gap-3 items-baseline font-serif text-xl text-ink">
            <span className="mono shrink-0">0{i + 1}</span>
            <span className="flex-1">{x.q}</span>
            <span className="text-ink text-xl leading-none group-open:rotate-45 transition-transform">+</span>
          </summary>
          <p className="pl-9 pt-2 text-base text-ink leading-relaxed">{x.a}</p>
        </details>
      ))}
    </div>
  </div>
);

/* ---------- 06 HABLEMOS ---------- */
export const Hablemos: React.FC = () => (
  <div className="max-w-2xl">
    <Eyebrow>06 / Contacto directo</Eyebrow>
    <h2 className="text-6xl sm:text-7xl leading-none mt-3">Hablemos<span className="dot">.</span></h2>
    <p className="text-ink mt-5 max-w-md">
      Contame en qué momento estás y pasame tu LinkedIn o CV. Te respondo personalmente en 24 a 48 hs hábiles.
    </p>
    <div className="mt-7 flex flex-wrap items-center gap-4">
      <a href={mailto('Consulta de carrera')} className="btn btn-dark text-base px-6">Escribime a {EMAIL} →</a>
      <a href={LINKEDIN} target="_blank" rel="noopener" className="text-sm text-ink hover:text-rose">LinkedIn ↗</a>
    </div>
    <p className="mono mt-10">© 2026 Mara Schmitman. Tigre, Buenos Aires.</p>
  </div>
);
